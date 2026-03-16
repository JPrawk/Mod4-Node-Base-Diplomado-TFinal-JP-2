import app from "./app.js"
import env from "./config/env.js";
import logger from "./logs/logger.js"
import {sequelize} from "./database/database.js";
//import "./models/user.js"; // ✅ importar modelos
//import "./models/task.js"; // ✅ importar modelos

async function main() {
    await sequelize.sync({force: true});
    const port = env.port;
    app.listen(port)
    logger.info("Server on port "  + port  )
}
    main()
