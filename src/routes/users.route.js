import { Router } from "express";
import userController from "../controllers/user.controller.js";
import validate from "../validators/validate.js";
import { createUserSchema } from "../validators/user.validate.js";
import { authenticateToken } from "../middlewares/authenticate.middleware.js";

const router = Router();

/**
 * @openapi
 * /api/users:
 *   get:
 *     summary: Obtener todos los usuarios
 *     tags: [Users]
 *     responses:
 *       200:
 *         description: Lista de usuarios
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/User'
 *   post:
 *     summary: Crear un nuevo usuario
 *     tags: [Users]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/UserInput'
 *     responses:
 *       201:
 *         description: Usuario creado exitosamente
 *       400:
 *         description: Datos inválidos
 */
router
    .route("/")
    .get(userController.getUsers)
    .post(validate(createUserSchema), userController.create);

/**
 * @openapi
 * /api/users/list/pagination:
 *   get:
 *     summary: Listar usuarios con paginación
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *           example: 1
 *         description: Número de página
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *           example: 10
 *         description: Cantidad de resultados por página
 *     responses:
 *       200:
 *         description: Lista paginada de usuarios
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 total:
 *                   type: integer
 *                   example: 50
 *                 page:
 *                   type: integer
 *                   example: 1
 *                 data:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/User'
 *       401:
 *         description: No autorizado
 */
router.get("/list/pagination", authenticateToken, userController.listPagination);

/**
 * @openapi
 * /api/users/{id}:
 *   get:
 *     summary: Obtener un usuario por ID
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID del usuario
 *     responses:
 *       200:
 *         description: Usuario encontrado
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/User'
 *       404:
 *         description: Usuario no encontrado
 *       401:
 *         description: No autorizado
 *   put:
 *     summary: Actualizar un usuario completo
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/UserInput'
 *     responses:
 *       200:
 *         description: Usuario actualizado
 *       400:
 *         description: Datos inválidos
 *       401:
 *         description: No autorizado
 *       404:
 *         description: Usuario no encontrado
 *   patch:
 *     summary: Activar o desactivar un usuario
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Estado del usuario actualizado
 *       401:
 *         description: No autorizado
 *       404:
 *         description: Usuario no encontrado
 *   delete:
 *     summary: Eliminar un usuario
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Usuario eliminado
 *       401:
 *         description: No autorizado
 *       404:
 *         description: Usuario no encontrado
 */
router
    .route("/:id")
    .get(authenticateToken, userController.find)
    .put(authenticateToken, validate(createUserSchema), userController.update)
    .patch(authenticateToken, userController.activateInactivate)
    .delete(authenticateToken, userController.eliminar);

/**
 * @openapi
 * /api/users/{id}/tasks:
 *   get:
 *     summary: Obtener las tareas de un usuario
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID del usuario
 *     responses:
 *       200:
 *         description: Lista de tareas del usuario
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Task'
 *       401:
 *         description: No autorizado
 *       404:
 *         description: Usuario no encontrado
 */
router.get("/:id/tasks", authenticateToken, userController.getTasks);

export default router;