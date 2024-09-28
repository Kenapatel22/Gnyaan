const express = require("express"); 
const cors = require("cors");
const dotenv = require("dotenv");
const morgan = require('morgan');
const connectDB = require("./config/db");
const authRoutes = require("./routes/authRoutes");
const productRoutes = require("./routes/productRoutes.js");
const path = require('path');

//configure env
dotenv.config();
//database config
connectDB();
//rest object
const app = express();
const PORT = process.env.PORT || 8080;

//Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(morgan('dev'));
// Serve static files from the "uploads" folder
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));


//routes
app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/product", productRoutes);


//rest api
app.get("/", (req, res) => {
  res.send("<h1>Welcome</h1>");
});

//Port and server setup
app.listen(PORT, () => {
  console.log(`Server is running on ${PORT}`);
});
