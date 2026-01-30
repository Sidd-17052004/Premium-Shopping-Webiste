const fs = require('fs');

const Product = require('./models/product');

const ITEMS_PER_PAGE = 6;

const fetchAllProducts = (file, title, path, req, res, next, condition = {}) => {
  let page = +req.query.page || 1;
  let totalProducts;
  const category = req.query.category || '';

  Product.find(condition).countDocuments()
    .then(productsCount => {
      totalProducts = productsCount;
      return Product.find(condition)
        .skip((page - 1) * ITEMS_PER_PAGE)
        .limit(ITEMS_PER_PAGE)
    })
    .then((products) => {
      // Get all categories for filter display
      return Product.distinct('category').then(categories => {
        res.render(file, {
          products,
          title,
          path,
          currentPage: page,
          hasNextPage: ITEMS_PER_PAGE * page < totalProducts,
          hasPreviousPage: page > 1,
          nextPage: page + 1,
          previousPage: page - 1,
          lastPage: Math.ceil(totalProducts / ITEMS_PER_PAGE),
          categories: categories || [],
          selectedCategory: category
        });
      });
    })
    .catch(err => forwardError(err, next));
};

const fetchAllProductsWithFilters = (file, title, path, req, res, next, condition, categories) => {
  let page = +req.query.page || 1;
  let totalProducts;
  const category = req.query.category || '';

  Product.find(condition).countDocuments()
    .then(productsCount => {
      totalProducts = productsCount;
      return Product.find(condition)
        .skip((page - 1) * ITEMS_PER_PAGE)
        .limit(ITEMS_PER_PAGE)
    })
    .then((products) => {
      res.render(file, {
        products,
        title,
        path,
        currentPage: page,
        hasNextPage: ITEMS_PER_PAGE * page < totalProducts,
        hasPreviousPage: page > 1,
        nextPage: page + 1,
        previousPage: page - 1,
        lastPage: Math.ceil(totalProducts / ITEMS_PER_PAGE),
        categories: categories || [],
        selectedCategory: category
      });
    })
    .catch(err => forwardError(err, next));
};

const getErrorMessage = (req) => {
  let errorMessage = req.flash('error');
  if (errorMessage.length > 0) {
    errorMessage = errorMessage[0];
  } else {
    errorMessage = null;
  }
  return errorMessage;
};

const forwardError = (err, next) => {
  console.log(err);
  const error = new Error(err);
  error.httpStatusCode = 500;
  return next(error);
}

const deleteFile = (filePath) => {
  fs.unlink(filePath, (err) => {
    if (err) {
      throw err;
    }
  })
}

exports.fetchAllProducts = fetchAllProducts;
exports.fetchAllProductsWithFilters = fetchAllProductsWithFilters;
exports.getErrorMessage = getErrorMessage;
exports.forwardError = forwardError;
exports.deleteFile = deleteFile;
