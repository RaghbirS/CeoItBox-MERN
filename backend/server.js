const express = require('express');
const app = express();
const cors = require("cors")
const port = process.env.PORT || 3001;
const { connection,
    UserModel,
    AllDataModel } = require("./db");

app.use(express.json({ limit: '50mb' }))
app.use(cors())


// UserModel EndPoint

app.get("/users", async (req, res) => {
    const query = req.query;
    const data = await UserModel.find(query)
    res.send(data)
})
app.get("/users/:id", async (req, res) => {
    const id = req.params.id;
    const data = await UserModel.findById(id);
    res.send(data);
})
app.post("/users", async (req, res) => {
    const data = req.body;
    const testimonials = new UserModel(data);
    await testimonials.save()
    res.send(data)
})
app.delete("/users/:id", async (req, res) => {
    const id = req.params.id;
    const deletedObject = await UserModel.findByIdAndDelete(id);
    res.send(`Object with ID:${id} has been deleted`);
})
app.patch("/users/:id", async (req, res) => {
    const data = req.body;
    const id = req.params.id;
    const updatedObjet = await UserModel.findOneAndUpdate({ _id: id }, data);
    res.send(`Object with ID:${id} has been deleted`);
})

// AllDataModel EndPoint

app.get("/AllData", async (req, res) => {
    const query = req.query;
    const data = await AllDataModel.find(query)
    res.send(data)
})
app.get("/AllData/:id", async (req, res) => {
    const id = req.params.id;
    const data = await AllDataModel.findById(id);
    res.send(data);
})
app.post("/AllData", async (req, res) => {
    const data = req.body;
    const testimonials = new AllDataModel(data);
    await testimonials.save()
    res.send(data)
})
app.delete("/AllData/:id", async (req, res) => {
    const id = req.params.id;
    const deletedObject = await AllDataModel.findByIdAndDelete(id);
    res.send(`Object with ID:${id} has been deleted`);
})
app.patch("/AllData/:id", async (req, res) => {
    const data = req.body;
    const id = req.params.id;
    const updatedObjet = await AllDataModel.findOneAndUpdate({ _id: id }, data);
    res.send(`Object with ID:${id} has been deleted`);
})



app.listen(port, async () => {
    try {
        await connection
        console.log("Connected to db")
    } catch (err) {
        console.log(err)
    }
    console.log("Server Started at PORT", port)
})