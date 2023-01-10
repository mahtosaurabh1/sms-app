const mongoose=require('mongoose')
const connect=process.env.DB_URI
mongoose.set('strictQuery', true);
mongoose.connect(connect).then(() => {
    console.log("connected to database");
}).catch((err=>{
    console.log(err)
}))