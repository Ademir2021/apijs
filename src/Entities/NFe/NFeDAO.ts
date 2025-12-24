const jsonNFe = require('../../../json/nfe')
import { TNFe } from "../../Interfaces/NFe/NFe";
import { TProduct } from '../../Interfaces/Product/Product';
import { postgreSQL } from "../../Providers/Storages/pg/postgreSQL";
import { DAO } from "../DAO/DAO";

class NFeDAO extends DAO {

    public static tbl_notas = 'sales'
    public static tbl_filiais = 'filiais'
    public static tbl_users = 'users'
    public static tbl_persons = 'persons'
    public static tbl_items_nota = 'itens_sale'
    public static tbl_products = 'products'
    public static tbl_grupos_fiscais = 'grupos_fiscais'
    public static tbl_table_trib = 'table_trib'
    public static tbl_un_meds = 'un_meds'
    public static tbl_ceps = 'ceps'
    public static tbl_cities = 'cities'
    public static tbl_paises = 'paises'

    /**
     * Método para localizar o Produto do item da nota
     * @param fk_product 
     * @returns
     */
    async findItem(fk_product: number) {
        const res = await new NFeDAO().selectOne(NFeDAO.tbl_products, fk_product, "id_product")
        const product: TProduct = res[0]
        return product
    };

    /**
     * Método para localizar o grupo fiscal do produto
     * @param fk_grupo_fiscal 
     * @returns 
     */
    async findGrupoFiscal(fk_grupo_fiscal: number) {
        const grupo_fiscal = await new NFeDAO().selectOne(NFeDAO.tbl_grupos_fiscais, fk_grupo_fiscal, "id_grupo_fiscal")
        return grupo_fiscal[0]
    }

    /**
     * Método para localizar a Tabela de tributação do grupo fiscal
     * @param fk_tabela_trib 
     * @returns 
     */
    async findTableTrib(fk_tabela_trib: number) {
        const table_trib = await new NFeDAO().selectOne(NFeDAO.tbl_table_trib, fk_tabela_trib, "id_table_trib")
        return table_trib[0]
    };

    /**
     * Método para localizar a unidade de medido do produto
     * @param fk_un_med 
     * @returns 
     */
    async findUnMeds(fk_un_med: number) {
        const un_meds = await new NFeDAO().selectOne(NFeDAO.tbl_un_meds, fk_un_med, "id_un")
        return un_meds[0]
    };

    /**
     * Método para localizar a Filial da Nota
     * @param fk_name_filial 
     * @returns 
     */
    async findFilial(fk_name_filial: number) {
        const res = await new NFeDAO().selectOne(NFeDAO.tbl_filiais, fk_name_filial, 'id_filial')
        return res[0]
    };

    /**
     * Método para localizar o cadastro de pessoa para filial
     * @param fk_person 
     * @returns 
     */
    async findPerson(fk_person: number) {
        const res = await new NFeDAO().selectOne(NFeDAO.tbl_persons, fk_person, 'id_person')
        return res[0]
    };

    /**
     * Método para localizar o Cep
     * @param fk_cep 
     * @returns 
     */
    async findCEP(fk_cep: number) {
        const res = await new NFeDAO().selectOne(NFeDAO.tbl_ceps, fk_cep, 'id_cep')
        return res[0]
    };

    /**
     * Método para Lozalizar a Cidade
     * @param code_city 
     * @returns 
     */
    async findCity(code_city: number) {
        const res = await new NFeDAO().selectOne(NFeDAO.tbl_cities, code_city, 'id_city')
        return res[0]
    };

    /**
     * Método para Lozalizar o Pais
     * @param  code_country // fk da tabela de paises
     * @returns 
     */
    async findPais(code_country: number) {
        const res = await new NFeDAO().selectOne(NFeDAO.tbl_paises, code_country, 'id')
        return res[0]
    };

    /**
     * Método para Emitir NFE
     * @param NFe 
     * @returns 
     */
    async gerarNFe(NFe: TNFe) {
        const ide = jsonNFe.nfeProc.NFe.infNFe.ide;
        const chave = jsonNFe.nfeProc.NFe.infNFe;

        const query = `
UPDATE ${NFeDAO.tbl_notas}
SET id_nfe = $1,
doc_nfe = $2,
situacao_nfe = $3,
chave_nfe = $4,
protocolo_nfe = $5
WHERE id_sale = $6
`;

        const values = [
            ide.nNF,
            ide.cNF,
            ide.tpNF,
            chave.chNFe,
            chave.Id,
            NFe.id_sale
        ];

        try {
            const res = await postgreSQL.query(query, values);
            return `NFe Nº:${ide.nNF} gerada com sucesso.`
        } catch (err) {
            return (new NFeDAO().errors(err));
        }
    }
}

export { NFeDAO }