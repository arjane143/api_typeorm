import "reflect-metadata";
import { DataSource } from "typeorm";
import { User } from "../users/user.entity";
import * as config from "../config.json";

export const AppDataSource = new DataSource({
    type: "mysql",
    host: config.database.host,
    port: config.database.port,
    username: config.database.user,
    password: config.database.password,
    database: config.database.database,
    synchronize: false, // Auto-sync DB structure (consider using migrations in production)
    dropSchema:false,
    logging: false,
    entities: [User], // Add all entities here
    migrations: [],
    subscribers: [],
});

// Initialize the database connection
AppDataSource.initialize()
    .then(() => {
        console.log("Database connected successfully!");
    })
    .catch((error) => console.error("Database connection failed:", error));
