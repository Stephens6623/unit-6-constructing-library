import { MongoClient}  from "mongodb";
import { ObjectId } from "mongodb";
//Library class to manage book collection in MongoDB
class Library {
    constructor(dbUrl, dbName, collName) {
      this.dbUrl = dbUrl;
      this.dbName = dbName;
      this.collName = collName;
      this.dbClient;
      
    }
    // Method to connect to the MongoDB database
async client() {
        console.log(`Connecting to ${this.dbUrl}...`)
        this.dbClient = await MongoClient.connect(this.dbUrl)
        console.log("Connected to database.");
        return this.dbClient;
    }
    // method to test the connection
    async test() {
        const client = await this.client();
        client.close();
        console.log("Connection closed.");
    }
    // Method to get the collection from the database
    async collection() {
        const client = await this.client();
        const db = client.db(this.dbName);
        const collection = db.collection(this.collName);
        return collection;
      }
    // Method to retrieve all books from the collection
    async allBooks() {
        const collection = await this.collection();
        return collection.find({})
    }
    // Method to find a book by its ID
    async findOneBook(id) {
        const docId = new ObjectId(id);
        const collection = await this.collection();
        return collection.findOne({_id: docId});

    }
    // Method to find many books
    async findManyBooks(query) {
        const collection = await this.collection();
        return collection.find(query);
    }

    // Method to add a new book to the collection
     async addBook(info) {
         const collection = await this.collection();
         const result = await collection.insertOne(info);
         console.log('Book added successfully!');
         return result;
     }
 
    // Method to change a book's information
    async changeBook(id, newInfo) {
        const mongoId = new ObjectId(id);
        const infoObj = { $set: newInfo };
        const collection = await this.collection();
        const result = await collection.updateOne({ _id: mongoId }, infoObj);
        console.log('Book information updated successfully!');
        return result;
    }

    // Method to remove a book from the collection
    async removeBook(id) {
        const mongoId = new ObjectId(id);
        const collection = await this.collection();
        await collection.deleteOne({ _id: mongoId });
        console.log('Book removed successfully!');
    }
}
export default Library;