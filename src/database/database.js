import {  Sequelize } from "sequelize"; 
import env from "../config/env.js"; // revisar el src

export const sequelize = new Sequelize(
   env.db_database, // db name
   env.db_user, // username
   env.db_password,  // password
   {
    host: env.db_host,
    dialect: env.db_dialect,
    logging: console.log,
   }
);