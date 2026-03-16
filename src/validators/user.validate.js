import joi from "joi";
import { Status } from "../constants/index.js"; 

export const createUserSchema = joi.object({
    username: joi.string().alphanum().min(3).max(30).required(),
    password: joi.string().pattern(new RegExp('^[a-zA-Z0-9]{3,30}$')).required(),
    status: joi.string().valid(Status.ACTIVE, Status.INACTIVE)
});
