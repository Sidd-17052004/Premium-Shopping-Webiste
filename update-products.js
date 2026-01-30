const path = require('path');
require('dotenv').config({ path: path.join(__dirname, '.env') });
const mongoose = require('mongoose');
const Product = require('./models/product');

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/shopping_db';

const productsWithDetails = [
  // Beauty
  { title: 'Anti-Aging Serum', description: 'Advanced anti-aging serum with retinol, hyaluronic acid, and vitamin C. Reduces fine lines and wrinkles while brightening skin. Dermatologist-tested, paraben-free, cruelty-free. Apply nightly for visible results in 4-6 weeks.' },
  { title: 'Cologne', description: 'Sophisticated men\'s cologne with fresh woody fragrance. Top notes of citrus and bergamot, base notes of cedarwood and musk. Long-lasting 6-8 hour wear. Comes in premium gift box. Cruelty-free.' },
  { title: 'Face Moisturizer', description: 'Hydrating face moisturizer with SPF 30 protection. Rich formula with shea butter, jojoba oil, and vitamin E. Non-comedogenic, absorbs quickly. Suitable for all skin types. Paraben-free, vegan.' },
  { title: 'Hair Shampoo', description: 'Professional sulfate-free shampoo with biotin, keratin, and argan oil. Strengthens hair, reduces breakage by 80%, adds volume and shine. Color-safe, pH-balanced. Works with all hair textures. Cruelty-free, vegan.' },
  { title: 'Lipstick Collection', description: 'Luxury lipstick collection with 6 shades from nudes to bold reds. Creamy matte formula, long-lasting 8+ hours. Highly pigmented with vitamin E and shea butter. Paraben-free, cruelty-free, vegan.' },
  
  // Books
  { title: '1984', description: 'George Orwell\'s dystopian masterpiece. Set in totalitarian society exploring themes of government control, propaganda, and freedom. 328 pages with introduction and discussion questions. A timeless classic that remains relevant today.' },
  { title: 'Python Programming', description: 'Comprehensive Python guide for beginners and intermediate developers. 500 pages covering variables, OOP, web scraping, APIs, and data analysis. Includes 20+ projects, exercises with solutions, and online resources. Updated for Python 3.12.' },
  { title: 'The Great Gatsby', description: 'F. Scott Fitzgerald\'s Jazz Age classic exploring wealth, love, and the American Dream. Follow Jay Gatsby and his obsession with Daisy Buchanan. 180 pages with introduction and character guide. Hardcover with ribbon bookmark.' },
  { title: 'To Kill a Mockingbird', description: 'Harper Lee\'s Pulitzer Prize-winning novel about racial injustice in Depression-era Alabama. Through Scout Finch\'s eyes, witness Atticus defend a Black man. 336 pages with historical notes and discussion guide. Essential American literature.' },
  { title: 'Web Development 101', description: 'Complete beginner\'s guide covering HTML, CSS, JavaScript, and modern frameworks. 450 pages with 15+ hands-on projects including portfolio sites and apps. Full-color examples, best practices, and video tutorials. No prior experience required!' },
  
  // Electronics
  { title: '4K Webcam', description: 'Professional 4K webcam with autofocus and stereo microphones. Crystal-clear video (3840x2160 @ 30fps or 1080p @ 60fps). Sony sensor with 90° wide-angle, auto light correction, privacy shutter. USB plug-and-play, works with Zoom, Teams, Skype, OBS. Compatible with Windows, Mac, Chrome OS.' },
  { title: 'Portable Speaker', description: 'Compact Bluetooth speaker with 360° sound and deep bass (20W). Waterproof IPX7 rating, 15-hour battery life, Bluetooth 5.0 with 100ft range. TWS pairing for stereo, USB-C charging, carabiner clip. Durable rubber housing. Weighs only 1.2 lbs.' },
  { title: 'Smart Watch', description: 'Feature-packed smartwatch with fitness tracking and heart rate monitor. 1.4" AMOLED touchscreen, tracks 100+ sports modes, 5ATM water resistant. 24/7 heart rate, blood oxygen, sleep tracking. 7-day battery, GPS, voice assistant. Compatible with iOS and Android.' },
  { title: 'USB-C Cable', description: 'Premium USB-C cable (6ft) supporting 100W fast charging and 480Mbps data transfer. Braided nylon exterior, aluminum connectors, reinforced strain relief. Supports Power Delivery 3.0. Compatible with MacBook, iPad, Samsung, all USB-C devices. Pack of 2, lifetime warranty.' },
  { title: 'Wireless Headphones', description: 'Premium Bluetooth headphones with active noise cancellation. 40mm drivers deliver rich bass and crisp highs. Hybrid ANC blocks 95% noise, 40-hour battery (30 with ANC). Quick charge (5 min = 4 hours), Bluetooth 5.2. Memory foam cushions, foldable with carrying case.' },
  
  // Fashion
  { title: 'Canvas Backpack', description: 'Vintage canvas backpack with leather accents and laptop compartment. Holds 15.6" laptop. Water-resistant waxed canvas, padded sleeve, multiple pockets, adjustable straps. 18" H x 12" W x 6" D (25L). Durable YKK zippers. Unisex style for school, work, travel.' },
  { title: 'Classic White T-Shirt', description: 'Premium white crew-neck t-shirt made from 100% combed cotton. Soft, breathable, pre-shrunk. Regular fit, reinforced seams, tagless label. Available in sizes XS-3XL. Machine washable, colorfast. Pack of 3. Perfect for everyday wear.' },
  { title: 'Denim Jeans', description: 'Classic straight-fit jeans in stretch cotton denim (98% cotton, 2% elastane). Mid-rise waist, five-pocket styling, reinforced belt loops, copper rivets. Stone-washed finish, pre-shrunk, fade-resistant. Available in multiple inseam lengths (30", 32", 34") and waist sizes (28-42).' },
  { title: 'Running Shoes', description: 'High-performance running shoes with breathable mesh upper and EVA foam midsole. Carbon rubber outsole with multi-directional traction, padded collar, removable insole, reflective details. Lightweight (8 oz). Supports neutral pronation. Lasts 300-500 miles.' },
  { title: 'Winter Jacket', description: 'Insulated winter jacket with water-resistant shell. 600-fill down insulation, polyester shell with DWR coating, attached hood, multiple pockets, elastic cuffs. Temperature rating: -20°F/-29°C. Lightweight, packable. Available in sizes XS-3XL. Machine washable.' },
  
  // Sports
  { title: 'Dumbbell Set', description: 'Complete set with rack: pairs of 5, 10, 15, 20, 25 lb dumbbells (150 lbs total). Hexagonal shape prevents rolling. Cast iron with rubber coating (floor-friendly), textured grip handles, 3-tier storage rack. Perfect for full-body workouts. Lifetime durability.' },
  { title: 'Resistance Bands', description: '5-piece band set (X-Light to X-Heavy) providing 10-150 lbs resistance. Natural latex, includes handles, door anchor, ankle straps, carrying pouch. Full-body workout anywhere. Suitable for all fitness levels. Compact, portable. Includes exercise guide with 30+ workouts.' },
  { title: 'Soccer Ball', description: 'Official size 5 soccer ball with professional quality. FIFA-inspired, 32-panel configuration. Synthetic leather cover (water-resistant), butyl bladder (air retention), machine-stitched. Official size/weight (8.6" diameter, 14-16 oz). Vibrant colors, comes with inflation instructions.' },
  { title: 'Tennis Racket', description: 'Intermediate-level racket with graphite composite frame. 100 sq in oversized head, 27" length, 10.6 oz, 16x19 string pattern, 4 1/4" grip. Pre-strung with synthetic gut, vibration dampening, reinforced throat, protective head guard. Includes full-length cover.' },
  { title: 'Yoga Mat', description: 'Eco-friendly mat with natural rubber base and microfiber suede top. Extra-large (72" x 24"), 5mm thick. Exceptional grip when sweaty, non-slip, biodegradable. Free from PVC/latex/phthalates. Moisture-wicking, odor-resistant. Includes carry strap. Weighs 4 lbs.' }
];

async function updateProducts() {
  try {
    console.log('Connecting to MongoDB...');
    await mongoose.connect(MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true });
    console.log('Connected successfully!');

    // Get all products
    const products = await Product.find().sort({ category: 1, title: 1 });
    console.log(`Found ${products.length} products in database`);

    if (products.length !== productsWithDetails.length) {
      console.log(`Warning: Database has ${products.length} products but we have ${productsWithDetails.length} detailed descriptions`);
    }

    // Update each product with detailed description
    let updated = 0;
    for (let i = 0; i < products.length && i < productsWithDetails.length; i++) {
      const product = products[i];
      const details = productsWithDetails[i];

      if (product.title === details.title) {
        product.description = details.description;
        await product.save();
        console.log(`✓ Updated: ${product.title}`);
        updated++;
      } else {
        console.log(`⚠ Mismatch: Database has "${product.title}" but details have "${details.title}"`);
      }
    }

    console.log(`\n✅ Successfully updated ${updated} products with detailed descriptions!`);
    await mongoose.connection.close();
    console.log('Database connection closed');
    process.exit(0);
  } catch (error) {
    console.error('❌ Error:', error);
    await mongoose.connection.close();
    process.exit(1);
  }
}

updateProducts();
