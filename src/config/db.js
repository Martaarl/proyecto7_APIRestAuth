const moongose = require("mongoose");

const connectDB = async () => {
try {
    if (!process.env.DB_URL) {
        throw new Error('DB_URL environment variable is not defined');
    }
    await moongose.connect(process.env.DB_URL);
    console.log("Conectado con éxito a la base de datos");
} catch (error) {
    console.log("Error conectando a la base de datos", error.message);
    process.exit(1);
}
}

module.exports = {connectDB};