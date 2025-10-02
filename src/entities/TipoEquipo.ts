import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm";
import { Equipo } from "./Equipo";

@Entity()
export class TipoEquipo {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  nombre: string;

  @OneToMany(() => Equipo, (equipo) => equipo.tipo)
  equipos: Equipo[];
}
