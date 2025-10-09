import { Request, Response } from "express"
import { DAO } from "../../Entities/DAO/DAO";

  class SubSectorConttrollers extends DAO {
    async findAll(request: Request, response: Response){
    const subSectors = await new SubSectorConttrollers().select('sub_sectors', 'id_sub_sector')
    response.json(subSectors)
    };
 }

export {SubSectorConttrollers}