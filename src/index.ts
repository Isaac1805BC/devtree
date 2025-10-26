import dotenv from 'dotenv';
dotenv.config();
import colors from 'colors'
import server from './server'
import { connectDB } from "./config/db";

const port = process.env.PORT || 4000;

connectDB();
server.listen(port, () => {
  console.log(colors.bgBlue.magenta.italic("Servidor Funcionando en el puerto:"), port);
});


