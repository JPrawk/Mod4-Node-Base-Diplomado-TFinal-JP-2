import { Router } from "express";
import userController from "../controllers/user.controller.js";
import validate from "../validators/validate.js";
import { createUserSchema } from "../validators/user.validate.js"; // ✅ createSchema → createUserSchema
import { authenticateToken } from "../middlewares/authenticate.middleware.js";

const router = Router();

router
    .route("/")
    .get(userController.getUsers)
    .post(validate(createUserSchema), userController.create);

router
    .route("/:id")
    .get(authenticateToken,userController.find) // 
    .put(authenticateToken, validate(createUserSchema), userController.update) 
    .patch(authenticateToken,userController.activateInactivate)
    .delete(authenticateToken,userController.eliminar);

export default router;