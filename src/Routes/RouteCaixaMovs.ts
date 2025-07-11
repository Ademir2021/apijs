import { Router } from 'express'
import { CaixaMovControllers  } from '../Controllers/CaixaMov/CaixaMovControllers'

const routerCaixaMovs = Router()
const caixaMovControllers = new CaixaMovControllers()

routerCaixaMovs.post('/caixa_movs', caixaMovControllers.listCaixaMovs)

export {routerCaixaMovs}