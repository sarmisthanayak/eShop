const express=require('express');
const app=express();
const serverconfig=require('./config/server.config');
const dbconfig=require('./config/db.config');
const mongoose=require('mongoose');
const bodyParser=require('body-parser');
const secretKey=require('./config/auth.config');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));

mongoose.connect(dbconfig.DB_URL);
const db=mongoose.connection;

db.once("open",()=>{
    console.log("Successfully connected to mongodb");
});

db.on('error',()=>{
    console.log("Error connecting to Mongodb");
    process.exit();
});

require("./routes/auth.routes")(app);
require("./routes/login.routes")(app);
require("./routes/address.routes")(app);
require("./routes/product.routes")(app);
require("./routes/category.routes")(app);
require("./routes/byId.routes")(app);
require("./routes/saveproduct.routes")(app);
require("./routes/updateId.routes")(app);
require("./routes/deleteProduct.routes")(app);
require("./routes/createOrder.routes")(app);



app.get('/testroute',(req,res)=>{
    res.send('Server up and running');
})
app.listen(serverconfig.PORT,()=>{
    console.log('Server is up and running on port');
})