const axios = require('axios')

class Busquedas {
    historial = [];
    constructor() {
        // TODO: leer DB si existe
    }

    async ciudad ( lugar = ''){
        /// peticion http 
        // console.log('Ciudad',lugar)
        try{
            const instance = axios.create({
                baseURL: `https://api.mapbox.com/geocoding/v5/mapbox.places/${lugar}.json`,
                params: {
                   'access_token': 'pk.eyJ1IjoiZWRnZXAxNiIsImEiOiJja3lzenFpdGsxOTB3MzF0ODhwanZmNDIyIn0.hplq1ySSH7DRYoSZG532eg',
                    'limit':5,
                    'lenguage':'es'
                }
            })
            const resp = await instance.get();
            // const respuesta = await axios.get('https://api.mapbox.com/geocoding/v5/mapbox.places/BUENOS%20AIRES.json?types=place%2Cpostcode%2Caddress&language=es&access_token=pk.eyJ1IjoiZWRnZXAxNiIsImEiOiJja3lzenFpdGsxOTB3MzF0ODhwanZmNDIyIn0.hplq1ySSH7DRYoSZG532eg')
            console.log('hola')
            console.log(resp.data)
            return []
        }catch (error){
            return []
        }
       
        // retornar los lugares que coincidan con la variable lugar
    } 

}

module.exports = {
    Busquedas
}