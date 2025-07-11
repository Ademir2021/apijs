import { Request, Response } from "express"
import { DAO } from "../../Entities/DAO/DAO";

  class SectorConttrollers extends DAO {
    async findAll(request: Request, response: Response){
    const sectors = await new SectorConttrollers().select('sectors', 'id_sector')
    response.json(sectors)
    };
 }

export {SectorConttrollers}