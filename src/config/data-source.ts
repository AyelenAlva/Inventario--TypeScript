import "reflect-metadata";
import { DataSource } from "typeorm";
import { Usuario } from "../entities/Usuario";
import { Equipo } from "../entities/Equipo";
import { TipoEquipo } from "../entities/TipoEquipo";
import { Ubicacion } from "../entities/Ubicacion";
import dotenv from "dotenv";

dotenv.config();

export const AppDataSource = new DataSource({
  type: "postgres",
  host: process.env.DB_HOST,
  port: Number(process.env.DB_PORT),
  username: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME,
  synchronize: true, // true para desarrollo
  logging: false,
  entities: [Usuario, Equipo, TipoEquipo, Ubicacion],
});
