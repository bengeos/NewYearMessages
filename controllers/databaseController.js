const { MongoClient } = require('mongodb');
require('dotenv/config');
class DatabaseController {
    constructor() {
        this.uri = process.env.DB_CONNECTION;
        console.log(this.uri);
        this.dbClient = new MongoClient(this.uri, { useUnifiedTopology: true });
        try {
            // Connect to the MongoDB cluster
            this.dbClient.connect();
            console.log("Database Connected!");
        } catch (e) {
            console.error(e);
        } finally {
            this.dbClient.close();
        }
    }
}
module.exports = DatabaseController;