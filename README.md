# Pathfinder Quiz App

Welcome to the Pathfinder Quiz app repository! This project is a trivia quiz platform designed for Pathfinder club members, featuring both React frontend and Node.js backend components.

## Table of Contents

- [Introduction](#introduction)
- [Features](#features)
- [Getting Started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
- [Usage](#usage)
  - [Frontend](#frontend)
  - [Backend](#backend)
- [API Documentation](#api-documentation)
- [Contributing](#contributing)
- [License](#license)
- [Acknowledgments](#acknowledgments)

## Introduction

This app provides a trivia quiz platform tailored for Pathfinder club members. Users can answer quizzes, access educational resources, and track their progress. Administrators have the capability to manage user registrations, resources, and quiz content, ensuring a seamless experience for all club members.

## Features

- Quiz answering and scoring
- Educational resource access
- Progress tracking for users
- User registration and management for administrators
- Content management for quizzes and resources

## Getting Started

### Prerequisites

Make sure you have the following installed:

- Node.js
- npm
- MongoDB

### Installation

1. Clone the repository:

    ```bash
    git clone https://github.com/boomni/Pathfinder.git
    cd Pathfinder
    ```

2. Install dependencies:

    #### Frontend
    ```bash
    cd client
    npm install
    ```

    #### Backend
    ```bash
    cd server
    npm install
    ```

3. Set up your environment variables:

    Create a `.env` file in the backend directory and add necessary variables

    ```bash
    cp .env.example .env
    ```

4. Run the app:

    #### Frontend
    ```bash
    cd client
    npm start
    ```

    #### Backend
    ```bash
    cd server
    npm start
    ```

## Usage

### Frontend

Visit `http://localhost:3000` to access the React frontend.

### Backend

Visit `http://localhost:8000` to access the Node.js backend.

## API Documentation

Visit `http://localhost:8000/documentation` to explore the API endpoints and functionalities.

<!--
## Contributing

If you'd like to contribute, please follow our [Contribution Guidelines](CONTRIBUTING.md).
-->
## How to Contribute

If you're interested in contributing to this project, feel free to fork the repository and make your changes. Once you're done, submit a pull request, and I'll review your contribution. Thank you for your interest!

## Code of Conduct

Please review and adhere to our basic Code of Conduct:

- Be respectful and inclusive
- Avoid offensive language or behavior
- Collaborate with kindness and empathy

If you have any concerns or encounter issues, feel free to reach out.

## License

This project is licensed under the MIT License.

<!--
## Acknowledgments

- Special thanks to [contributors](https://github.com/boomni/Pathfinder/graphs/contributors) who have participated in this project.
- Inspired by the Pathfinder club community.
-->