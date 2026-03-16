import app from "./app.js"
import env from "./config/env.js";
import logger from "./logs/logger.js"
import {sequelize} from "./database/database.js";
import "./models/user.js"; 
import "./models/task.js"; 

async function main() {
    try {
        //verifica conexion
        await sequelize.authenticate();
        console.log("conexion a postgreSWL ok");
// sincroniza modelos sin borrar datos
        await sequelize.sync({alter: true});
        console.log("modelos sincronizados");

        const port = env.port;
        app.listen(port)
        logger.info("Server on port "  + port  );
    } catch (error) {
        console.error("error al iniciar", error);
        logger.error("error al iniciar", error);
    }
}
main()
