const express = require("express");
const cors = require("cors");
const swaggerUi = require("swagger-ui-express");
const swaggerJsDoc = require("swagger-jsdoc");
const connectDatabase = require("./config/db");
const swaggerOptions = require("./utils/swaggerOptions");
const userRoute = require("./routes/userRoute");
const classRoute = require("./routes/classRoute");
const categoryRoute = require("./routes/categoryRoute");
const questionRoute = require("./routes/questionRoute");
const quizRoute = require("./routes/quizRoute");
const resourceRoute = require("./routes/resourceRoute");
const adminRoute = require("./routes/adminRoute");
const { errorHandler } = require("./middlewares/errorHandler");
const authRoute = require("./routes/authRoute");
const morgan = require("morgan");
const authMiddleware = require("./middlewares/authMiddleware");

require('dotenv').config();

const PORT = process.env.PORT;
connectDatabase();

app = express();

app.use(cors());
app.use(express.json());

app.use("/api/v1/documentation", swaggerUi.serve, swaggerUi.setup(swaggerJsDoc(swaggerOptions)));
app.use("/api/v1/users", userRoute);
app.use("/api/v1/users", authRoute);
app.use("/api/v1/classes", classRoute);
app.use("/api/v1/categories", categoryRoute);
app.use("/api/v1/questions", questionRoute);
app.use("/api/v1/quiz", quizRoute);
app.use("/api/v1/resources", resourceRoute);
app.use("/api/v1/admin", adminRoute);

app.use(morgan('dev'));
app.use(authMiddleware);
app.use(errorHandler);

app.listen(PORT, () => {
    console.log(`Server Running on port ${PORT}`);
});