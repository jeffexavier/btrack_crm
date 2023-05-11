//adicionar função de conexão com database moongose mongodb...

import mongoose from "mongoose";

const URI = process.env.DB_URL;

const databaseConnection = async () => {
    if(!global.mongoose) {
        mongoose.set('strictQuery', false);
        global.mongoose = await mongoose.connect(URI);
    }
}
export default databaseConnection;