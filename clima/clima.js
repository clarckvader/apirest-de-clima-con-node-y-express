const instClima = require('../config/axios').instClima;

const getClima = async (lat, lng) => {
    try {
        const response = await instClima.get('',{
            params: { lat: lat, lon:lng}
        });
        return response.data    
    } catch (error) {
        throw new Error("no hay datos de clima disponibles")
    }
    
   
    
}

module.exports = {
    getClima
}