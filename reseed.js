const path = require('path');
require('dotenv').config({ path: path.join(__dirname, '.env') });
const mongoose = require('mongoose');
const Product = require('./models/product');
const User = require('./models/user');

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/shopping_db';

mongoose.connect(MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(async () => {
  console.log('Connected to MongoDB');
  
  // Clear existing products
  await Product.deleteMany({});
  console.log('Cleared existing products');
  
  // Create system user
  let user = await User.findOne({ email: 'system@shophub.com' });
  if (!user) {
    user = new User({
      email: 'system@shophub.com',
      password: 'hashed_password',
      cart: { products: [] }
    });
    await user.save();
    console.log('Created system user');
  }

  const sampleProducts = [
    // Electronics
    { title: 'Wireless Headphones', price: 79.99, category: 'Electronics', description: 'Premium noise-canceling wireless headphones', imageUrl: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400&h=300&fit=crop', rating: 4.8, inStock: true, userId: user._id },
    { title: 'Smart Watch', price: 199.99, category: 'Electronics', description: 'Advanced fitness tracking smartwatch', imageUrl: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=400&h=300&fit=crop', rating: 4.6, inStock: true, userId: user._id },
    { title: 'USB-C Cable', price: 24.99, category: 'Electronics', description: 'Durable USB-C charging cables', imageUrl: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&h=300&fit=crop', rating: 4.4, inStock: true, userId: user._id },
    { title: '4K Webcam', price: 129.99, category: 'Electronics', description: 'Crystal clear 4K webcam', imageUrl: 'https://images.unsplash.com/photo-1623949556303-b0d17d198863?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D', rating: 4.7, inStock: true, userId: user._id },
    { title: 'Portable Speaker', price: 59.99, category: 'Electronics', description: 'Bluetooth speaker with 20-hour battery', imageUrl: 'https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?w=400&h=300&fit=crop', rating: 4.5, inStock: true, userId: user._id },
    
    // Fashion
    { title: 'Classic White T-Shirt', price: 24.99, category: 'Fashion', description: 'Pure cotton comfortable t-shirt', imageUrl: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=400&h=300&fit=crop', rating: 4.5, inStock: true, userId: user._id },
    { title: 'Denim Jeans', price: 59.99, category: 'Fashion', description: 'Classic blue denim jeans', imageUrl: 'https://images.unsplash.com/photo-1542272604-787c3835535d?w=400&h=300&fit=crop', rating: 4.6, inStock: true, userId: user._id },
    { title: 'Running Shoes', price: 89.99, category: 'Fashion', description: 'Lightweight athletic running shoes', imageUrl: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=400&h=300&fit=crop', rating: 4.8, inStock: true, userId: user._id },
    { title: 'Winter Jacket', price: 129.99, category: 'Fashion', description: 'Warm stylish winter jacket', imageUrl: 'https://images.unsplash.com/photo-1551028719-00167b16eac5?w=400&h=300&fit=crop', rating: 4.7, inStock: true, userId: user._id },
    { title: 'Canvas Backpack', price: 34.99, category: 'Fashion', description: 'Stylish canvas backpack', imageUrl: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=400&h=300&fit=crop', rating: 4.4, inStock: true, userId: user._id },
    
    // Sports
    { title: 'Yoga Mat', price: 34.99, category: 'Sports', description: 'Non-slip eco-friendly yoga mat', imageUrl: 'https://images.unsplash.com/photo-1601925260368-ae2f83cf8b7f?w=400&h=300&fit=crop', rating: 4.7, inStock: true, userId: user._id },
    { title: 'Dumbbell Set', price: 119.99, category: 'Sports', description: 'Adjustable weight dumbbell set', imageUrl: 'https://images.unsplash.com/photo-1517836357463-d25dfeac3438?w=400&h=300&fit=crop', rating: 4.8, inStock: true, userId: user._id },
    { title: 'Resistance Bands', price: 29.99, category: 'Sports', description: 'Set of 5 resistance bands', imageUrl: 'https://images.unsplash.com/photo-1598289431512-b97b0917affc?w=400&h=300&fit=crop', rating: 4.6, inStock: true, userId: user._id },
    { title: 'Soccer Ball', price: 49.99, category: 'Sports', description: 'Professional soccer ball', imageUrl: 'https://images.unsplash.com/photo-1614632537190-23e4146777db?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D', rating: 4.5, inStock: true, userId: user._id },
    { title: 'Tennis Racket', price: 89.99, category: 'Sports', description: 'Professional tennis racket', imageUrl: 'https://images.unsplash.com/photo-1622163642998-1ea32b0bbc67?w=400&h=300&fit=crop', rating: 4.4, inStock: true, userId: user._id },
    
    // Beauty
    { title: 'Anti-Aging Serum', price: 59.99, category: 'Beauty', description: 'Powerful anti-aging facial serum', imageUrl: 'https://images.unsplash.com/photo-1620916566398-39f1143ab7be?w=400&h=300&fit=crop', rating: 4.9, inStock: true, userId: user._id },
    { title: 'Face Moisturizer', price: 44.99, category: 'Beauty', description: 'Hydrating daily face moisturizer', imageUrl: 'https://images.unsplash.com/photo-1556228720-195a672e8a03?w=400&h=300&fit=crop', rating: 4.7, inStock: true, userId: user._id },
    { title: 'Lipstick Collection', price: 34.99, category: 'Beauty', description: 'Set of 5 premium lipsticks', imageUrl: 'https://images.unsplash.com/photo-1586495777744-4413f21062fa?w=400&h=300&fit=crop', rating: 4.6, inStock: true, userId: user._id },
    { title: 'Hair Shampoo', price: 24.99, category: 'Beauty', description: 'Sulfate-free organic hair shampoo', imageUrl: 'https://images.unsplash.com/photo-1535585209827-a15fcdbc4c2d?w=400&h=300&fit=crop', rating: 4.5, inStock: true, userId: user._id },
    { title: 'Cologne', price: 79.99, category: 'Beauty', description: "Premium men's cologne", imageUrl: 'https://images.unsplash.com/photo-1541643600914-78b084683601?w=400&h=300&fit=crop', rating: 4.8, inStock: true, userId: user._id },
    
    // Books
    { title: 'The Great Gatsby', price: 14.99, category: 'Books', description: 'Classic American novel by F. Scott Fitzgerald', imageUrl: 'https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=400&h=300&fit=crop', rating: 4.4, inStock: true, userId: user._id },
    { title: '1984', price: 13.99, category: 'Books', description: 'Dystopian novel by George Orwell', imageUrl: 'https://images.unsplash.com/photo-1495446815901-a7297e633e8d?w=400&h=300&fit=crop', rating: 4.5, inStock: true, userId: user._id },
    { title: 'To Kill a Mockingbird', price: 12.99, category: 'Books', description: 'Pulitzer Prize-winning novel', imageUrl: 'https://images.unsplash.com/photo-1512820790803-83ca734da794?w=400&h=300&fit=crop', rating: 4.7, inStock: true, userId: user._id },
    { title: 'Python Programming', price: 39.99, category: 'Books', description: 'Comprehensive Python guide', imageUrl: 'https://images.unsplash.com/photo-1589998059171-988d887df646?w=400&h=300&fit=crop', rating: 4.8, inStock: true, userId: user._id },
    { title: 'Web Development 101', price: 44.99, category: 'Books', description: 'Learn web development from scratch', imageUrl: 'https://images.unsplash.com/photo-1532012197267-da84d127e765?w=400&h=300&fit=crop', rating: 4.6, inStock: true, userId: user._id }
  ];

  const result = await Product.insertMany(sampleProducts);
  console.log(`✅ Successfully inserted ${result.length} products!`);
  
  // Count by category
  const counts = {};
  for (const cat of ['Electronics', 'Fashion', 'Sports', 'Beauty', 'Books']) {
    counts[cat] = await Product.countDocuments({ category: cat });
  }
  
  console.log('\n📊 Products by Category:');
  Object.entries(counts).forEach(([cat, count]) => {
    console.log(`   ${cat}: ${count} products`);
  });
  
  console.log('\n✨ Database reseeding complete with working images!');
  process.exit(0);
})
.catch(err => {
  console.error('Error:', err);
  process.exit(1);
});
