import { Request, Response } from "express";
import { EquipoService } from "../services/equipo.service";

export class EquipoController {
  static async getAll(req: Request, res: Response) {
    const equipos = await EquipoService.getAll();
    res.json(equipos);
  }

  static async create(req: Request, res: Response) {
    try {
      const equipo = await EquipoService.create(req.body);
      res.status(201).json(equipo);
    } catch (error: any) {
      res.status(400).json({ msg: error.message });
    }
  }

  static async update(req: Request, res: Response) {
    try {
      const equipo = await EquipoService.update(req.params.id, req.body);
      res.json(equipo);
    } catch (error: any) {
      res.status(400).json({ msg: error.message });
    }
  }

  static async delete(req: Request, res: Response) {
    try {
      await EquipoService.delete(req.params.id);
      res.json({ msg: "Equipo eliminado" });
    } catch (error: any) {
      res.status(400).json({ msg: error.message });
    }
  }
}
