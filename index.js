let smsSchema = require("./db/sms");
const express = require("express");
const bodyParser = require("body-parser");
const dotenv = require("dotenv");
const pino = require("express-pino-logger")();
const cors = require("cors");
const app = express();

dotenv.config({});
require("./db/config");
app.use(cors());
app.use(express.json());

const client = require("twilio")(
  process.env.TWILIO_ACCOUNT_SID,
  process.env.TWILIO_AUTH_TOKEN
);

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(pino);


app.get("/",(req,res)=>{
  res.send("hello")
})

app.post("/sent", async (req, res) => {
  try {
    let sms = await smsSchema(req.body);
    let result = await sms.save();
    result = result.toObject();
    const smsSent = await client.messages.create({
      from: process.env.TWILIO_PHONE_NUMBER,
      // from: "+19289166207",
      to: result.phNo,
      body: result.otp,
    });
    res.send(result);
  } catch (error) {
    res.status(404);
  }
});

app.get('/getallsms',async (req,res)=>{
  let result=await smsSchema.find();
  res.send(result)

})

app.listen(5000, () => {
  console.log("app listining");
});
