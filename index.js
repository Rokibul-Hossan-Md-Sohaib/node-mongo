const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const nodemailer = require("nodemailer");
const MongoClient = require("mongodb").MongoClient;
require("dotenv").config();

const app = express();

app.use(cors());
app.use(bodyParser.json());

const uri = process.env.DB_PATH;

let client = new MongoClient(uri, { useNewUrlParser: true });

// let transporter = nodemailer.createTransport({
//   host: 'smtp.gmail.com',
//   port: 587,
//   secure: false,
//   requireTLS: true,
//   auth: {
//       user: 'rokibulhossan32@gmail.com', // like : abc@gmail.com
//       pass: '419895sohaib'           // like : pass@123
//   }
//   });

//   let mailOptions = {
//    from: 'rokibulhossan32@gmail.com',
//    to: 'rokibulhossan69@gmail.com',
//    subject: 'Check Mail',
//    text: 'Its working node mailer'
//   };

//   transporter.sendMail(mailOptions, (error, info) => {
//     if (error) {
//        return console.log(error.message);
//     }
//   console.log('success');
//   });

// app.get('/products', (req,res) => {
//     client = new MongoClient(uri, { useNewUrlParser: true });
//     const product = req.body;
//     console.log(product)
//     client.connect(err => {
//         const collection = client.db("onlineStore").collection("products");
//         collection.find().toArray( (err, document) => {
//             if(err){
//                 console.log(err);
//                 res.status(500).send({message:err})
//             }
//             else{
//                 res.send(document)
//             }

//         })
//         console.log("connection database....")
//         client.close();
//       });
// })

// app.get('/orders', (req,res) => {
//     client = new MongoClient(uri, { useNewUrlParser: true });
//     const product = req.body;
//     console.log(product)
//     client.connect(err => {
//         const collection = client.db("onlineStore").collection("orders");
//         collection.find().toArray( (err, document) => {
//             if(err){
//                 console.log(err);
//                 res.status(500).send({message:err})
//             }
//             else{
//                 res.send(document)
//             }

//         })
//         console.log("connection database....")
//         client.close();
//       });
// })

// app.get('/product/:key', (req, res)=>{
//     const key = req.params.key;
//     client = new MongoClient(uri, { useNewUrlParser: true });

//     client.connect(err => {
//         const collection = client.db("onlineStore").collection("products");
//         collection.find(key).toArray( (err, document) => {
//             if(err){
//                 console.log(err);
//                 res.status(500).send({message:err})
//             }
//             else{
//                 res.send(document[0])
//             }

//         })
//         console.log("connection database....")
//         client.close();
//       });
// })

// app.post('/getProductKey', (req, res)=>{
//     const key = req.params.key;
//     const productKeys=req.body;
//     client = new MongoClient(uri, { useNewUrlParser: true });

//     client.connect(err => {
//         const collection = client.db("onlineStore").collection("products");
//         collection.find({key: {$in: productKeys}}).toArray( (err, document) => {
//             if(err){
//                 console.log(err);
//                 res.status(500).send({message:err})
//             }
//             else{
//                 res.send(document)
//             }

//         })
//         console.log("connection database....")
//         client.close();
//       });
// })

app.post("/addProduct", (req, res) => {
  client = new MongoClient(uri, { useNewUrlParser: true });
  const product = req.body;
  // let transporter = nodemailer.createTransport({
  //   host: "insuretogo.uk",
  //   secure: true,
  //   port: 465, // true for 465, false for other ports
  //   auth: {
  //     user: "quotes@insuretogo.uk", // generated ethereal user
  //     pass: "NKnSCpl5", // generated ethereal password
  //   },
  //   tls: {
  //     rejectUnauthorized: false,
  //   },
  // });

  // // setup email data with unicode symbols
  // let mailOptions = {
  //   from: '"Nodemailer Contact" <quotes@insuretogo.uk>', // sender address
  //   to: "rokibulhossan69@gmail.com", // list of receivers
  //   subject: "Node Contact Request", // Subject line
  //   text: "Hello world?", // plain text body
    
  // };

  // // send mail with defined transport object
  // transporter.sendMail(mailOptions, (error, info) => {
  //   if (error) {
  //     return console.log(error);
  //   }
  //   console.log("Message sent: %s", info.messageId);
  //   console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));

  // });

  console.log(product);
  client.connect((err) => {
    const collection = client.db("newUsers").collection("users");
    collection.insert(product,   new Date(), (err, result) => {
      if (err) {
        console.log(err);
      } else {
        res.send(result.ops[0]);
      
      }
    });
    console.log("connection database....");
    client.close();
  });
//   var transporter = nodemailer.createTransport({
//     service: 'gmail',
//     auth: {
//       user: 'rokibulhossan69@gmail.com',
//       pass: 'vnvqqietyvxcudwp'
//     }
// });

// var mailOptions = {
//     from: 'rokibulhossan69@gmail.com',// sender address
//     to: 'Rokib@expresssolution396.onmicrosoft.com, quotes@insuretogo.uk , Fahad@expresssolution396.onmicrosoft.com ,espita@expresssolution396@onmicrosoft.com, Akil@expresssolution396.onmicrosoft.com ', // list of receivers
//     ubject: "Node Contact Request", // Subject line
//     text: "Hello world?", // plain text body
//     html: `
//     <div style="padding:10px;border-style: ridge">
//     <p>You have a new contact request.</p>
//     <h3>Contact Details</h3>
//     <ul>

//     <li>Vehicle Registration : ${req.body.vRegistration}</li>
//     <li>Approximate value of the car right now? : ${req.body.vApproxValueCar}</li>
//     <li>Does the vehicle have any modifications? *: ${req.body.vModification}</li>
//     <li>Date of Purchase : ${req.body.vDatePurchase}</li>
//     <li>What do you use the car for? : ${req.body.vUseCarFor}</li>
//     <li>Where is the vehicle kept during the day *: ${req.body.vKeptTheDay}</li>
//     <li>Where is the vehicle kept overnight * : ${req.body.vKeptOvernight}</li>
//     <li>Is the vehicle kept at the same address : ${req.body.vKeptSameAddress}</li>
//     <li>Registered Keeper *: ${req.body.VRegKepper}</li>
//     <li>Legal Owner *: ${req.body.vLegalOwner}</li>
//     <li>Estimated Annual Mileage: ${req.body.vAnnualmileage}</li>
//     <li>Type of Cove: ${req.body.vTypeCover}</li>
//     <li>Any no claims discount : ${req.body.vAnyNoDiscount}</li>
//     <li>Was this NCD earned in the UK: ${req.body.vNCDEarned}</li>
//     <li>Would you like to protect your NCD: ${req.body.vProtectNCD}</li>
//     <li>What voluntary excess would you like: ${req.body.vVoluntaryAccess}</li>
//     <li>How do you normally pay for insurance: ${req.body.vPayInsu}</li>
//     <li>When would you like the policy to start: ${req.body.vPolicyStart}</li>




//     <li>How did you hear about us? : ${req.body.pHearUs}</li>
//     <li>If by a friend, family or referrer please state their name: ${req.body.pReferrer}</li>
//     <li>Have you or any of the drivers ever had insurance declined, cancelled or special terms imposed?: ${req.body.pAnyDriver}</li>
//     <li>Title: ${req.body.pTitle}</li>
//     <li>Full Name: ${req.body.pFullName}</li>
//     <li>Date Of Birth:: ${req.body.pBrith}</li>
//     <li>House Name / Number*: ${req.body.PHousNam}</li>
//     <li>First Line of Address*: ${req.body.pAddress}</li>
//     <li>Postcode*: ${req.body.pPostCode}</li>
//     <li>Marital Status *: ${req.body.pMaStatus}</li>
//     <li>Employment Status *: ${req.body.pEmStatus}</li>
//     <li>If Employed/Self Employed, What is your occupation: ${req.body.pOcuupation}</li>
//     <li>If Employed/Self Employed, What is your Business:: ${req.body.pBusiness}</li>
  
//     <li>Any Child Under 16 *: ${req.body.pAnyChild}</li>
//     <li>If Homeowner *:${req.body.pHomeowner}</li>
//     <li>Email *: ${req.body.cEmail}</li>
//     <li>Mobile* :${req.body.cMoble}</li>
//     <li>Telephone* :${req.body.cTelephone}</li>
//     <li>Please Contact Me Via : ${req.body.cContact}</li>




//     <li>Type of License *: ${req.body.dTypeLicense}</li>
//     <li>Period Licence held for *: ${req.body.dPeriodLicense}</li>
//     <li>If held for 3 years or less, what date was licence obtained: ${req.body.dYearsLicenceObtained}</li>
//     <li>Please enter your 16-character GB driving licence number: ${req.body.d16DeivingLicence}</li>
//     <li>DVLA medical conditions or disabilities : ${req.body.dMedicalConditon}</li>
//     <li>Any additional driving qualifications : ${req.body.dAddDrivingqualify}</li>
//     <li>If one is selected, what date was qualification obtained: ${req.body.dDateQualified}</li>
//     <li>Were you born in the UK : ${req.body.dWhreBornUk}</li>
//     <li>If No, when did you last become a UK resident : ${req.body.dLastUkResident}</li>
//     <li>Use of any other vehicles *: ${req.body.dUseOtherVehicle}</li>
//     <li>Non motoring criminal convictions: ${req.body.dNonMoorCriminal}</li>
//     <li>Any motor accidents (fault or non-fault) or claims (whether claim made or not) in the last 5 years : ${req.body.dAnyMotorAccident}</li>
 

    
//     <li>Type: ${req.body.deType}</li>
//     <li>Date: ${req.body.deDate}</li>
//     <li>Damage : ${req.body.deDamage}</li>
//     <li>Cost(£) - if known : ${req.body.deCost}</li>
//     <li>Fault : ${req.body.deFaults}</li>
//     <li>Any Injuries: ${req.body.deInjuries}</li>


//     <li>Type: ${req.body.deType2}</li>
//     <li>Date: ${req.body.deDate2}</li>
//     <li>Damage: ${req.body.deDamage2}</li>
//     <li>Cost(£) - if known : ${req.body.deCost2}</li>
//     <li>Fault: ${req.body.deFaults2}</li>
//     <li>Any Injuries: ${req.body.deInjuries2}</li>
  
    
    
//     <li>Type: ${req.body.deType3}</li>
//     <li>Date: ${req.body.deDate3}</li>
//     <li>Damage: ${req.body.deDamage3}</li>
//     <li>Cost(£) - if known : ${req.body.deCost3}</li>
//     <li>Fault: ${req.body.deFaults3}</li>
//     <li>Any Injuries: ${req.body.deInjuries3}</li>
  


//     <li>In the last 5 years, has the driver had any motoring offences,
//      including fixed penalties, convictions, 
//     driver awareness courses or disqualifications,
//      or any pending prosecutions? *: ${req.body.dMonitorigOffences}</li>

//     <li>Conviction Code : ${req.body.deConvection}</li>
//     <li>Date Of Conviction: ${req.body.deDateConvection}</li>
//     <li>Points : ${req.body.dePoints}</li>
//     <li>Fine(£) - if any: ${req.body.deFine}</li>
//     <li>Ban(Months) - if any: ${req.body.deBan}</li>

//     <li>Conviction Code : ${req.body.deConvection2}</li>
//     <li>Date Of Conviction:: ${req.body.deDateConvection2}</li>
//     <li>Points : ${req.body.dePoints2}</li>
//     <li>Fine(£) - if any: ${req.body.deFine2}</li>
//     <li>Ban(Months) - if any: ${req.body.deBan2}</li>

//     <li>Conviction Code : ${req.body.deConvection3}</li>
//     <li>Date Of Conviction:: ${req.body.deDateConvection3}</li>
//     <li>Points: ${req.body.dePoints3}</li>
//     <li>Fine(£) - if any: ${req.body.deFine3}</li>
//     <li>Ban(Months) - if any: ${req.body.deBan3}</li>

    
//     <li>Additional Comments: ${req.body.adAddComents}</li>
//     <li>Do you give me the consent to agree to our 'Terms & Conditions' on your behalf however, 
//     i will send you that to you in an hour with 
//     a link by text or email? (Office Use Only) : ${req.body.adGiveConsentTerm}</li>
//     <li>Title: ${req.bodyayTitle}</li>
//     <li>Full Name:${req.body.ayName}</li>
//     <li>SurName: ${req.body.aySurName}</li>
//     <li>Relationship to Proposer/Policy Holder:${req.body.ayRealation}</li>
//    <li> Your Date of Birth ${req.body.ayBirthDate}</li>
//     <li>Marital Status: ${req.body.ayMarital}</li>
//     <li>Employment Status: ${req.body.ayEmployStatus}</li>
 
//     <li>If employed/Self-employed, what is your occupation: ${req.body.ayEmployedOccupation}</li>
//     <li>If employed/self-employed, what type of business:${ req.body.ayEmployedBusiness}</li>
//     <li>Type of Licence: ${req.body.ayTypeLicence}</li>
//     <li>Period Licence held for: ${req.body.ayPeriodLicence}</li>
//     <li>if less than 3 years, what date was licence obtained? ${req.body.ay3yearLicenceObtain}</li>
//     <li>Please enter your 16 character driving licence numbe: ${req.body.ayDrivingLicence}</li>
//     <li>DVLA medical conditions or disability ${req.body.ayMedicalCondition}</li>
//     <li>Were you born in the UK: ${req.body.ayBorkUk}</li>
//     <li>if no, when did you become resident of Uk: ${req.body.ayWhereResidentUk}</li>
//     <li>Use of any other vehicle?: ${req.body.ayUseOtherVehicle}</li>
//     <li>Any motor accident (fault or non fault) or claims (whether claim made or not) in the last 5 years?: ${req.body.ayMotoAciedent}</li>
//     <li>Any motor convictions fixed penalitst or disqualification in the last 5 years?: ${req.body.ayMotorDisqualification}</li>

// </ul>
//     `
// };
 
// transporter.sendMail(mailOptions, function(error, info){
//     if (error)
//     {
//       res.json({status: true, respMesg: 'Email Sent Successfully'})
//     } 
//     else
//     {
//       res.json({status: true, respMesg: 'Email Sent Successfully'})
//     }
 
//   });
  // create reusable transporter object using the default SMTP transport
});

// app.post('/placeOrder', (req, res) =>{
//     const orderDetail =req.body;
//     orderDetail.orderTime= new Date();
//     client = new MongoClient(uri, { useNewUrlParser: true });

//     client.connect(err => {
//         const collection = client.db("onlineStore").collection("orders");
//         collection.insertOne(orderDetail, (err, result) => {
//             if(err){
//                 console.log(err);
//                 res.status(500).send({message:err})
//             }
//             else{
//                 res.send(result.ops[0])
//             }

//         })
//         console.log("connection database....")
//         client.close();
//       });

// })

const port = process.env.PORT || 8000;
app.listen(port, () => console.log("listen to me 3001"));
// app.listen();
