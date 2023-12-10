const express = require("express"),
    cors = require("cors");
    swaggerUi = require("swagger-ui-express");
    swaggerJsDoc = require("swagger-jsdoc"),
    connectDatabase = require("./config/db"),
    swaggerOptions = require("./utils/swaggerOptions"),
    userRoute = require("./routes/userRoute"),
    classRoute = require("./routes/classRoute"),
    categoryRoute = require("./routes/categoryRoute"),
    questionRoute = require("./routes/questionRoute"),
    quizRoute = require("./routes/quizRoute"),
    resourceRoute = require("./routes/resourceRoute"),
    adminRoute = require("./routes/adminRoute"),
    { errorHandler } = require("./middlewares/errorHandler"),
    authRoute = require("./routes/authRoute"),
    authMiddleware = require("./middlewares/authMiddleware"),
    historyRoute = require('./routes/historyRoute'),
    verifyJWT = require("./middlewares/verifyJWT"),
    dotenv = require('dotenv').config(),
    PORT = process.env.PORT,


connectDatabase();
const app = express();

app.use(cors());
app.use(express.json());
app.use("/api/v1/users", authRoute);
app.use("/api/v1/documentation", swaggerUi.serve, swaggerUi.setup(swaggerJsDoc(swaggerOptions)));

app.use(verifyJWT);
app.use("/api/v1/users", userRoute);
app.use("/api/v1/classes", classRoute);
app.use("/api/v1/categories", categoryRoute);
app.use("/api/v1/questions", questionRoute);
app.use("/api/v1/quiz", quizRoute);
app.use("/api/v1/resources", resourceRoute);
app.use("/api/v1/admin", authMiddleware(['superuser']), adminRoute);
app.use('/api/v1/history', historyRoute);

app.use(errorHandler);

app.listen(PORT, () => {
    console.log(`Server Running on port ${PORT}`);
});