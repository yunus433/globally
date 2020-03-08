const Product = require("../../../models/product/Product");

function uploadToCloudinary(req, nameArray) {
  nameArray.forEach(name => {
    req.cloudinary.v2.uploader.upload(
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

module.exports = (req, res, next) => {
  const productPhotoArray = [];

  if (req.body.productPhotoNameArray.split(",")[0]) {
    uploadToCloudinary(req, req.body.productPhotoNameArray.split(","));
    req.body.productPhotoNameArray.split(",").forEach(photoName => {
      if (photoName) productPhotoArray.push("https://res.cloudinary.com/dvnac86j8/image/upload/v1558412742/globally/product_images/" + photoName + ".jpg");
    });
  } else {
    productPhotoArray.push("https://res.cloudinary.com/dvnac86j8/image/upload/v1566558526/globally/defaultProductPicture.png");
  }

  const newProductData = {
    category: req.body.category,
    name: req.body.name,
    type: req.body.type,
    description: req.body.description,
    price: req.body.price,
    productPhotoArray,
    keywords: req.body.keywords.toLowerCase().split(" ")
  };

  const newProduct = new Product(newProductData);

  newProduct.save((err, product) => {
    if (err) return res.redirect("/");

    return res.redirect("/admin/products");
  });
};
