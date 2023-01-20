const express = require("express");
const app = express();
const { MongoClient, ServerApiVersion, ObjectId } = require("mongodb");
require("dotenv").config();
const port = process.env.PORT || 5000;
const cors = require("cors");
app.use(cors());
app.use(express.json());
require("dotenv").config();

app.get("/", (req, res) => {
  res.send(`Server is running on port ${port}`);
});

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@cluster0.f1cm5cm.mongodb.net/?retryWrites=true&w=majority`;
const client = new MongoClient(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  serverApi: ServerApiVersion.v1,
});

async function run() {
  try {
    const contactCollection = client.db("contactApp").collection("contacts");
    app.get("/api/contacts", async (req, res) => {
      const result = await contactCollection.find({}).toArray();
      res.send(result);
    });
    app.post("/api/contacts", async (req, res) => {
      const contact = req.body;
      const result = await contactCollection.insertOne(contact);
      res.send(result);
    });

    app.delete("/api/contacts", async (req, res) => {
      const id = req.query.id;
      const filter = { _id: ObjectId(id) };
      const result = await contactCollection.deleteOne(filter);
      res.send(result);
    });
  } finally {
  }
}

run().catch((err) => console.log(err));

app.listen(port, () => console.log(`Server is Running on Port ${port}`));
