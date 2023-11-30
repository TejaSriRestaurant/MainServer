const fs = require('fs');
const MongoClient = require('mongodb').MongoClient;

// Connection URL and database name
const url = 'mongodb+srv://kanuparthikrishna95:itsme@cluster0.opxun8w.mongodb.net/dbforrat'; // Replace with your MongoDB server URL
const dbName = 'dbforrat'; // Replace with your database name

// Path to your JSON data file
const jsonFilePath = './data.json'; // Replace with the path to your JSON file

// Read JSON data from file
const jsonData = JSON.parse(fs.readFileSync(jsonFilePath, 'utf-8'));

// Function to insert data into MongoDB
async function insertData() {
    const client = new MongoClient(url, { useUnifiedTopology: true });

    try {
        // Connect to the MongoDB server
        await client.connect();

        // Select the database
        const db = client.db(dbName);

        // Select the collection where you want to insert the data
        const collection = db.collection('tejasris'); // Replace with your collection name

        // Insert data into the collection
        const result = await collection.insertMany(jsonData);

        console.log(`Inserted ${result.insertedCount} documents into the collection`);
    } finally {
        // Close the MongoDB connection
        await client.close();
    }
}

// Call the insertData function
insertData().catch(console.error);
