const router = require("express").Router();
const Product = require("../models/Product");
const multer = require("multer");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./uploads/");
  },
  filename: function (req, file, cb) {
    cb(null,file.originalname);
  },
});

const upload = multer({
  storage: storage,
  limits: {
    fileSize: 1024 * 1024 * 5, //5 mega
  }
});

router.post("/add/:id", upload.single("productImage"), async (req, res) => {

  const productExist = await Product.findOne({id_User:req.params.id, name: req.body.name });
  if (productExist) return res.status(400).send("Product already exists");

  const product = new Product({
    id_User: req.body.id_User,
    name: req.body.name,
    quantity: req.body.quantity,
    price: req.body.price,
    productImage: req.file.path
  });
  console.log(product)
  try {
    const saveProduct = await product.save();
    res.send(saveProduct);
  } catch (err) {
    res.status(400).send(err);
  }
});



router.get("/:id", async (req, res) => {
  const allPoduct = await Product.find({id_User : req.params.id})

  res.send(allPoduct);
});

router.put("/update/:id", upload.single("productImage"), async (req, res) => {
  return Product.findById(req.params.id, function (err, product) {
    product.name = req.body.name;
    product.id_User = req.body.id_User;
     product.price = req.body.price;
    product.quantity = req.body.quantity;
    product.productImage = req.file.path;
    
    return product.save(function (err) {
      if (!err) {
        console.log("updated");
      } else {
        console.log(err);
      }
      return res.send(product);
    });
  });
});

router.delete("/delete/:id", async (req, res) => {
  return Product.findById(req.params.id, function (err, product) {
    return product.remove(function (err) {
      if (!err) {
        console.log("removed");
        return res.send("");
      } else {
        console.log(err);
      }
    });
  });
});

router.get("/:id/:id_User", async (req, res) => {
  const onePoduct = await Product.find({ _id:req.params.id,id_User: req.params.id_User });
console.log("One prod: ",onePoduct)
  res.send(onePoduct);
});

module.exports = router;
