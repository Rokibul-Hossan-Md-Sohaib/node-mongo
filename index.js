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
    collection.insert(product, (err, result) => {
      if (err) {
        console.log(err);
      } else {
        res.send(result.ops[0]);
      }
    });
    console.log("connection database....");
    client.close();
  });
  var transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.EMAIL,
      pass: process.env.PASS,
    }
});


// quotes@insuretogo.uk , Fahad@expresssolution396.onmicrosoft.com ,espita@expresssolution396@onmicrosoft.com, Akil@expresssolution396.onmicrosoft.com 
var mailOptions = {
    from: process.env.EMAIL,// sender address
    to: 'Rokib@expresssolution396.onmicrosoft.com, ', // list of receivers
    ubject: "Node Contact Request", // Subject line
    text: "Hello world?", // plain text body
    html:  `
    <div style="padding:10px;border-style: ridge">
    <p>You have a new contact request.</p>
    <h3>Vehicle Quotes Details</h3>
    <ul>
   
  ${req.body.vRegistration  ? `<li>Vehicle Registration : ${req.body.vRegistration } </li>`: "" }
    ${req.body.vApproxValueCar ?` <li>Approximate value of the car right now? :${req.body.vApproxValueCar} </li>` :""}
    ${req.body.vModification ?` <li>Does the vehicle have any modifications? *::${req.body.vModification} </li>` :""}
    ${req.body.vDatePurchase ?` <li>Date of Purchase : ${req.body.vDatePurchase} </li>` :""}
    ${req.body.vUseCarFor ?` <li>What do you use the car for? : ${req.body.vUseCarFor} </li>` :""}
    ${req.body.vKeptTheDay?`<li> Where is the vehicle kept during the day *:${req.body.vKeptTheDay} </li>` :""}
    ${req.body.vKeptOvernight?`<li> Where is the vehicle kept overnight * : ${req.body.vKeptOvernight} </li>` :""}
    ${req.body.vKeptSameAddress?` Is the vehicle kept at the same address : ${req.body.vKeptSameAddress} </li>` :""}
    ${req.body.VRegKepper?`<li> Registered Keeper *: ${req.body.VRegKepper} </li>` :""}
    ${req.body.vLegalOwner?` <li>Legal Owner *: ${req.body.vLegalOwner} </li>` :""}
    ${req.body.vAnnualmileage?`<li>Estimated Annual Mileage: ${req.body.vAnnualmileage} </li>` :""}
    ${req.body.vTypeCover?`<li>Type of Cove:  ${req.body.vTypeCover} </li>` :""}
    ${req.body.vAnyNoDiscount?`<li>Any no claims discount : : ${req.body.vAnyNoDiscount} </li>` :""}
    ${req.body.vNCDEarned?`<li>Was this NCD earned in the UK:${req.body.vNCDEarned} </li>` :""}
    ${req.body.vProtectNCD?`<li>Would you like to protect your NCD:${req.body.vProtectNCD} </li>` :""}
    ${req.body.vVoluntaryAccess?`<li>What voluntary excess would you like:${req.body.vVoluntaryAccess} </li>` :""}
    ${req.body.vPayInsu?`<li>How do you normally pay for insurance: ${req.body.vPayInsu} </li>` :""}
    ${req.body.vPolicyStart?`<li>When would you like the policy to start:${req.body.vPolicyStart} </li>` :""}
   


   
    ${req.body.pHearUs?`<li>How did you hear about us? :${req.body.pHearUs} </li>` :""}
    ${req.body.pReferrer?`<li>If by a friend, family or referrer please state their name:${req.body.pReferrer} </li>` :""}
    ${req.body.pAnyDriver?`<li>Have you or any of the drivers ever had insurance declined, cancelled or special terms imposed?:${req.body.pAnyDriver} </li>` :""}
    ${req.body.pTitle?`<li>Title: ${req.body.pTitle} </li>` :""}
    ${req.body.pFirstName?`<li>First Name: ${req.body.pFirstName} </li>` :""}
    ${req.body.pLastName?`<li>Last Name: ${req.body.pLastName} </li>` :""}
    ${req.body.pBrith?`<li>Date Of Birth: ${req.body.pBrith} </li>` :""}
    ${req.body.PHousNam?`<li>House Name / Number*: ${req.body.PHousNam} </li>` :""}
    ${req.body.pAddress?`<li>First Line of Address*: ${req.body.pAddress} </li>` :""}
    ${req.body.pPostCode?`<li>Postcode*: ${req.body.pPostCode} </li>` :""}
    ${req.body.pEmStatus?`<li>Marital Status *:  ${req.body.pMaStatus} </li>` :""}
    ${req.body.pMaStatus?`<li>Employment Status *:  ${req.body.pEmStatus }</li>` :""}
    ${req.body.pOcuupation?`<li>If Employed/Self Employed, What is your occupation: ${req.body.pOcuupation }</li>` :""}
    ${req.body.pBusiness?`<li>If Employed/Self Employed, What is your Business: ${req.body.pBusiness} </li>` :""}


    ${req.body.pAnyChild?`<li>Any Child Under 16 *: ${req.body.pAnyChild} </li>` :""}
    ${req.body.pHomeowner?`<li>If Homeowner *: ${req.body.pHomeowner} </li>` :""}
    ${req.body.cEmail?`<li>Email *: ${req.body.cEmail} </li>` :""}
    ${req.body.cMoble?`<li>Mobile* :${req.body.cMoble} </li>` :""}
    ${req.body.cTelephone?`<li>Telephone* : ${req.body.cTelephone} </li>` :""}
    ${req.body.cContact?`<li>Please Contact Me Via : ${req.body.cContact} </li>` :""}


    ${req.body.dTypeLicense?`<li>Type of License *: ${req.body.dTypeLicense} </li>` :""}
    ${req.body.dPeriodLicense?`<li>Period Licence held for *:${req.body.dPeriodLicense} </li>` :""}
    ${req.body.dYearsLicenceObtained?`<li>If held for 3 years or less, what date was licence obtained:${req.body.dYearsLicenceObtained} </li>` :""}
    ${req.body.d16DeivingLicence?`<li>Please enter your 16-character GB driving licence number:${req.body.d16DeivingLicence}} </li>` :""}
    ${req.body.dMedicalConditon?`<li>DVLA medical conditions or disabilities : ${req.body.dMedicalConditon} </li>` :""}
    ${req.body.dAddDrivingqualify?`<li>Any additional driving qualifications :${req.body.dAddDrivingqualify} </li>` :""}
    ${req.body.dDateQualified?`<li>If one is selected, what date was qualification obtained: ${req.body.dDateQualified} </li>` :""}
    ${req.body.dWhreBornUk?`<li>Were you born in the UK : ${req.body.dWhreBornUk} </li>` :""}
    ${req.body.dLastUkResident?`<li>If No, when did you last become a UK resident : ${req.body.dLastUkResident} </li>` :""}
    ${req.body.dUseOtherVehicle?`<li>Use of any other vehicles *:  ${req.body.dUseOtherVehicle} </li>` :""}
    ${req.body.dNonMoorCriminal?`<li>Non motoring criminal convictions:  ${req.body.dNonMoorCriminal} </li>` :""}
    ${req.body.dAnyMotorAccident?`<li>Any motor accidents (fault or non-fault) or claims (whether claim made or not) in the last 5 years :${req.body.dAnyMotorAccident} </li>` :""}

 

    ${req.body.deType?`<li>Type:${req.body.deType} </li>` :""}
    ${req.body.deDate?`<li>Date:${req.body.deDate} </li>` :""}
    ${req.body.deDamage?`<li>Damage : ${req.body.deDamage} </li>` :""}
    ${req.body.deCost?`<li>Cost(£) - if known : ${req.body.deCost} </li>` :""}
    ${req.body.deFaults?`<li>Fault :${req.body.deFaults} </li>` :""}
    ${req.body.deInjuries?`<li>Any Injuries:${req.body.deInjuries} </li>` :""}



    ${req.body.deType2?`<li>Type:${req.body.deType2} </li>` :""}
    ${req.body.deDate2?`<li>Date:${req.body.deDate2} </li>` :""}
    ${req.body.deDamage2?`<li>Damage : ${req.body.deDamage2} </li>` :""}
    ${req.body.deCost2?`<li>Cost(£) - if known : ${req.body.deCost2} </li>` :""}
    ${req.body.deFaults2?`<li>Fault :${req.body.deFaults2} </li>` :""}
    ${req.body.deInjuries2?`<li>Any Injuries:${req.body.deInjuries2} </li>` :""}
   
  
    
    ${req.body.deType3?`<li>Type:${req.body.deType3} </li>` :""}
    ${req.body.deDate3?`<li>Date:${req.body.deDate3} </li>` :""}
    ${req.body.deDamage3?`<li>Damage : ${req.body.deDamage3} </li>` :""}
    ${req.body.deCost3?`<li>Cost(£) - if known : ${req.body.deCost3} </li>` :""}
    ${req.body.deFaults3?`<li>Fault :${req.body.deFaults3} </li>` :""}
    ${req.body.deInjuries3?`<li>Any Injuries:${req.body.deInjuries3} </li>` :""}

  

    ${req.body.dMonitorigOffences?`<li>In the last 5 years, has the driver had any motoring offences,
    including fixed penalties, convictions, 
   driver awareness courses or disqualifications,
    or any pending prosecutions? *:${req.body.dMonitorigOffences} </li>` :""}


    ${req.body.deConvection?`<li>Conviction Code :${req.body.deConvection} </li>` :""}
    ${req.body.deDateConvection?`<li>Date Of Conviction: ${req.body.deDateConvection} </li>` :""}
    ${req.body.dePoints?`<li>Points : ${req.body.dePoints} </li>` :""}
    ${req.body.deFine?`<li>Fine(£) - if any: ${req.body.deFine}</li>` :""}
    ${req.body.deBan?`<li>Ban(Months) - if any: ${req.body.deBan}</li>` :""}


    ${req.body.deConvection2?`<li>Conviction Code :${req.body.deConvection2} </li>` :""}
    ${req.body.deDateConvection2?`<li>Date Of Conviction: ${req.body.deDateConvection2} </li>` :""}
    ${req.body.dePoints2?`<li>Points : ${req.body.dePoints2} </li>` :""}
    ${req.body.deFine2?`<li>Fine(£) - if any: ${req.body.deFine2}</li>` :""}
    ${req.body.deBan2?`<li>Ban(Months) - if any: ${req.body.deBan2}</li>` :""}
  
    ${req.body.deConvection3?`<li>Conviction Code :${req.body.deConvection3} </li>` :""}
    ${req.body.deDateConvection3?`<li>Date Of Conviction: ${req.body.deDateConvection3} </li>` :""}
    ${req.body.dePoints3?`<li>Points : ${req.body.dePoints3} </li>` :""}
    ${req.body.deFine3?`<li>Fine(£) - if any: ${req.body.deFine3}</li>` :""}
    ${req.body.deBan3?`<li>Ban(Months) - if any: ${req.body.deBan3}</li>` :""}
  



    ${req.body.adAddAnoterDriver?`<li>Would you like to add another additional driver?: ${req.body.adAddAnoterDriver}</li>` :""}
    ${req.body.adAddComents?`  <li>Additional Comments: ${req.body.adAddComents}</li>` :""}
    ${req.body.adGiveConsentTerm?`<li>Do you give me the consent to 
    agree to our 'Terms & Conditions' on your behalf however, 
    i will send you that to you in an hour with 
    a link by text or email? (Office Use Only) : ${req.body.adGiveConsentTerm}</li>` :""}
    ${req.bodyayTitle?` <li>Title:${req.bodyayTitle}</li>` :""}
    ${req.body.ayName?` <li>Full Name:${req.body.ayName}</li>` :""}
    ${req.body.aySurName?` <li>SurName: ${req.body.aySurName}</li>` :""}
    ${req.body.ayRealation?`  <li>Relationship to Proposer/Policy Holder:${req.body.ayRealation}</li>` :""}   
     ${req.body.ayBirthDate?` <li> Your Date of Birth ${req.body.ayBirthDate}</li>` :""}
    ${req.body.ayMarital?` <li>Marital Status:${req.body.ayMarital}</li>` :""}
    ${req.body.ayEmployStatus?` <li>Employment Status: ${req.body.ayEmployStatus}</li>` :""}

    

    ${req.body.ayEmployedOccupation?` <li>If employed/Self-employed, what is your occupation:${req.body.ayEmployedOccupation}</li>` :""}
    ${req.body.ayEmployedBusiness?`<li>If employed/self-employed, what type of business:${req.body.ayEmployedBusiness}</li>` :""}
    ${req.body.ayTypeLicence?` <li>Type of Licence: ${req.body.ayTypeLicence}</li>` :""}
    ${req.body.ayPeriodLicence?`<li>Period Licence held for:${req.body.ayPeriodLicence}</li>` :""}
    ${req.body.ay3yearLicenceObtain?`<li>if less than 3 years, what date was licence obtained? ${req.body.ay3yearLicenceObtain}</li>` :""}
    ${req.body.ayDrivingLicence?` <li>Please enter your 16 character driving licence numbe:${req.body.ayDrivingLicence}</li>` :""}
    ${req.body.ayMedicalCondition?` <li>DVLA medical conditions or disability :${req.body.ayMedicalCondition}</li>` :""}
    ${req.body.ayBorkUk?`   <li>Were you born in the UK: ${req.body.ayBorkUk}</li>` :""}
    ${req.body.ayWhereResidentUk?` <li>if no, when did you become resident of Uk:${req.body.ayWhereResidentUk}</li>` :""}
    ${req.body.ayUseOtherVehicle?`<li>Use of any other vehicle?: ${req.body.ayUseOtherVehicle}</li>` :""}

  
    ${req.body.aydeType?`<li>Any motor accident (fault or non fault) or claims (whether claim made or not) in the last 5 years?: ${req.body.ayMotoAciedent} </li>` :""}
    ${req.body.aydeType?`<li>Type:${req.body.aydeType} </li>` :""}
    ${req.body.aydeDate?`<li>Date:${req.body.aydeDate} </li>` :""}
    ${req.body.aydeDamage?`<li>Damage : ${req.body.aydeDamage} </li>` :""}
    ${req.body.aydeCost?`<li>Cost(£) - if known : ${req.body.aydayeCost} </li>` :""}
    ${req.body.aydeFaults?`<li>Fault :${req.body.aydeFaults} </li>` :""}
    ${req.body.aydeInjuries?`<li>Any Injuries:${req.body.aydeInjuries} </li>` :""}



    ${req.body.aydeType2?`<li>Type:${req.body.aydeType2} </li>` :""}
    ${req.body.aydeDate2?`<li>Date:${req.body.aydeDate2} </li>` :""}
    ${req.body.aydeDamage2?`<li>Damage : ${req.body.aydeDamage2} </li>` :""}
    ${req.body.aydeCost2?`<li>Cost(£) - if known : ${req.body.aydeCost2} </li>` :""}
    ${req.body.aydeFaults2?`<li>Fault :${req.body.aydeFaults2} </li>` :""}
    ${req.body.aydeInjuries2?`<li>Any Injuries:${req.body.aydeInjuries2} </li>` :""}
   
  
    
    ${req.body.aydeType3?`<li>Type:${req.body.aydeType3} </li>` :""}
    ${req.body.aydeDate3?`<li>Date:${req.body.aydeDate3} </li>` :""}
    ${req.body.aydeDamage3?`<li>Damage : ${req.body.aydeDamage3} </li>` :""}
    ${req.body.aydeCost3?`<li>Cost(£) - if known : ${req.body.aydeCost3} </li>` :""}
    ${req.body.aydeFaults3?`<li>Fault :${req.body.aydeFaults3} </li>` :""}
    ${req.body.aydeInjuries3?`<li>Any Injuries:${req.body.aydeInjuries3} </li>` :""}

   
    ${req.body.ayMotorDisqualification?` <li>Any motor convictions fixed penalitst or disqualification in the last 5 years?: ${req.body.ayMotorDisqualification} </li>` :""}
    ${req.body.aydeConvection?`<li>Conviction Code :${req.body.aydeConvection} </li>` :""}
    ${req.body.aydeDateConvection?`<li>Date Of Conviction: ${req.body.aydeDateConvection} </li>` :""}
    ${req.body.aydePoints?`<li>Points : ${req.body.aydePoints} </li>` :""}
    ${req.body.aydeFine?`<li>Fine(£) - if any: ${req.body.aydeFine}</li>` :""}
    ${req.body.aydeBan?`<li>Ban(Months) - if any: ${req.body.aydeBan}</li>` :""}


    ${req.body.aydeConvection2?`<li>Conviction Code :${req.body.aydeConvection2} </li>` :""}
    ${req.body.aydeDateConvection2?`<li>Date Of Conviction: ${req.body.aydeDateConvection2} </li>` :""}
    ${req.body.aydePoints2?`<li>Points : ${req.body.aydePoints2} </li>` :""}
    ${req.body.aydeFine2?`<li>Fine(£) - if any: ${req.body.aydeFine2}</li>` :""}
    ${req.body.aydeBan2?`<li>Ban(Months) - if any: ${req.body.aydeBan2}</li>` :""}
  
    ${req.body.aydeConvection3?`<li>Conviction Code :${req.body.aydeConvection3} </li>` :""}
    ${req.body.aydeDateConvection3?`<li>Date Of Conviction: ${req.body.aydeDateConvection3} </li>` :""}
    ${req.body.aydePoints3?`<li>Points : ${req.body.aydePoints3} </li>` :""}
    ${req.body.aydeFine3?`<li>Fine(£) - if any: ${req.body.aydeFine3}</li>` :""}
    ${req.body.aydeBan3?`<li>Ban(Months) - if any: ${req.body.aydeBan3}</li>` :""}
</ul>
    `
};
 
transporter.sendMail(mailOptions, function(error, info){
    if (error)
    {
      res.json({status: true, respMesg: 'Email Sent Successfully'})
    } 
    else
    {
      res.json({status: true, respMesg: 'Email Sent Successfully'})
    }
 
  });
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
