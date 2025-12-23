import fs from 'fs';
const jsonNFe = require('../../../json/nfe')
import { IItems } from '../../Interfaces/NFe/NFe';
import { IGrupoFiscal, ITableTrib, IUnMed, TProduct } from '../../Interfaces/Product/Product';
import { NFeDAO } from '../../Entities/NFe/NFeDAO';

const nfeDAO = new NFeDAO()

class GeraItemsNFe {

    /**
    * @description Gerar items para XML da NFe
    * @param {*} items
    * @returns String
    */
    async gerarItemsNFe(items: IItems) {

        let vICMS_T_: number = 0
        jsonNFe.nfeProc.NFe.infNFe.det = []

        for (let item of items) {
            //Funções 
            const product: TProduct = await nfeDAO.findItem(item.fk_product)
            const grupo_fiscal: IGrupoFiscal = await nfeDAO.findGrupoFiscal(product.fk_grupo_fiscal)
            const table_trib: ITableTrib = await nfeDAO.findTableTrib(grupo_fiscal.fk_tabela_trib)
            const un_med: IUnMed = await nfeDAO.findUnMeds(product.fk_un_med)

            //Calculos
            const vICMS_ = item.total_product * (table_trib.icms_aliq / table_trib.icms_trib)
            const vICMS: string = vICMS_.toFixed(3)
            vICMS_T_ += vICMS_
            const vICMS_T: String = vICMS_T_.toFixed(3)

            const vCOFINS_ = item.total_product * (table_trib.cofins_aliq / table_trib.cofins_base)
            const vCOFINS: String = vCOFINS_.toFixed(3)

            const vPIS_ = item.total_product * (table_trib.pis_aliq / table_trib.pis_base)
            const vPIS: String = vPIS_.toFixed(3)

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
            jsonNFe.nfeProc.NFe.infNFe.total.ICMSTot.vICMS = vICMS_T
        };
        fs.writeFileSync('json/nfe.json', JSON.stringify(jsonNFe, null, 2), 'utf-8');
        return 'Items gravados com sucesso.'
    }
}

export { GeraItemsNFe }