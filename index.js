require("dotenv").config();

const express = require("express");
const mongoose = require("mongoose");

const artistsRouter = require('./src/api/routes/artists');
const albumsRouter = require('./src/api/routes/albums')

const cors= require("cors");
const app = express();
const { connectDB } = require("./src/config/db");
const usersRouter = require("./src/api/routes/users");

app.use(express.json());
app.use(cors());

connectDB();

app.use("/api/artists", artistsRouter);
console.log("Router montado");

app.use("/api/albums", albumsRouter);
app.use("/api/users", usersRouter)

app.use((req, res) => {
    return res.status(404).json("Route not found");
})

app.listen(3000, "0.0.0.0", () => {
    console.log("Servidor levantado en: http://localhost:3000")
})