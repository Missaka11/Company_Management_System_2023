const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const { urlencoded } = require("express");

const router = express.Router();

const multer = require("multer");

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ limit: "50mb" }));
app.use(cors());

mongoose
  .connect(
    "mongodb+srv://lankaflavour12:lankaflavour123@cluster0.r5w4deg.mongodb.net/test"
  )
  .catch((err) => console.log(err));

//db schema
const postSchema = mongoose.Schema({
  Name: String,
  Email: String,
  Telephone: String,
  Address: String,
  Password: String,

  UserType: String, // Add UserType field to store the user type
});

const Post = mongoose.model("customersPost", postSchema);

app.get("/", (req, res) => {
  res.send("Express is here");
});

// posts

app.post("/create", (req, res) => {
  Post.create({
    Name: req.body.Name,
    Email: req.body.Email,
    Telephone: req.body.Telephone,
    Address: req.body.Address,
    Password: req.body.Password,
  })
    .then((doc) => res.status(200).json(doc))
    .catch((err) => console.log(err));
});

app.get("/posts", (req, res) => {
  Post.find()
    .then((items) => res.json(items))
    .catch((err) => console.log(err));
});

app.delete("/delete/:id", (req, res) => {
  Post.findByIdAndDelete({ _id: req.params.id })
    .then((doc) => console.log(doc))
    .catch((err) => console.log(err));
});

app.put("/update/:id", (req, res) => {
  Post.findByIdAndUpdate(
    { _id: req.params.id },
    {
      Name: req.body.Name,
      Email: req.body.Email,
      Telephone: req.body.Telephone,
      Address: req.body.Address,
      Password: req.body.Password,
    }
  )
    .then((doc) => console.log(doc))
    .catch((err) => console.log(err));
});

// users
app.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ error: "invalid" });
    }

    const userLogin = await Post.findOne({ Email: email });

    if (!userLogin) {
      return res.status(400).json({ error: "No such user" });
    }

    if (userLogin.Password !== password) {
      return res.status(400).json({ error: "Invalid email or password" });
    }

    const { UserType } = userLogin; // Retrieve the UserType from the user object

    res.status(200).json({ message: "Login successful", userType: UserType });
  } catch (error) {
    console.log(error);
  }
});

//Supplier management system beginning------------------------------------------------------------------------

const postSupplierSchema = mongoose.Schema({
  Name: String,
  Item: String,
  Telephone_No: String,
  Age: String,
  NIC: String,
  Address: String,
});

const SupplierPosts = mongoose.model("SupplierPosts", postSupplierSchema);

app.post("/CreateSupplierPosts", (req, res) => {
  SupplierPosts.create({
    Name: req.body.Name,
    Item: req.body.Item,
    Telephone_No: req.body.Telephone_No,
    Age: req.body.Age,
    NIC: req.body.NIC,
    Address: req.body.Address,
  })
    .then((doc) => res.status(200).json(doc))
    .catch((err) => console.log(err));
});

app.get("/SupplierList", (req, res) => {
  SupplierPosts.find()
    .then((items) => res.json(items))
    .catch((err) => console.log(err));
});

app.delete("/DeleteSupplierPost/:id", (req, res) => {
  SupplierPosts.findByIdAndDelete({ _id: req.params.id })
    .then((doc) => console.log(doc))
    .catch((err) => console.log(err));
});

app.put("/UpdateSupplierPost/:id", (req, res) => {
  SupplierPosts.findByIdAndUpdate(
    { _id: req.params.id },
    {
      Name: req.body.Name,
      Item: req.body.Item,
      Telephone_No: req.body.Telephone_No,
      Age: req.body.Age,
      NIC: req.body.NIC,
      Address: req.body.Address,
    }
  )
    .then((doc) => console.log(doc))
    .catch((err) => console.log(err));
});

//Admin management system beginning------------------------------------------------------------------------
//Database Schema and Model for Managers
const postManagerSchema = mongoose.Schema({
  JobTitle: String,
  UserName: String,
  Email: String,
  FullName: String,
  NIC: String,
  Gender: String,
  Telephone_No: String,
  Address: String,
  Password: String,
  UserType: String,
});
//Create the model
const ManagerPosts = mongoose.model("ManagerList", postManagerSchema);

app.post("/AddManagers", (req, res) => {
  ManagerPosts.create({
    JobTitle: req.body.JobTitle,
    UserName: req.body.UserName,
    Email: req.body.Email,
    FullName: req.body.FullName,
    NIC: req.body.NIC,
    Gender: req.body.Gender,
    Telephone_No: req.body.Telephone_No,
    Address: req.body.Address,
    Password: req.body.Password,
    UserType: req.body.UserType,
  })
    .then((doc) => res.status(200).json(doc))
    .catch((err) => console.log(err));
});

//change the id ""---------------------------------------------------------------
//const id11 = "";
app.get("/ManagerList", (req, res) => {
  ManagerPosts.find()
    .then((items) => res.json(items))
    .catch((err) => console.log(err)); //find all the items and hold that items in json format
  //if there is an error show it on the console
});

app.delete("/deleteManager/:id", (req, res) => {
  //give id as deletting parameter
  //create route for delete
  ManagerPosts.findByIdAndDelete({ _id: req.params.id })
    .then((doc) => console.log(doc))
    .catch((err) => console.log(err));
});

app.put("/updateManager/:id", (req, res) => {
  ManagerPosts.findByIdAndUpdate(
    { _id: req.params.id },
    {
      JobTitle: req.body.JobTitle,
      UserName: req.body.UserName,
      Email: req.body.Email,
      FullName: req.body.FullName,
      NIC: req.body.NIC,
      Gender: req.body.Gender,
      Telephone_No: req.body.Telephone_No,
      Address: req.body.Address,
      Password: req.body.Password,
    }
  )
    .then((doc) => console.log(doc))
    .catch((err) => console.log(err));
});

app.post("/managerlogin", async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ error: "invalid" });
    }

    const userLogin = await ManagerPosts.findOne({ Email: email });

    if (!userLogin) {
      return res.status(400).json({ error: "No such user" });
    }

    if (userLogin.Password !== password) {
      return res.status(400).json({ error: "Invalid email or password" });
    }

    const { UserType } = userLogin; // Retrieve the UserType from the user object

    res.status(200).json({ message: "Login successful", userType: UserType });
  } catch (error) {
    console.log(error);
  }
});
//STORAGE MANAGEMENT------------------------------------------

const ItemSchema = new mongoose.Schema({
  ItemNo: {
    type: String,
    required: true,
  },
  ItemName: {
    type: String,
    required: true,
  },

  Description: {
    type: String,
    required: true,
  },

  Quantity: {
    type: String,
    required: true,
  },
});
const Item = mongoose.model("Item", ItemSchema);

// Handle POST requests to /post/save
app.post("/post/save", async (req, res) => {
  try {
    let newPost = new Item(req.body);
    await newPost.save();
    return res.status(200).json({
      success: "Posts saved successfully",
    });
  } catch (err) {
    return res.status(400).json({
      error: err,
    });
  }
});
//get post
app.get("/itemsList", (req, res) => {
  Item.find()
    .then((posts) => {
      return res.status(200).json({
        success: true,
        existingPosts: posts,
      });
    })
    .catch((err) => {
      return res.status(400).json({
        error: err,
      });
    });
});

app.get("/post/:id", async (req, res) => {
  try {
    const postId = req.params.id;
    const post = await Item.findById(postId).exec();
    return res.status(200).json({
      success: true,
      post,
    });
  } catch (err) {
    return res.status(400).json({ success: false, err });
  }
});

// update post
app.put("/post/update/:id", (req, res) => {
  const id = req.params.id;
  const update = req.body;

  Item.findByIdAndUpdate(id, update)
    .then(() => {
      res.status(200).json({
        success: true,
        message: "Post updated successfully",
      });
    })
    .catch((err) => {
      res.status(400).json({
        error: err,
      });
    });
});

//delete post
app.delete("/post/delete/:id", async (req, res) => {
  try {
    const deletedPost = await Item.findByIdAndRemove(req.params.id);
    return res.json({
      message: "Delete Succesfull",
      deletedPost,
    });
  } catch (err) {
    return res.status(400).json({
      message: "Delete unsuccesful",
      err,
    });
  }
});

//Admin management system end------------------------------------------------------------------------

//Distribute management system beginning------------------------------------------------------------------------
//Database Schema and Model
const DistributeSchema = mongoose.Schema({
  Distributer_id: String,
  Distributer_name: String,
  Registered_No: String,
  Area: String,
  Contact_No: Number,
  dAddress: String,
});
//Create the model
const Dis = mongoose.model("DistributerList", DistributeSchema);

app.get("/", (req, res) => {
  res.send("Express is here");
});

app.post("/createdistributer", (req, res) => {
  Dis.create({
    Distributer_id: req.body.Distributer_id,
    Distributer_name: req.body.Distributer_name,
    Registered_No: req.body.Registered_No,
    Area: req.body.Area,
    Contact_No: req.body.Contact_No,
    dAddress: req.body.dAddress,
  })
    .then((doc) => res.status(200).json(doc))
    .catch((err) => console.log(err));
});

app.get("/DistributeList", (req, res) => {
  Dis.find()
    .then((items) => res.json(items))
    .catch((err) => console.log(err)); //find all the items and hold that items in json format
  //if there is an error show it on the console
});

app.delete("/deleteDistributer/:id", (req, res) => {
  //give id as deletting parapeter
  //create route for delete
  Dis.findByIdAndDelete({ _id: req.params.id })
    .then((doc) => console.log(doc))
    .catch((err) => console.log(err));
});

app.put("/updateDistribute/:id", (req, res) => {
  Dis.findByIdAndUpdate(
    { _id: req.params.id },
    {
      Distributer_id: req.body.Distributer_id,
      Distributer_name: req.body.Distributer_name,
      Registered_No: req.body.Registered_No,
      Area: req.body.Area,
      Contact_No: req.body.Contact_No,
      dAddress: req.body.dAddress,
    }
  )
    .then((doc) => console.log(doc))
    .catch((err) => console.log(err));
});

//for vehicle crud

const VehicleSchema = new mongoose.Schema({
  Vehicle_id: String,
  Vcatagory: String,
  Vregistered_No: String,
  Capacity: Number,
});
//Create the model
const post1 = mongoose.model("VehicleList", VehicleSchema);

app.get("/", (req, res) => {
  res.send("Express is here");
});

app.post("/createvehicle", (req, res) => {
  post1
    .create({
      Vehicle_id: req.body.Vehicle_id,
      Vcatagory: req.body.Vcatagory,
      Vregistered_No: req.body.Vregistered_No,
      Capacity: req.body.Capacity,
    })
    .then((doc) => res.status(200).json(doc))
    .catch((err) => console.log(err));
});

app.get("/VehicleList", (req, res) => {
  post1
    .find()
    .then((items) => res.json(items))
    .catch((err) => console.log(err)); //find all the items and hold that items in json format
  //if there is an error show it on the console
});

app.delete("/deleteVehicle/:id", (req, res) => {
  //give id as deletting parapeter
  //create route for delete
  post1
    .findByIdAndDelete({ _id: req.params.id })
    .then((doc) => console.log(doc))
    .catch((err) => console.log(err));
});

app.put("/updateVehicle/:id", (req, res) => {
  post1
    .findByIdAndUpdate(
      { _id: req.params.id },
      {
        Vehicle_id: req.body.Vehicle_id,
        Vcatagory: req.body.Vcatagory,
        Vregistered_No: req.body.Vregistered_No,
        Capacity: req.body.Capacity,
      }
    )
    .then((doc) => console.log(doc))
    .catch((err) => console.log(err));
});

//PRODUCT MANAGER------------------------------
/////////////////////////////
// Define product model
const productSchema = new mongoose.Schema({
  name: String,
  id: String,
  date: Date,
  description: String,
  price: Number,
  image: String,
});

const Product = mongoose.model("Product", productSchema);

// Define POST route for adding products
app.post("/api/products", (req, res) => {
  const { name, id, date, description, price, image } = req.body;
  const newProduct = new Product({
    name,
    id,
    date,
    description,
    price,
    image,
  });

  newProduct
    .save()
    .then(() => res.status(201).send("Product added successfully"))
    .catch((err) => res.status(400).send(err));
});

app.get("/api/viewProducts", async (req, res) => {
  try {
    const products = await Product.find({});
    res.send(products);
  } catch (err) {
    console.log(err);
    res.status(500).send("Server error");
  }
});

app.get("/api/products/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const product = await Product.findById(id);
    if (!product) {
      return res.status(404).send("Product not found");
    }
    res.send(product);
  } catch (err) {
    console.log(err);
    res.status(500).send("Server error");
  }
});

app.delete("/api/deleteProduct/:id", (req, res) => {
  //give id as deletting parameater
  //create route for delete
  Product.findByIdAndDelete({ _id: req.params.id })

    .then((doc) => console.log(doc))
    .catch((err) => console.log(err));
});

//Employee SCHEMA AND MODEL
const postEmployeeSchema = mongoose.Schema({
  firstname: String,
  lastname: String,
  eid: String,
  depart: String,
  date: String,
  city: String,
  email: String,
  contact: String,
});

const Employees = mongoose.model("Employees", postEmployeeSchema);

app.post("/addemployee", (req, res) => {
  Employees.create({
    firstname: req.body.firstname,
    lastname: req.body.lastname,
    eid: req.body.eid,
    depart: req.body.depart,
    date: req.body.date,
    city: req.body.city,
    email: req.body.email,
    contact: req.body.contact,
  })

    .then((doc) => console.log(doc))
    .catch((err) => console.log(err));
});

app.get("/Empmanage", (req, res) => {
  Employees.find()
    .then((items) => res.json(items))
    .catch((err) => console.log(err));
});

app.delete("/deleteemployee/:id", (req, res) => {
  console.log(req.params);
  Employees.findByIdAndDelete({ _id: req.params.id })
    .then((doc) => console.log(doc))
    .catch((err) => console.log(err));
});

app.put("/updateemployee/:id", (req, res) => {
  Employees.findByIdAndUpdate(
    { _id: req.params.id },
    {
      firstname: req.body.firstname,
      lastname: req.body.lastname,
      eid: req.body.eid,
      depart: req.body.depart,
      date: req.body.date,
      city: req.body.city,
      email: req.body.email,
      contact: req.body.contact,
    }
  )
    .then((doc) => console.log(doc))
    .catch((err) => console.log(err));
});

//order..................

const postOrderSchema = mongoose.Schema({
  Choises: String,
  number: String,
  Telephone: String,
  Address: String,
});

const Orders = mongoose.model("Order", postOrderSchema);

app.post("/orders", (req, res) => {
  Orders.create({
    Choises: req.body.Choises,
    number: req.body.number,
    Telephone: req.body.Telephone,
    Address: req.body.Address,
  })

    .then((doc) => console.log(doc))
    .catch((err) => console.log(err));
});

app.get("/orderdetail", (req, res) => {
  Orders.find()
    .then((items) => res.json(items))
    .catch((err) => console.log(err));
});

app.delete("/deleteOrder/:id", (req, res) => {
  console.log(req.params);
  Orders.findByIdAndDelete({ _id: req.params.id })
    .then((doc) => console.log(doc))
    .catch((err) => console.log(err));
});

app.listen(3001, function () {
  console.log("server is running");
});

app.put("/api/updateproduct/:id", async (req, res) => {
  try {
    const { name, id, date, description, price, image } = req.body;
    console.log("Dada", name, date, description, price, image);
    const product = await Product.findById(req.params.id);
    if (!product) {
      return res.status(404).send("Product not found");
    }
    product.name = name;
    product.date = date;
    product.description = description;
    product.price = price;
    product.image = image;

    await product.save();
    res.status(200).send("Product updated successfully");
  } catch (err) {
    console.error(err);
    res.status(400).send(err);
  }
});
