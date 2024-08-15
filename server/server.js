import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import UserRoutes from "./routes/UserRoutes.js";
import DrugRoutes from "./routes/DrugRoutes.js";

const app = express();
app.use(express.json());
app.use(cors());
app.use(UserRoutes)
app.use(DrugRoutes)

app.get("/", (req, res) => {
    res.send("Welcome to the Drug App API, please wave and say hello.");
});

mongoose.connect("mongodb+srv://rationalpi:bJaah4jRvWq8KUQV@cluster0.w5b1muo.mongodb.net/?retryWrites=true&w=majority");

// set port, listen for requests
app.listen(8885, () => { console.log(`Server is running on port ${8885}.`);});