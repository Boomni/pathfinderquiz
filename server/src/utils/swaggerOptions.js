require('dotenv').config();

const port = process.env.PORT || 5000;

const options = {
    definition: {
        openapi: "3.0.3",
        info: {
            title: "Pathfinder Quiz",
            version: "1.0.0",
            description: "Welcome to the Pathfinder Quiz API documentation Server. \
            \n\nThis API provides access to a trivia quiz platform designed for Pathfinder club members. Users can answer quizzes, access educational resources, and track their progress. Administrators can manage user registrations, resources, and quiz content, ensuring a seamless experience for all club members. \
            \n\nWhether you're a Pathfinder club member or an administrator, this documentation will guide you through the functionalities and endpoints available in our platform. Let's get started on your journey with Pathfinder Quiz! \
            \n\nUseful links: \
            \n- [The Pathfinder Quiz repository](https://github.com/boomni/pathfinderquiz.git) \
            \n- [About Pathfinders](https://nocsdayouthmd.weebly.com/pathfinders.html)" ,
            contact: {
                name: "Boomni Jonathan",
                email: "rejoiceoye1@gmail.com",
            },
        },
        servers: [
            {
                url: `http://localhost:${port}/api/v1/`,
            },
        ],
        security: [
            {
                apiKeyAuth: [],
            },
        ],
        components: {
            securitySchemes: {
                apiKeyAuth: {
                    type: "apiKey",
                    in: "header",
                    name: "Authorization",
                },
            },
        },
    },
    apis: ["./src/routes/*.js"],
};

module.exports = options;