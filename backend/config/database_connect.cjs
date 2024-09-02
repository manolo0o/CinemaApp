require("dotenv").config({ path: './config/.env' });
const mongoose = require('mongoose');

module.exports = class Connect {
    static instance;
    #user;
    #port;
    #pass;
    #host;
    #cluster;
    #dbName;
    #connection;
    uri;

    constructor() {
        if (typeof Connect.instance === 'object') {
            return Connect.instance;
        }
        this.#user = process.env.MONGO_USER;
        this.#port = process.env.MONGO_PORT;
        this.#pass = process.env.MONGO_PASS;
        this.#host = process.env.MONGO_HOST;
        this.#cluster = process.env.MONGO_CLUSTER;
        this.#dbName = process.env.MONGO_DBNAME;
        this.uri = `${this.#host}${this.#user}:${this.#pass}@${this.#cluster}:${this.#port}/${this.#dbName}`;
        this.open();
        Connect.instance = this;
        return this;
    }

    async open() {
        try {
            await mongoose.connect(this.uri);
            console.log("MongoDB connection established successfully");
        } catch (error) {
            console.error("MongoDB connection failed", error);
            await this.reconnect();
        }
    }
    

    async reconnect() {
        console.log('Reconnecting to MongoDB...');
        await this.open();
    }

    async close() {
        try {
            await mongoose.disconnect();
            console.log('MongoDB connection closed');
        } catch (err) {
            console.error('Error closing MongoDB connection:', err);
        }
    }
};
