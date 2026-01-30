const fs = require('fs');
const path = require('path');
const stripe = require('stripe')(process.env.STRIPE_KEY);

const PDFDocument = require('pdfkit');

const Product = require('../models/product');
const Order = require('../models/order');

const { fetchAllProducts, fetchAllProductsWithFilters, forwardError } = require('../utils');

exports.getIndex = (req, res, next) => {
  const category = req.query.category || null;
  const condition = category ? { category } : {};
  
  fetchAllProducts('shop/index', 'Shop', '/', req, res, next, condition);
};

exports.getProducts = (req, res, next) => {
  const category = req.query.category || null;
  const condition = category ? { category } : {};
  
  // Get all categories for filter
  Product.distinct('category')
    .then(categories => {
      return fetchAllProductsWithFilters(
        'shop/product-list',
        'All Products',
        '/products',
        req,
        res,
        next,
        condition,
        categories
      );
    })
    .catch(err => forwardError(err, next));
};

exports.getProduct = (req, res, next) => {
  Product.findById(req.params.productId)
    .then((product) => {
      res.render('shop/product-detail', {
        title: product.title,
        path: '/products',
        product
      });
    }).catch(err => forwardError(err, next));
};

exports.getAbout = (req, res, next) => {
  res.render('shop/about', {
    title: 'About Us',
    path: '/about'
  });
};

exports.getCart = (req, res, next) => {
  req.user
    .populate('cart.products.productId')
    .execPopulate()
    .then((user) => {
      const products = user.cart.products;
      res.render('shop/cart', {
        title: 'Your Cart',
        path: '/cart',
        products
      });
    }).catch(err => forwardError(err, next));
};

exports.postCart = (req, res, next) => {
  Product.findById(req.body.productId)
    .then((product) => req.user.addToCart(product))
    .then(() => res.redirect('/cart'))
    .catch(err => forwardError(err, next));
};

exports.postCartDeleteProduct = (req, res, next) => {
  req.user
    .deleteProductFromCart(req.body.productId)
    .then(() => res.redirect('/cart'))
    .catch(err => forwardError(err, next));
};

exports.getCheckout = (req, res, next) => {
  let products;
  req.user
    .populate('cart.products.productId')
    .execPopulate()
    .then((user) => {
      products = user.cart.products;
      return stripe.checkout.sessions.create({
        payment_method_types: ['card'],
        line_items: products.map(product => {
          return {
            price_data: {
              currency: 'usd',
              product_data: {
                name: product.productId.title,
                description: product.productId.description,
              },
              unit_amount: Math.round(product.productId.price * 100),
            },
            quantity: product.quantity
          };
        }),
        mode: 'payment',
        // http://localhost:3000/checkout/success
        success_url:
          req.protocol + '://' + req.get('host') + '/checkout/success',
        // http://localhost:3000/checkout/cancel
        cancel_url:
          req.protocol + '://' + req.get('host') + '/checkout/cancel',
      });
    })
    .then(session => res.render('shop/checkout', {
      title: 'Checkout',
      path: null,
      products,
      totalPrice: products.reduce((price, product) => {
        return price + product.quantity * product.productId.price;
      }, 0),
      sessionId: session.id,
      stripePublicKey: process.env.STRIPE_PUBLIC_KEY
    }))
    .catch(err => forwardError(err, next));
};

exports.getCheckoutSuccess = (req, res, next) => {
  req.user
    .populate('cart.products.productId')
    .execPopulate()
    .then((user) => {
      const products = user.cart.products.map(
        prod => ({
          product: { ...prod.productId._doc },
          quantity: prod.quantity
        })
      );
      return new Order({
        user: {
          email: req.user.email,
          userId: req.user
        },
        products
      });
    })
    .then(order => order.save())
    .then(() => req.user.clearCart())
    .then(() => res.redirect('/orders'))
    .catch(err => forwardError(err, next));
};

exports.getOrders = (req, res, next) => {
  Order.find({ 'user.userId': req.user._id })
    .then((orders) => {
      res.render('shop/orders', {
        title: 'Your Orders',
        path: '/orders',
        orders
      });
    })
    .catch(err => forwardError(err, next));
};

exports.getInvoice = (req, res, next) => {
  const orderId = req.params.orderId;
  Order.findById(orderId)
    .then(order => {
      if (!order) {
        return forwardError('No order found for id = ' + orderId, next);
      }
      if (order.user.userId.toString() !== req.user._id.toString()) {
        return forwardError('Unauthorized', next);
      }

      const invoiceName = 'invoice-' + orderId + '.pdf';
      const invoicePath = path.join('data', 'invoices', invoiceName);

      // fs.readFile(invoicePath, (err, data) => {
      //   if (err) {
      //     forwardError(err, next);
      //   }
      //   res.setHeader('Content-Type', 'application/pdf');
      //   res.setHeader(
      //     'Content-Disposition',
      //     'inline; filename="' + invoiceName + '"'
      //   );
      //   res.send(data);
      // });

      // const file = fs.createReadStream(invoicePath);
      // res.setHeader('Content-Type', 'application/pdf');
      // res.setHeader(
      //   'Content-Disposition',
      //   'inline; filename="' + invoiceName + '"'
      // );
      // file.pipe(res);

      const pdfDoc = new PDFDocument({ margin: 50 });
      res.setHeader('Content-Type', 'application/pdf');
      res.setHeader(
        'Content-Disposition',
        'inline; filename="' + invoiceName + '"'
      );
      pdfDoc.pipe(fs.createWriteStream(invoicePath));
      pdfDoc.pipe(res);

      // Header with gradient-style background color
      pdfDoc
        .rect(0, 0, pdfDoc.page.width, 120)
        .fill('#667eea');
      
      // Company name/logo
      pdfDoc
        .fillColor('#FFFFFF')
        .fontSize(32)
        .font('Helvetica-Bold')
        .text('ShopHub', 50, 40);
      
      pdfDoc
        .fontSize(12)
        .font('Helvetica')
        .text('Premium Online Shopping', 50, 75)
        .text('www.shophub.com | support@shophub.com', 50, 90);

      // Invoice title and details
      pdfDoc
        .fillColor('#333333')
        .fontSize(28)
        .font('Helvetica-Bold')
        .text('INVOICE', 50, 150);
      
      pdfDoc
        .fontSize(10)
        .font('Helvetica')
        .fillColor('#666666')
        .text(`Order ID: ${orderId}`, 50, 185)
        .text(`Date: ${new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}`, 50, 200);

      // Bill to section
      pdfDoc
        .fontSize(12)
        .font('Helvetica-Bold')
        .fillColor('#333333')
        .text('BILL TO:', 50, 240);
      
      pdfDoc
        .fontSize(10)
        .font('Helvetica')
        .fillColor('#666666')
        .text(req.user.email, 50, 260);

      // Table header
      const tableTop = 310;
      pdfDoc
        .rect(50, tableTop, pdfDoc.page.width - 100, 30)
        .fill('#f8f9fa');
      
      pdfDoc
        .fontSize(11)
        .font('Helvetica-Bold')
        .fillColor('#333333')
        .text('PRODUCT', 60, tableTop + 10)
        .text('QUANTITY', 300, tableTop + 10)
        .text('PRICE', 400, tableTop + 10)
        .text('TOTAL', 480, tableTop + 10);

      // Draw line under header
      pdfDoc
        .strokeColor('#e0e0e0')
        .lineWidth(1)
        .moveTo(50, tableTop + 30)
        .lineTo(pdfDoc.page.width - 50, tableTop + 30)
        .stroke();

      // Products
      let yPosition = tableTop + 45;
      let totalPrice = 0;
      
      order.products.forEach((prod, index) => {
        const itemTotal = prod.product.price * prod.quantity;
        totalPrice += itemTotal;

        // Alternate row background
        if (index % 2 === 0) {
          pdfDoc
            .rect(50, yPosition - 5, pdfDoc.page.width - 100, 25)
            .fill('#fafafa');
        }

        pdfDoc
          .fontSize(10)
          .font('Helvetica')
          .fillColor('#333333')
          .text(prod.product.title, 60, yPosition, { width: 220, ellipsis: true })
          .text(prod.quantity.toString(), 300, yPosition)
          .text('$' + prod.product.price.toFixed(2), 400, yPosition)
          .text('$' + itemTotal.toFixed(2), 480, yPosition);

        yPosition += 30;
      });

      // Total section
      yPosition += 20;
      pdfDoc
        .strokeColor('#667eea')
        .lineWidth(2)
        .moveTo(350, yPosition)
        .lineTo(pdfDoc.page.width - 50, yPosition)
        .stroke();

      yPosition += 15;
      pdfDoc
        .fontSize(14)
        .font('Helvetica-Bold')
        .fillColor('#333333')
        .text('TOTAL:', 350, yPosition)
        .fontSize(16)
        .fillColor('#667eea')
        .text('$' + totalPrice.toFixed(2), 480, yPosition);

      // Footer
      const footerY = pdfDoc.page.height - 80;
      pdfDoc
        .fontSize(9)
        .font('Helvetica')
        .fillColor('#999999')
        .text(
          'Thank you for shopping with ShopHub!',
          50,
          footerY,
          { align: 'center', width: pdfDoc.page.width - 100 }
        )
        .text(
          'For support, contact us at support@shophub.com',
          50,
          footerY + 15,
          { align: 'center', width: pdfDoc.page.width - 100 }
        );

      pdfDoc.end();
    })
    .catch(err => forwardError(err, next));
};
