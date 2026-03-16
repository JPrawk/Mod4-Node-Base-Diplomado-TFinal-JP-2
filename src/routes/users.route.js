import { Router } from "express";
import userController from "../controllers/user.controller.js";
import validate from "../validators/validate.js";
import { createUserSchema } from "../validators/user.validate.js";
import { authenticateToken } from "../middlewares/authenticate.middleware.js";

const router = Router();

router
    .route("/")
    .get(userController.getUsers)
    .post(validate(createUserSchema), userController.create);

// ✅ debe ir ANTES de /:id para que no confunda "list" con un id
router.get("/list/pagination", authenticateToken, userController.listPagination);

router
    .route("/:id")
    .get(authenticateToken, userController.find)
    .put(authenticateToken, validate(createUserSchema), userController.update) 
    .patch(authenticateToken, userController.activateInactivate)
    .delete(authenticateToken, userController.eliminar);

router.get("/:id/tasks", authenticateToken, userController.getTasks);

export default router;