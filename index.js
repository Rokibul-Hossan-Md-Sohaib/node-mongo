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

const user =["abul", "biri", "cat", "doll"]


app.get('/products', (req,res) => {
    client = new MongoClient(uri, { useNewUrlParser: true });
    const product = req.body;
    console.log(product)
    client.connect(err => {
        const collection = client.db("onlineStore").collection("products");
        collection.find({stock: {$gt: 5}}).toArray( (err, document) => {
            if(err){
                console.log(err);
            }
            else{
                res.send(document)
            }
           
        })
        console.log("connection database....")
        client.close();
      });
})

app.get('/user/:id', (req, res)=>{
    const id = req.params.id;
    const name = user[id];
    res.send({id, name});
})

app.post('/addProduct', (req, res) =>{
    client = new MongoClient(uri, { useNewUrlParser: true });
    const product = req.body;
    console.log(product)
    client.connect(err => {
        const collection = client.db("onlineStore").collection("products");
        collection.insertOne(product, (err, result) => {
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

const port = process.env.PORT || 3001
app.listen(port, ()=> console.log('listen to me 3001'))