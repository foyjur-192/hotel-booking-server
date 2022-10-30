const express = require('express');
const cors = require('cors');
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
require('dotenv').config();
const app = express();


const port = process.env.PORT || 5000;


app.use(cors());
app.use(express.json());


const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.36yxrll.mongodb.net/?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });





async function run(){

    try{
    
        await client.connect();
        const dataCollection = client.db('hotel-booking').collection('booking')
   


        app.post('/booking', async( req, res) => {
            const booking = req.body;
        //    const query = {date: booking.date}  //cannot take same service several time
        const query = { date: booking.date };
           const date = await dataCollection.findOne(query)
           if(date){
             return res.send({success: false, booking: date})
           }
           const result = await dataCollection.insertOne(booking);
            return res.send({success: true, result});
        })


        app.get('/bookingData', async (req, res) => {
            const users = await dataCollection.find().toArray();
            res.send(users);
          });

}

finally{

}

}
run().catch(console.dir);

app.listen(port, () => {
    console.log(`Listening Hotel Server ${port}`)
  })