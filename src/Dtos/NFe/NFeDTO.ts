const jsonNFe = require('../../../json/nfe')
import { NFeDAO } from "../../Entities/NFe/NFeDAO";
import { INFe } from "../../Interfaces/NFe/NFe";
import { AutorizaNFe } from "./autoriza_nfe";
import { GeraXMLNFe } from "./gera_xml_nfe";
import { HandleNFe } from "./handleNFe/handleNFe";
import { GeraItemsNFe } from './gera_items_nfe';

class NFeDTO {

    private async findFilial(id:number){
        const filial = await new NFeDAO().selectOne(NFeDAO.tbl_filiais, id , 'fk_person')
        return filial[0]
    };
    private async findPerson(id:number){
        const person = await new NFeDAO().selectOne(NFeDAO.tbl_persons, id, 'id_person')
        return person[0]
    };
    private async findCEP(id: number) {
        const cep = await new NFeDAO().selectOne(NFeDAO.tbl_ceps, id, 'id_cep')
        return cep[0]
    };
    private async findCity(id: number) {
        const city = await new NFeDAO().selectOne(NFeDAO.tbl_cities, id, 'id_city')
        return city[0]
    };
    private async findPais(id: number){
        const pais = await new NFeDAO().selectOne(NFeDAO.tbl_paises, id, 'id')
        return pais[0]
    };

    async handleNota(NFe: INFe) {

        // Parametros para a NFe
        const nota_ = await new NFeDAO().selectOne(NFeDAO.tbl_notas, NFe.id_nota, "id_sale")
        const nota = nota_[0]
        const filial_ = await new NFeDAO().selectOne(NFeDAO.tbl_filiais, NFe.fk_name_filial, "id_filial")
        const filial = filial_[0]
        const person_ = await new NFeDAO().selectOne(NFeDAO.tbl_persons, NFe.fk_name_pers, 'id_person')
        const person = person_[0]
        const user_ = await new NFeDAO().selectOne(NFeDAO.tbl_users, NFe.fk_name_user, 'id')
        const user = user_[0]
        const items = await new NFeDAO().selectOne(NFeDAO.tbl_items_nota, NFe.id_nota, 'fk_sale')

        // let nNF_ = new HandleNFe().formatnNF(nota.id_sale)
        let nNF_ = String(nota.id_sale).padStart(9, '0')

        //Funções para dados de Emitente
        const filial_res = await this.findFilial(filial.fk_person)
        const person_filial = await this.findPerson(filial_res.fk_person)
        const cep_filial = await this.findCEP(person_filial.fk_cep)
        const city_filial = await this.findCity(cep_filial.code_city)
        const pais_filial = await this.findPais(city_filial.code_country)

        //Funções dados do Destinatário
        const cep = await this.findCEP(person.fk_cep)
        const city = await this.findCity(cep.code_city)
        const pais = await this.findPais(city.code_country)

        // IDE
        const ide = jsonNFe.nfeProc.NFe.infNFe.ide
        ide.cUF = "35"
        ide.cNF =  nNF_ /*Código numérico que compõe a Chave
                                            de Acesso. Número aleatório gerado
                                            pelo emitente para cada NF-e.*/
        ide.mod = "55"
        ide.serie = "001"
        ide.nNF = nNF_ // Número do documento fiscal
        const dt = new HandleNFe().formatDateNFe()
        ide.dhEmi = dt
        ide.dhSaiEnt = dt
        ide.idDest = '1' /*Identificador de Local de destino da
                            operação (1-Interna;2-Interestadual;3-Exterior)*/
        ide.cMunFG = city_filial.code_ibge
        ide.tpAmb = '2' // 1 Produção - 2 Homologação
        ide.tpNF = "000000001" // Tipo de Documento Fiscal (0 - entrada; 1- saída)
        ide.tpEmis = '1' /* Forma de emissão da NF-e;
            1 - Normal;
            2 - Contingência FS
            3 - Regime Especial NFF (NT 2021.002)
            4 - Contingência DPEC
            5 - Contingência FSDA
            6 - Contingência SVC - AN
            7 - Contingência SVC - RS
            9 - Contingência off-line NFC-e */

        // Dados do Emitente
        const emit = jsonNFe.nfeProc.NFe.infNFe.emit
        emit.CNPJ = filial.cnpj
        emit.xNome = filial.name_filial
        emit.xFant = person_filial.fantasia
        emit.email = filial.email
        emit.fone = person_filial.phone_pers
        emit.enderEmit.xLgr = person_filial.address_pers
        emit.enderEmit.nro = person_filial.num_address
        emit.enderEmit.xBairro = person_filial.bairro_pers
        emit.enderEmit.cMun = city_filial.code_ibge // Cod IBGE para Barbosa Ferraz
        emit.enderEmit.xMun = city_filial.name_city
        emit.enderEmit.CEP = cep_filial.num_cep
        emit.enderEmit.UF = city_filial.uf
        emit.enderEmit.cPais = pais_filial.cod_pais
        emit.enderEmit.xPais = pais_filial.nome_pais
        emit.IE = filial.inscric
        emit.CRT = filial.inscric

        // Dados do Destinatário
        const dest = jsonNFe.nfeProc.NFe.infNFe.dest
        dest.CNPJ = person.cnpj
        dest.CPF = person.cpf_pers
        dest.xNome = person.name_pers
        dest.email = user.username // email do destinatario
        dest.fone = person.phone_pers
        dest.enderDest.xLgr = person.address_pers
        dest.enderDest.nro = person.num_address
        dest.enderDest.xBairro = person.bairro_pers
        dest.enderDest.cMun = city.code_ibge
        dest.enderDest.UF = city.uf
        dest.enderDest.xMun = city.name_city
        dest.enderDest.CEP = cep.num_cep
        dest.enderDest.cPais = pais.cod_pais
        dest.enderDest.xPais = pais.nome_pais
        dest.indIEDest = person.inscricao
        dest.IE = person.inscricao

        const total = jsonNFe.nfeProc.NFe.infNFe.total
        total.ICMSTot.vBC = nota.total_sale
        total.ICMSTot.vICMS = 56.80
        total.ICMSTot.vProd = nota.val_rec
        total.ICMSTot.vNF = nota.val_rec
        total.ICMSTot.CNF = nota.total_sale

        const geraItemsNFe = new GeraItemsNFe()
        const gerarItemsNFe = await geraItemsNFe.gerarItemsNFe(items)
        console.log(gerarItemsNFe)

        const geraXMLNFe = new GeraXMLNFe()
        const gerarXMLNFe = geraXMLNFe.gerarXMLNFe()
        console.log(gerarXMLNFe)

        const geraNFe = new NFeDAO()
        const gerarNFe = await geraNFe.gerarNFe(nota)
        console.log(gerarNFe)

        // const autorizaNFe = new AutorizaNFe()
        // const autorizarNFe = autorizaNFe.autorizarNFe()
        // console.log(autorizarNFe)

        return jsonNFe
    }
}

export { NFeDTO }