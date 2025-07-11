import fs from 'fs';
const jsonNFe = require('../../../json/nfe')
import { IItems } from '../../Interfaces/NFe/NFe';
import { NFeDAO } from '../../Entities/NFe/NFeDAO';

class GeraItemsNFe {
    private async findItem(id: number) {
        const product = await new NFeDAO().selectOne(NFeDAO.tbl_products, id, "id_product")
        return product[0]
    };
    private async findTableTrib(id: number) {
        const table_trib = await new NFeDAO().selectOne(NFeDAO.tbl_table_trib, id, "id_table_trib")
        return table_trib[0]
    };
    private async findUnMeds(id: number) {
        const un_meds = await new NFeDAO().selectOne(NFeDAO.tbl_un_meds, id, "id_un")
        return un_meds[0]
    };

    /**
    * @description Gerar items para XML da NFe
    * @param {*} items
    * @returns String
    */
    async gerarItemsNFe(items: IItems) {
        jsonNFe.nfeProc.NFe.infNFe.det = []
        for (let item of items) {

            //Funções
            const product = await this.findItem(item.fk_product)
            const table_trib = await this.findTableTrib(product.fk_grupo_fiscal)
            const un_med = await this.findUnMeds(product.fk_un_med)

            //Calculos
            const vICMS = parseFloat(table_trib.icms_trib) * parseFloat(table_trib.icms_aliq)
            const vCOFINS = parseFloat(table_trib.cofins_base) * parseFloat(table_trib.cofins_aliq);
            const vPIS = parseFloat(table_trib.pis_base) * parseFloat(table_trib.pis_aliq)

            const newItem = {
                "nItem": (jsonNFe.nfeProc.NFe.infNFe.det.length + 1).toString(),
                "prod": {
                    "cProd": item.fk_product,
                    "cEAN": product.bar_code, //'EAN: ',
                    "xProd": product.descric_product,
                    "NCM": product.ncm, //'NCM: ',
                    "CFOP": '5102', //'CFOP:5102  Usado para vendas de mercadorias adquiridas de terceiros no mesmo Estado',
                    "uCom": un_med.un_med, //'UN:',
                    "qCom": item.amount_product,
                    "vUnCom": item.val_product,
                    "vProd": item.total_product,
                    "cEANTrib": 'EAN Tributável: ',
                    "uTrib": 'Unidade Tributável: ',
                    "qTrib": 'Quantidade Tributável: ',
                    "vUnTrib": 'Valor Unitário Tributável: ',
                    "indTot": 'Indicador de Total: '
                },
                "imposto": {
                    "ICMS": {
                        "ICMS00": {
                            "orig": 'Origem do ICMS',
                            "CST": 'CST:',
                            "modBC": 'Modalidade de BC:',
                            "vBC": table_trib.icms_trib, //'Valor da BC do ICMS:'
                            "pICMS": table_trib.icms_aliq, //'Alíquota do ICMS:',
                            "vICMS": vICMS, //'Valor do ICMS:'
                        }
                    },
                    "PIS": {
                        "PISAliq": {
                            "CST": table_trib.cst_pis, //'CST do PIS: ',
                            "vBC": table_trib.pis_base, //'Valor da BC do PIS: ',
                            "pPIS": table_trib.pis_aliq, //'Alíquota do PIS: ',
                            "vPIS": vPIS, //'Valor do PIS: '
                        }
                    },
                    "COFINS": {
                        "COFINSAliq": {
                            "CST": table_trib.cst_cofins, //'CST do COFINS: ',
                            "vBC": table_trib.cofins_base, //'Valor da BC do COFINS: ',
                            "pCOFINS": table_trib.cofins_aliq, //'Alíquota do COFINS: ',
                            "vCOFINS": vCOFINS //'Valor do COFINS: '
                        }
                    }
                }
            };
            jsonNFe.nfeProc.NFe.infNFe.det.push(newItem);
        };
        fs.writeFileSync('json/nfe.json', JSON.stringify(jsonNFe, null, 2), 'utf-8');
        return 'Items gravados com sucesso.'
    }
}

export { GeraItemsNFe }