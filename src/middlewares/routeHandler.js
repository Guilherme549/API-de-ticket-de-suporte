import { Database } from "../database/database.js";
import { routes } from "../routes/index.js";
import { extractQueryParams } from "../utils/extractQueryPath.js";

const database = new Database() // o banco é instanciado aqui porque ai as rotas terao a mesma referencia de banco de dados

export function routeHandler(request, response){
    const route = routes.find((route) => {
        return route.method === request.method && route.path.test(request.url)
    })

    if(route){
        const routeParams = request.url.match(route.path)

        const { query } = routeParams.groups

        request.query = query ? extractQueryParams(query) : {}

        return route.controller({request, response, database})
    }

    return response.writeHead(404).end()
}