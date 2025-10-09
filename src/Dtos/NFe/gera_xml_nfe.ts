import fs from 'fs';
const jsonNFe = require('../../../json/nfe')
const js2xmlparser = require('js2xmlparser');
import { HandleNFe } from './handleNFe/handleNFe';

const dt = new Date()
const year = dt.getFullYear()
const year_ = year.toString().substr(-2)
const month = dt.getMonth() + 1

class GeraXMLNFe {

    /**
     * Método para gerar XML da NFe
     * @return void
     */
    gerarXMLNFe() {
        const chaveAcesso = jsonNFe.nfeProc.NFe.infNFe.ide.cUF +
            month +
            year_ +
            jsonNFe.nfeProc.NFe.infNFe.emit.CNPJ +
            jsonNFe.nfeProc.NFe.infNFe.ide.mod +
            jsonNFe.nfeProc.NFe.infNFe.ide.serie +
            jsonNFe.nfeProc.NFe.infNFe.ide.nNF +
            jsonNFe.nfeProc.NFe.infNFe.ide.tpEmis +
            jsonNFe.nfeProc.NFe.infNFe.ide.cNF

        const dVerif = new HandleNFe().dvNFe(chaveAcesso);
        jsonNFe.nfeProc.NFe.infNFe.chNFe = chaveAcesso + dVerif;
        console.log(chaveAcesso + dVerif)

        const xml = js2xmlparser.parse("nfeProc", jsonNFe.nfeProc, {// Converter o objeto JSON para XML
            declaration: {
                include: true,
                encoding: "UTF-8"
            }
        });

        fs.writeFile('xml/nfe_num_' + jsonNFe.nfeProc.NFe.infNFe.ide.nNF + '.xml', xml, (err) => {// Escrever o XML em um arquivo
            if (err) {
                throw err;
            }
            console.log('JSON da NFe convertido para XML e gravado com sucesso.');
        });
        fs.close
        return 'Preparando para gerar o XML da NFe'
    };
};

export { GeraXMLNFe }