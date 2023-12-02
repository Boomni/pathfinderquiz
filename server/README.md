# Pathfinder Quiz Backend

This section focuses on the backend of the Pathfinder Quiz App, providing information about the server-side code responsible for handling API requests, managing the database, and implementing the core logic of the Pathfinder Quiz platform.

## Table of Contents

- [Getting Started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
- [Project Structure](#project-structure)
- [Usage](#usage)
  - [Running the Server](#running-the-server)
  - [Environment Variables](#environment-variables)
- [Testing](#testing)
- [Contributing](#contributing)
- [License](#license)

## Getting Started

### Prerequisites

Before setting up the backend, ensure you have the following installed:

- Node.js and npm
- MongoDB (Make sure it's running)

### Installation

If you've cloned the entire Pathfinder Quiz App repository, navigate to the backend folder:

    cd pathfinderquiz/backend

#### Install dependencies:

    npm install

## Project Structure

The backend code is organized into various directories to maintain a clean and modular structure. Here's an overview:

- `src/controllers`: Handle route logic and interact with services.
- `src/config`: Handle configurations, e.g database setup.
- `src/middleware`: Custom middleware functions.
- `src/models`: Mongoose models for interacting - with the database.
- `src/routes`: Express route definitions.
- `src/utils`: Utility functions.
- `tests`: Test folder

## Usage

### Running the Server

Start the backend server with:

    npm run dev

This will launch the server at http://localhost:5000 (or the specified port in the `.env` file).

### Environment Variables

Create a `.env` file in the backend directory with the following variables:

    PORT=<specify-a-port>
    MONGODB_URI=<your-mongodb-connection-string>
    JWT_SECRET=<your-secret-key>
    # Add any other necessary environment variables

## Testing

Run tests using:

    npm test
