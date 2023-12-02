const express = require("express");
const connectDatabase = require("./config/db")
require("dotenv").config();

const PORT = process.env.PORT;
connectDatabase();

app = express();

app.listen(PORT, () => {
    console.log(`Server Running on port ${PORT}`);
});