import mongoose from "mongoose";

async function connect_db(params) {
  mongoose.connect(process.env.DB_CONNECTION_STRING);
  return mongoose.connection;
}

export default connect_db;

//