import { Request, Response } from "express";
import slug from 'slug'
import User from "../models/User";
import { hashPassword } from "../utils/auth";

export const createAccount = async (req: Request, res: Response) => {
  const { email, password} = req.body;

  const userExists = await User.findOne({ email });
  if (userExists) {
    const error = new Error("El Usuario ya esta registado");
    return res.status(409).json({ error: error.message });
  }

  
  const handle = slug(req.body.handle,'_')
  const handleExists = await User.findOne({ handle });
  if (handleExists) {
    const error = new Error("El nombre de usuario no esta disponible");
    return res.status(409).json({ error: error.message });
  }


  const user = new User(req.body);
  user.password = await hashPassword(password);
  user.handle = handle

  

  await user.save();

  res.status(201).send("Registro Creado Correctamente");
};
