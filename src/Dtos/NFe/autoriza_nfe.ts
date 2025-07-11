import fs from 'fs';
import soap from 'soap';
const forge = require('node-forge');
const { SignedXml } = require('xml-crypto');
const { DOMParser } = require('xmldom');

class AutorizaNFe {

    /**
     * @description Método para asssinar NFe Modelo 55 e 65
     * @return void
     * @param void
     */
    autorizarNFe() {

        const url = 'https://nfe.sefa.pr.gov.br/nfe/NFeAutorizacao4?wsdl';

        const pfx = fs.readFileSync('CLAUDIA CAROLINE ALVES_26907136000173.pfx'); // Carregar o certificado .pfx

        const pfxAsn1 = forge.asn1.fromDer(pfx.toString('binary')); // Descriptografar o .pfx para obter a chave privada e o certificado
        const p12 = forge.pkcs12.pkcs12FromAsn1(pfxAsn1, '066128');  //senha do certificado
        const bags = p12.getBags({ bagType: forge.pki.oids.certBag });
        const certBag = bags[forge.pki.oids.certBag][0];
        const certificate = certBag.cert;
        const keyBags = p12.getBags({ bagType: forge.pki.oids.pkcs8ShroudedKeyBag });
        const keyBag = keyBags[forge.pki.oids.pkcs8ShroudedKeyBag][0];
        const privateKey = keyBag.key;

        const xml = fs.readFileSync('xml/nfe.xml', 'utf-8');// Carregar o XML da NF-e
        const doc = new DOMParser().parseFromString(xml);

        const sig = new SignedXml();// Criar uma nova assinatura XML
        sig.addReference("//*[local-name(.)='infNFe']", ['http://www.w3.org/2000/09/xmldsig#enveloped-signature'], 'http://www.w3.org/2000/09/xmldsig#sha1');
        sig.signingKey = forge.pki.privateKeyToPem(privateKey);
        sig.keyInfoProvider = {
            getKeyInfo: () => '<X509Data></X509Data>',
            getKey: () => forge.pki.certificateToPem(certificate)
        };

        sig.computeSignature(doc); // Assinar o documento
        const signedXml = sig.getSignedXml();// Converter o documento assinado para string e salvar
        fs.writeFileSync('xmlAssinada/nfe-assinada.xml', signedXml);

        const args = { // Criar a requisição SOAP
            nfeDadosMsg: signedXml
        };

        soap.createClient(url, (err:Error, client:any) => {
            if (err) throw err;
            client.nfeAutorizacaoLote(args, (err:Error, result:Response) => {
                if (err) throw err;
                console.log(result);
            });
        });
    };
};

export { AutorizaNFe }