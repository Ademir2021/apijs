import { Request, Response } from "express"
import { DAO } from "../../Entities/DAO/DAO";
import { SubSector } from "../../Entities/SubSector/SubSector";
import { SubSectorsServices } from "../../Services/SubSectors/SubSectorsService";

export type TSubSector = {
  id_sub_sector: number;
  name_sub_sector: string;
  description_sub_sector: string;
  fk_sector: number;
};

class SubSectorConttrollers extends DAO {
  async findAll(request: Request, response: Response) {
    const subSectors = await new SubSectorConttrollers().select('sub_sectors', 'id_sub_sector')
    response.json(subSectors)
  };

  async insert(request: Request, response: Response) {
    const res: TSubSector = <TSubSector>request.body
    const subSector = new SubSector(res.id_sub_sector, res.name_sub_sector, res.description_sub_sector, res.fk_sector)
    const resp = await new SubSectorsServices().insert(subSector)
    response.json(resp)
  }

  async update(request: Request, response: Response) {
    const res: TSubSector = <TSubSector>request.body
    const subSector = new SubSector(res.id_sub_sector, res.name_sub_sector, res.description_sub_sector, res.fk_sector)
    const resp = await new SubSectorsServices().update(subSector)
    response.json(resp)
  }

}

export { SubSectorConttrollers }