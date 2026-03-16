import { Router } from "express";
import userController from "../controllers/user.controller.js";
import validate from "../validators/validate.js";
import { createUserSchema } from "../validators/user.validate.js"; // ✅ createSchema → createUserSchema

const router = Router();

router
    .route("/")
    .get(userController.getUsers)
    .post(validate(createUserSchema), userController.create);

router
    .route("/:id")
    .get(userController.find) // 
    .put(validate(createUserSchema), userController.update) 
    .patch(userController.activateInactivate)
    .delete(userController.eliminar);

export default router;