import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm";
import { Equipo } from "./Equipo";

export enum RolUsuario {
  ADMIN = "admin",
  USER = "user",
}

@Entity()
export class Usuario {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column({ unique: true })
  email: string;

  @Column()
  nombre: string;

  @Column()
  password: string;

  @Column({ type: "enum", enum: RolUsuario, default: RolUsuario.USER })
  rol: RolUsuario;

  @OneToMany(() => Equipo, (equipo) => equipo.responsable)
  equipos: Equipo[];
}
