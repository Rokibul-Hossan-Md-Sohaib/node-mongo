const express =require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const MongoClient = require('mongodb').MongoClient;
require('dotenv').config()

const app = express();

app.use(cors());
app.use(bodyParser.json())


const uri =process.env.DB_PATH;


let client = new MongoClient(uri, { useNewUrlParser: true });

const user =["abul", "biril", "cat", "doll"]


app.get('/products', (req,res) => {
    client = new MongoClient(uri, { useNewUrlParser: true });
    const product = req.body;
    console.log(product)
    client.connect(err => {
        const collection = client.db("onlineStore").collection("products");
        collection.find().toArray( (err, document) => {
            if(err){
                console.log(err);
                res.status(500).send({message:err})
            }
            else{
                res.send(document)
            }
           
        })
        console.log("connection database....")
        client.close();
      });
})



app.get('/orders', (req,res) => {
    client = new MongoClient(uri, { useNewUrlParser: true });
    const product = req.body;
    console.log(product)
    client.connect(err => {
        const collection = client.db("onlineStore").collection("orders");
        collection.find().toArray( (err, document) => {
            if(err){
                console.log(err);
                res.status(500).send({message:err})
            }
            else{
                res.send(document)
            }
           
        })
        console.log("connection database....")
        client.close();
      });
})

app.get('/product/:key', (req, res)=>{
    const key = req.params.key;
    client = new MongoClient(uri, { useNewUrlParser: true });
    
    
    client.connect(err => {
        const collection = client.db("onlineStore").collection("products");
        collection.find(key).toArray( (err, document) => {
            if(err){
                console.log(err);
                res.status(500).send({message:err})
            }
            else{
                res.send(document[0])
            }
           
        })
        console.log("connection database....")
        client.close();
      });
})

app.post('/getProductKey', (req, res)=>{
    const key = req.params.key;
    const productKeys=req.body;
    client = new MongoClient(uri, { useNewUrlParser: true });
    
    
    client.connect(err => {
        const collection = client.db("onlineStore").collection("products");
        collection.find({key: {$in: productKeys}}).toArray( (err, document) => {
            if(err){
                console.log(err);
                res.status(500).send({message:err})
            }
            else{
                res.send(document)
            }
           
        })
        console.log("connection database....")
        client.close();
      });
})


app.post('/addProduct', (req, res) =>{
    client = new MongoClient(uri, { useNewUrlParser: true });
    const product = req.body;
    console.log(product)
    client.connect(err => {
        const collection = client.db("onlineStore").collection("products");
        collection.insert(product, (err, result) => {
            if(err){
                console.log(err);
            }
            else{
                res.send(result.ops[0])
            }
           
        })
        console.log("connection database....")
        client.close();
      });
    
})

app.post('/placeOrder', (req, res) =>{
    const orderDetail =req.body;
    orderDetail.orderTime= new Date();
    client = new MongoClient(uri, { useNewUrlParser: true });
    
    client.connect(err => {
        const collection = client.db("onlineStore").collection("orders");
        collection.insertOne(orderDetail, (err, result) => {
            if(err){
                console.log(err);
                res.status(500).send({message:err})
            }
            else{
                res.send(result.ops[0])
            }
           
        })
        console.log("connection database....")
        client.close();
      });
    
})

const port = process.env.PORT || 3001
app.listen(port, ()=> console.log('listen to me 3001'))