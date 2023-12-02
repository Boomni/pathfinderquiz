const express = require("express");
const connectDatabase = require("./config/db");
const cors = require("cors");
const swaggerUi = require("swagger-ui-express");
const swaggerJsDoc = require("swagger-jsdoc");
const swaggerOptions = require("./utils/swaggerOptions");

require("dotenv").config();
const PORT = process.env.PORT;

const app = express();

connectDatabase();

app.use(cors());
app.use(express.json());

// Swagger documentation
app.use("/api/v1/documentation", swaggerUi.serve, swaggerUi.setup(swaggerJsDoc(swaggerOptions)));

app.listen(PORT, () => {
    console.log(`Server Running on port ${PORT}`);
});