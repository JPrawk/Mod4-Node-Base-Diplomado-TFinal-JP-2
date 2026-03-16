import { User } from "../models/user.js";
import { Task } from "../models/task.js";
import logger from "../logs/logger.js";
import { Status } from "../constants/index.js";
import {encriptar} from "../common/bycript.js";

async function create(req, res) {
    const { username, password } = req.body;
    try {
        const newUser = await User.create({ 
            username, 
            password 
        });
        return res.json(newUser);
    } catch (error) {
        logger.error(error);
        return res.json(error.message);
    }
}

async function getUsers(req, res) {
    try {
        const users = await User.findAndCountAll({
            attributes: ["id", "username", "status"], 
            order: [["id", "DESC"]],
            where: {
                status: Status.ACTIVE
            },
        });
        return res.json({
            total: users.count,
            data: users.rows
        });
    } catch (error) {
        logger.error(error);
        return res.json(error.message);
    }
}

async function find(req, res) {
    const { id } = req.params;
    try {
        const user = await User.findOne({
            attributes: ["id", "username", "status"],
            where: { id },
        });
        if (!user) return res.status(404).json({ message: "Usuario no encontrado" });
        return res.json(user);
    } catch (error) {
        logger.error(error);
        return res.json(error.message);
    }
}

const update = async (req, res) => {
    const { id } = req.params;
    const { username, password } = req.body;
    const passwordHash = await encriptar(password);
    //console.log("Pas", passwordHash); // Agregado para verificar el hash generado
    try {
        const user = await User.update(
            { username, 
            password: passwordHash },
            { where: { id } }
        );
        return res.json(user); 
    } catch (error) {
        logger.error(error);
        return res.json(error.message);
    }
};
const activateInactivate = async (req, res) => {
      const { id } = req.params;
    const { status } = req.body;
    if (!status) return res.status(400).json({message: "no existe el status"});
    try {
        const user = await User.findByPk(id);
       if (!user) return res.status(400).json({message: "no existe el usuario"});

        if (user.status === status) return res
        .status(409)
        .json ({message: `El usuario ya se encuentra ${status}`});
    user.status = status;
    await user.save();
        res.json(user);
    } catch (error) {
        logger.error(error);
        return res.json(error.message);
    }
};




const eliminar = async (req, res) => {
    const { id } = req.params;
    try {
        await User.destroy({ 
            where: { id },
        });
        return res.sendStatus(204); 
    } catch (error) {
        logger.error(error);
        return res.json(error.message);
    }
};
export default { 
    create,
    getUsers,
    find,
    update,
    eliminar,
    activateInactivate
};