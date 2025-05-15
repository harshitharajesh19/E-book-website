import "reflect-metadata";
import { DataSource } from "typeorm";
import { Book } from "./entities/Book.js";
import { User } from "./entities/User.js" ;
import { Wishlist } from "./entities/Wishlist.js";  
import { PasswordReset } from "./entities/PasswordReset.js";

let dataSourceConn = null;

const connectDatabase = async () => {
  if (dataSourceConn) {
    // Return existing connection if already initialized
    return dataSourceConn;
  }

  dataSourceConn = new DataSource({
    type: "mysql",
    host: "localhost",
    port: 3306,
    username: "root",
    password: "your-password",        // replace it with your mysql password
    database: "your-schema-name",     // replace it with your schema name you created to store entities 
    entities: [Book,User,PasswordReset,Wishlist],
    synchronize: true,
  });

  try {
    await dataSourceConn.initialize();
    console.log("Database connection has been initialized!");
    return dataSourceConn;
  } catch (err) {
    console.error("Error during Data Source initialization", err);
    throw err; // Re-throw the error to be handled by the caller
  }
};

export default connectDatabase;
