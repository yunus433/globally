const mongoose = require('mongoose');

const Product = require('../../../models/product/Product');
const Category = require('../../../models/category/Category');

uploadToCloudinary = (cloudinary, nameArray) => {
  nameArray.forEach(name => {
    cloudinary.v2.uploader.upload(
      "./public/res/uploads/" + name,
      {
        public_id: "globally/product_images/" + name,
        quality: 25,
        format: "JPG",
        secure: true
      }
    );
  });
};

const engName = word => {
  return word.toLocaleLowerCase().split('ş').join('s').split('ı').join('i').split('ö').join('o').split('ç').join('c').split('ü').join('u').split('ğ').join('g');
}

module.exports = (req, res, next) => {
  const productPhotoArray = [];

  if (req.body.productPhotoNameArray.split(",")[0]) {
    uploadToCloudinary(req.cloudinary, req.body.productPhotoNameArray.split(","));
    req.body.productPhotoNameArray.split(",").forEach(photoName => {
      if (photoName) productPhotoArray.push("https://res.cloudinary.com/dvnac86j8/image/upload/v1558412742/globally/product_images/" + photoName + ".jpg");
    });
  } else {
    productPhotoArray.push("https://res.cloudinary.com/dvnac86j8/image/upload/v1566558526/globally/defaultProductPicture.png");
  };

  Category.findById(mongoose.Types.ObjectId(req.body.category), (err, category) => {
    if (err) return res.redirect('/admin/products');
  
    const newProductData = {
      category: category._id,
      categoryName: category.name,
      generalCategory: category.category,
      name: req.body.name,
      type: req.body.type,
      description: req.body.description,
      price: req.body.price,
      productPhotoArray,
      keywords: (engName(req.body.description).split(' ').join('+').split('\n').join('+').split('\t').join('+') + "+" + engName(req.body.name).split(' ').join('+').split('\n').join('+').split('\t').join('+')).split("+"),
      isDolar: req.body.isDolar ? true : false
    };

    const newProduct = new Product(newProductData);
  
    newProduct.save((err, product) => {
      if (err) return res.redirect('/admin/products');
  
      Category.findByIdAndUpdate(mongoose.Types.ObjectId(req.body.category), {$push: {
        products: product._id
      }}, {}, err => {
        if (err) return res.redirect('/admin/products');

        Product.collection.createIndex({ createdAt: 1 }, (err, result) => {
          if (err) return res.redirect('/admin/products');
        
          return res.redirect('/admin/products');
        });
      });
    });
  });
};
