const express = require ('express')
const hbs = require("hbs")
const moment = require("moment")
const app = express();

const lugar = require('./lugar/lugar')
const clima = require('./clima/clima');

app.use(express.json());
app.use('/bs',express.static(__dirname+ '/node_modules/bootstrap/'));

app.set('view engine','hbs');

hbs.registerPartials(__dirname + '/views/partials')

hbs.registerHelper('mayusculas',(texto)=>{
    return texto.toUpperCase();
})
hbs.registerHelper('prefijo',(texto)=>{
    return  `%% ${texto}`
})

hbs.registerHelper('fecha',(fecha)=>{
    return moment(fecha,'DD/MM/YYYY').format('DD-MM-YYYY')
})
hbs.registerHelper('edad',(fecha)=>{
    nacimiento = moment(fecha, 'DD/MM/YYYY');
    return moment().diff(nacimiento, 'years');
})

hbs.registerHelper('redondeo',(sueldo)=>{
    valor = Number(sueldo);
    return valor.toFixed(2);
    
})
app.get('/',(request,response)=>{
    const persona = {
        nombres:'cristian',
        apellidos:'montes'
    }
    response.send(persona)
})

app.post('/', (req, res) => {
    res.send("Bye Express")

})

app.get('/lugar', async (req, res)=>{
    const respuesta = await lugar.getLugares(req.query.c);
    res.send(respuesta);

});
app.get('/clima', async(req,res)=>{
    const respuesta = await clima.getClima(req.query.lat, req.query.lon);
    res.send(respuesta);
})

app.post('/clima', async (req,res)=>{
    try {
            if(!req.body.ciudad ||typeof(req.body.ciudad) != "string" ) res.status(400).send({mensaje: "se necesita el paremetro ciudad"})
        const resCiudad= await lugar.getLugares(req.body.ciudad);
        const resClima= await clima.getClima(resCiudad.lat, resCiudad.lng)
        res.status(200).send(resClima)
    
    } catch (error) {
        res.status(400).send({
            mensaje: error.message
        })
       
    }
    
    
});

app.get('/home', (req, res)=>{
    const data = {
        persons: [
            {nombre: "roberto",
             apellido:"flores", 
             sueldo: 200.125,
             fecha_nacimiento:"08/12/1999"},
            {nombre: "nahomi",
             apellido:"araceli",
             sueldo: 200.132,
             fecha_nacimiento:"05/02/1994"},
            {nombre: "kevin",
             apellido:"calvo",
             sueldo: 200.486,
             fecha_nacimiento:"02/11/1997"}
        ]
        
    };
    res.render('index', data);
})

app.get('/mostrar', async (req,res)=>{
    try {
            if(!req.query.ciudad ||typeof(req.query.ciudad) != "string" ) res.render('error', {mensaje: "se necesita el paremetro ciudad"})
        const resCiudad= await lugar.getLugares(req.query.ciudad);
        const resClima= await clima.getClima(resCiudad.lat, resCiudad.lng)
        res.render('clima', resClima)
    
    } catch (error) {
        res.render('error', { mensaje: error.message, })
       
    }
    
    
});


app.listen(9000)