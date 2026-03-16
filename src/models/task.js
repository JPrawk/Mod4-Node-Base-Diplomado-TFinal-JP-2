import {DataTypes} from "sequelize";
import {sequelize} from "../database/database.js";
import {Status} from "../constants/index.js";  

export const Task = sequelize.define("tasks", {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            notNull: {
                msg: "Ingrese nombre tarea" ,
            }
        }
    },
    done: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue : false,
    },
   
});