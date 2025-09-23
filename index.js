require("dotenv").config();

const express = require("express");
const mongoose = require("mongoose");

const characterRouter = require('./src/api/routes/characters');
const platformsRouter = require('./src/api/routes/platforms')

const cors= require("cors");
const app = express();
const { connectDB } = require("./src/config/db");

app.use(express.json());
app.use(cors());

connectDB();

app.use("/api/characters", characterRouter);
app.use("/api/platforms", platformsRouter);

app.use((req, res) => {
    return res.status(404).json("Route not found");
})

app.listen(3000, "0.0.0.0", () => {
    console.log("Servidor levantado en: http://localhost:3000")
})