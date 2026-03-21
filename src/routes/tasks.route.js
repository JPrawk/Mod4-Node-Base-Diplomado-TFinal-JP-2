import { Router } from "express";
import taskController from '../controllers/task.controller.js';

const router = Router();

/**
 * @openapi
 * /api/tasks:
 *   get:
 *     summary: Obtener todas las tareas
 *     tags: [Tasks]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Lista de tareas
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Task'
 *       401:
 *         description: No autorizado
 *   post:
 *     summary: Crear una nueva tarea
 *     tags: [Tasks]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/TaskInput'
 *     responses:
 *       201:
 *         description: Tarea creada exitosamente
 *       400:
 *         description: Datos inválidos
 *       401:
 *         description: No autorizado
 */
router.route('/').get(taskController.get).post(taskController.create);

/**
 * @openapi
 * /api/tasks/{id}:
 *   get:
 *     summary: Obtener una tarea por ID
 *     tags: [Tasks]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID de la tarea
 *     responses:
 *       200:
 *         description: Tarea encontrada
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Task'
 *       404:
 *         description: Tarea no encontrada
 *       401:
 *         description: No autorizado
 *   put:
 *     summary: Actualizar una tarea completa
 *     tags: [Tasks]
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
 *             $ref: '#/components/schemas/TaskInput'
 *     responses:
 *       200:
 *         description: Tarea actualizada
 *       404:
 *         description: Tarea no encontrada
 *       401:
 *         description: No autorizado
 *   delete:
 *     summary: Eliminar una tarea
 *     tags: [Tasks]
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
 *         description: Tarea eliminada
 *       404:
 *         description: Tarea no encontrada
 *       401:
 *         description: No autorizado
 *   patch:
 *     summary: Marcar tarea como completada
 *     tags: [Tasks]
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
 *         description: Tarea marcada como completada
 *       404:
 *         description: Tarea no encontrada
 *       401:
 *         description: No autorizado
 */
router
  .route('/:id')
  .get(taskController.find)
  .put(taskController.update)
  .delete(taskController.eliminar)
  .patch(taskController.done);

export default router;