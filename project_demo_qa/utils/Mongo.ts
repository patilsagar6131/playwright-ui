import { Page } from "@playwright/test";
import { MongoClient } from "mongodb";

export class Mongo{
	 
	//constructor 
	constructor(){	}

	//connect to mongodb and retrive test data document with given name 
	async connectToMongoDB(connectionString : string ,documentName : string){
		
		const mongoClient = new MongoClient(connectionString);
		
		await mongoClient.connect();		
		if(!process.env.TEST_DB) {
			console.log('database property not defined');
		}		
		const db = mongoClient.db(process.env.TEST_DB);
		const collection = db.collection('users');
		console.log('Connected to Mongo DB and fetching document . . . ');
		const document = await collection.findOne({ name: documentName });
		console.log('Test Data Document fetched from DB . . . ');
		console.log(document)
		return document;
	}
	
}


