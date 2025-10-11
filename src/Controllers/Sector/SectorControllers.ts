import { Request, Response } from "express"
import { DAO } from "../../Entities/DAO/DAO";
import { SectorsServices } from "../../Services/Sectors/SectorsServices";
import { ISector } from "../../Interfaces/Sector/Sector";
import { Sector } from "../../Entities/Sector/Sector";

export type TSector = {
  id_sector: number;
  name_sector: string;
};

class SectorConttrollers extends DAO {
  async findAll(request: Request, response: Response) {
    const sectors = await new SectorConttrollers().select('sectors', 'id_sector')
    response.json(sectors)
  };

  async insert(request: Request, response: Response) {
    const res: TSector = <TSector>request.body
    const sector: ISector = new Sector(res.id_sector, res.name_sector)
    const resp = await new SectorsServices().insert(sector)
    // console.log(resp)
    response.json(resp)
  }

  async update(request: Request, response: Response) {
    const res: TSector = <TSector>request.body
    const sector: ISector = new Sector(res.id_sector, res.name_sector)
    const resp = await new SectorsServices().update(sector)
    // console.log(resp)
    response.json(resp)
  }
}

export { SectorConttrollers }