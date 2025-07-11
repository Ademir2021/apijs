const jsonNFe = require('../../../json/nfe')
import { INFe, TNFe } from "../../Interfaces/NFe/NFe";
import { postgreSQL } from "../../Providers/Storages/pg/postgreSQL";
import { DAO } from "../DAO/DAO";

class NFeDAO extends DAO {
    public static tbl_notas = 'sales'
    public static tbl_filiais = 'filiais'
    public static tbl_users = 'users'
    public static tbl_persons = 'persons'
    public static tbl_items_nota = 'itens_sale'
    public static tbl_products = 'products'
    public static tbl_table_trib = 'table_trib'
    public static tbl_un_meds = 'un_meds'
    public static tbl_ceps = 'ceps'
    public static tbl_cities = 'cities'
    public static tbl_paises = 'paises'

    async gerarNFe(NFe: TNFe) {
        const ide = jsonNFe.nfeProc.NFe.infNFe.ide
        const chave = jsonNFe.nfeProc.NFe.infNFe
        try {
          const res =  await postgreSQL.query("UPDATE " + NFeDAO.tbl_notas + " SET  id_nfe = '" + ide.nNF + "', doc_nfe = '" + ide.cNF + "', situacao_nfe ='" + ide.tpNF + "', chave_nfe ='" + chave.chNFe + "', protocolo_nfe = '" + chave.Id + "' WHERE id_sale = '" + NFe.id_sale + "'")
          return res
        } catch (err) {
            return (new NFeDAO().errors(err))
        }
    };
}

export { NFeDAO }