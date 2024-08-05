import { MongoClient } from "mongodb";
import dotenv from "dotenv";

// Cargar variables de entorno desde el archivo .env
dotenv.config();

export class connect {
    user;
    port;
    #pass;
    #host;
    #cluster;
    #dbName;
    static instance;
    conexion;
    db;

    constructor() {
        if (typeof connect.instance === "object") {
            return connect.instance;
        }
        this.user = process.env.MONGO_USER;
        this.port = process.env.MONGO_PORT;
        this.setPass = process.env.MONGO_PWD;
        this.setHost = process.env.MONGO_HOST;
        this.setCluster = process.env.MONGO_CLUSTER;
        this.setDbName = process.env.MONGO_DB;
        connect.instance = this;
        return this;
    }

    set setPass(pass) {
        this.#pass = pass;
    }

    set setHost(host) {
        this.#host = host;
    }

    set setCluster(cluster) {
        this.#cluster = cluster;
    }

    set setDbName(dbName) {
        this.#dbName = dbName;
    }

    get getPass() {
        return this.#pass;
    }

    get getHost() {
        return this.#host;
    }

    get getCluster() {
        return this.#cluster;
    }

    get getDbName() {
        return this.#dbName;
    }

    async open() {
        // Construcción de la URI con las credenciales del archivo .env
        const uri = `${this.getHost}${this.user}:${this.getPass}@${this.getCluster}:${this.port}/${this.getDbName}`;
        console.log(uri);  // Imprimir la URI para verificar que se construya correctamente
        this.conexion = new MongoClient(uri);
        await this.conexion.connect();
        this.db = this.conexion.db(this.getDbName);
        console.log("Connected to MongoDB");  // * Muestra mensaje de conexión exitosa
    }

    async close() {
        await this.conexion.close();
        console.log("Disconnected from MongoDB");  // * Muestra mensaje de desconexión exitosa
    }
}