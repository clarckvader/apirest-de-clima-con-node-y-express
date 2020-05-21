//crea un servidor hhtp
const http = require('http')
//funcion con la que respondera el servidor
const holaListener = (request, response) => {
    if (request.method === 'GET'){
    const persona = {
        nombre:'crisian',
        apellido: 'flores',
    }
    response.writeHead(200,{'Content-Type': 'application/json'});
    response.write(JSON.stringify(persona));
    response.end();
    }else{
        const mensaje = {
            mensaje: ' No se admite otro metodo fuera de GET'
        }
        response.writeHead(400,{'Content-Type': 'application/json'});
        response.write(JSON.stringify(mensaje));
        response.end();
    }
}

const server = http.createServer(holaListener);

server.listen(9000);