const moment = require('moment-timezone');

class HandleNFe {

    /**
     * 
     * @description Data e hora formato NFe
     * @example npm install moment moment-timezone
     * @return String
     * 
     */
    formatDateNFe() {
        const dt = new Date()
        return moment().tz('America/Sao_Paulo').utc().format("YYYY-MM-DDTHH:mm:ssZ");
    }

    /**
     * @description Gera Digito verificador
     * const cUf = '42'
     * const cnpj = '18069383000110'
     * const dt = new Date();
     * const month = dt.getUTCMonth() + 1;
     * const year = dt.getUTCFullYear()
     * const mod = '55'
     * const serie = '1'
     * const nNf = '000000001'
     * const tpEmis = '1'
     * const cNf = '000000001'
     * const chaveAcesso = cUf + cnpj + month + year + mod + serie + nNf + tpEmis + cNf
     * 
     * @param {*} chaveAcesso 
     * @returns String
    */

    dvNFe(chaveAcesso: any) {
        if (chaveAcesso.length !== 44) {
            // console.log(chaveAcesso)
            throw new Error("A chave de acesso deve ter 44 dígitos.");
        }
        const pesos = [4, 3, 2, 9, 8, 7, 6, 5, 4, 3, 2, 9, 8, 7, 6, 5, 4, 3, 2, 9, 8, 7, 6, 5, 4, 3, 2, 9, 8, 7, 6, 5, 4, 3, 2, 9, 8, 7, 6, 5, 4, 3, 2];
        let soma = 0;
        for (let i = 0; i < 43; i++) {
            soma += parseInt(chaveAcesso.charAt(i), 10) * pesos[i];
        }
        let resto = soma % 11;
        let digitoVerificador = (resto === 0 || resto === 1) ? 0 : 11 - resto;
        return digitoVerificador;
    };

}

export { HandleNFe }