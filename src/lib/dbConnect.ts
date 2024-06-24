import mongoose from "mongoose";

type ConnectionObject = {
    isConnection?: number
}

const connection: ConnectionObject = {}

async function dbConnect(){
    if(connection.isConnection){
        console.log("Databse Allready Connected!");
        return
    }

    try {
        const db = await mongoose.connect(process.env.MONGO_URI || "");
        connection.isConnection = db.connections[0].readyState;

        console.log("Database Connected Successfuly")
    } catch (error) {
        console.log("Database Connection Failed", error);
        process.exit(0)
    }
}

export default dbConnect;