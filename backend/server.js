const express = require("express");
const Sequelize = require("sequelize");
const bodyParser = require('body-parser');
const http = require("http");
const socketIO = require("socket.io");
const app = express();
const server = http.createServer(app);
const io = socketIO(server, { cors: { origin: '*' } });
require('dotenv').config()

const PORT = process.env.SERVER_PORT || 8082;
const db = new Sequelize(process.env.DB_DATABASE, process.env.DB_USERNAME, process.env.DB_PASSWORD, {
    host: process.env.DB_HOST,
    dialect: process.env.DB_DILECT,
    pool: {
        max: 5,
        min: 0,
        acquire: 30000,
        idle: 10000
    }
});

app.use(bodyParser.json());

app.post("/api/locations", async(req, res) => {
    try {
        const { user_id, latitude, longitude, timestamp } = req.body;

        await db.query(
            `INSERT INTO location_data(user_id, location, timestamp) VALUES(${user_id}, ST_SetSRID(ST_MakePoint(${latitude}, ${longitude}), 4326), '${timestamp}')`
        );

        io.emit("locationUpdate", { user_id, latitude, longitude, timestamp });

        res.status(200).json({ message: "Location data saved successfully" });
    } catch (error) {
        console.error("Error saving location data:", error);
        res.status(500).json({ error: "Internal server error" });
    }
});

server.listen(PORT, () => {
    console.log(`API server is running on port ${PORT}`);
});