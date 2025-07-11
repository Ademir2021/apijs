import { Request, Response } from "express";
require('dotenv').config()
import fetch from 'node-fetch';

const authorization:any = process.env.AUTH_PAGSEGURO
const urlPagseguroPix = 'https://api.pagseguro.com/orders'
const urlPagseguroCard = 'https://api.pagseguro.com/orders'
const urlPagseguroBoleto = 'https://api.pagseguro.com/orders'
const urlPublicKey = 'https://api.pagseguro.com/public-keys'

// const authorization: any = process.env.AUTH_PAGSEGURO_SANDOX
// const urlPagseguroPix = 'https://sandbox.api.pagseguro.com/orders'
// const urlPagseguroCard = 'https://sandbox.api.pagseguro.com/orders'
// const urlPagseguroBoleto = 'https://sandbox.api.pagseguro.com/orders'
// const urlPublicKey = 'https://sandbox.api.pagseguro.com/public-keys'

class PagSeguroControllers {

    async insertPix(request: Request, response: Response) {
        try {
            const sale = request.body
            const reqs = await fetch(urlPagseguroPix, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': authorization
                },
                body: JSON.stringify(sale)
            });
            let ress = await reqs.json();
            response.json(ress);
            console.log(sale)
            console.log("/* Iniciando Response **/")
            console.log(ress)
        } catch (err) {
            console.log("Error Occurred ! " + err)
        }
    };

    async insertBoleto(request: Request, response: Response) {
        try {
            const sale = request.body
            const reqs = await fetch(urlPagseguroBoleto, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': authorization
                },
                body: JSON.stringify(sale)
            });
            let ress = await reqs.json();
            response.json(ress);
            console.log(sale)
            console.log("/*Iniciando Response **/")
            console.log(ress)
        } catch (err) {
            console.log("Error Occurred ! " + err)
        }
    };

    async insertCard(request: Request, response: Response) {
        try {
            const sale = request.body
            const reqs = await fetch(urlPagseguroCard, {
                method: 'POST',
                headers: {
                    'accept': 'application/json',
                    'Authorization': authorization,
                    'content-Type': 'application/json'
                },
                body: JSON.stringify(sale)
            });
            const ress = await reqs.json();
            response.json(ress)
            // console.log(sale)
            // console.log("/**Iniciando response */")
             console.log(ress)
        } catch (err) {
            // response.json(err)
            console.log("Error Occurred ! " + err)
        }
    };

    async publicKeyPagSeguro(request: Request, response: Response) {
        try {
            const reqs = await fetch(urlPublicKey, {
                method: 'POST',
                headers: {
                    'Authorization': authorization,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ type: 'card' })
            });
            const public_key = await reqs.json();
            response.json(public_key)
        } catch (err) {
            console.log("Error Occurred ! " + err)
        }
    };
}

export { PagSeguroControllers }