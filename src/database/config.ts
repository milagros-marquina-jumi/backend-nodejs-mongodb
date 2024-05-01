import { MongoClient } from 'mongodb';

class MongoDBConnection {

    private client?: MongoClient;
    private db: any;

    constructor() { };

    async connect(mongoUrl: string) {
        try {
            this.client = new MongoClient(mongoUrl)
            this.client && await this.client.connect();
            console.log('Connected to MongoDB');

        } catch (error) {
            console.error('Error connecting to MongoDB:', error);
        }
    }

    getCollection(collectionName: string) {

        if (this.client) {
            this.db = this.client.db('dashboard');
            return this.db.collection(collectionName);
        }
    }
}

export const dbConnection = new MongoDBConnection()