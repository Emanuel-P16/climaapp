
const fs = require('fs')
const axios = require('axios');


class Busquedas {
    historial = [];
    dbPath = './db/database.json'
    constructor() {
        // TODO: leer DB si existe
        this.leerDB()
    }

    get historialCapitalizado  () {
        return this.historial.map( lugar => {
            let palabras = lugar.split(' ');
            palabras = palabras.map( p => p[0].toUpperCase() + p.substring(1))
                return palabras.join(' ')
            
        })
    }

    get paramsMapbox () {
        return {
            'access_token':process.env.MAPBOX_KEY,
            'limit':5,
            'language':'es'

        }
    }

    get paramsOpenWeather(){
        return {
            'units':'metric',
            'lang':'es'
        }
    }
    async ciudad ( lugar = ''){
        /// peticion http 
        // console.log('Ciudad',lugar)
        try{
            
            const intance = axios.create({
                baseURL: `https://api.mapbox.com/`,
                params:this.paramsMapbox
                
            })
            const resp = await intance.get(`/geocoding/v5/mapbox.places/${ lugar }.json`);
            // const respuesta = await axios.get('https://api.mapbox.com/geocoding/v5/mapbox.places/BUENOS%20AIRES.json?types=place%2Cpostcode%2Caddress&language=es&access_token=pk.eyJ1IjoiZWRnZXAxNiIsImEiOiJja3lzenFpdGsxOTB3MzF0ODhwanZmNDIyIn0.hplq1ySSH7DRYoSZG532eg')
            return resp.data.features.map( lugar => ({
                id: lugar.id,
                nombre:lugar.place_name,
                lng:lugar.center[0],
                lat:lugar.center[1]
            }))
            
        }catch (error){
            console.log(error)
            return []
        }
       
        // retornar los lugares que coincidan con la variable lugar
    } 

    async clima (lng = '',lat = '') {
        try{
            const instance = axios.create({
                baseURL:'http://api.openweathermap.org/',
                params:this.paramsOpenWeather
            })
            const resp = await instance.get(`/data/2.5/weather?lat=${lat}&lon=${lng}&appid=${process.env.OPENWEATHER_KEY}`)
            const { weather,main} = resp.data

             return {
                 desc: weather[0].description,
                 temp: main.temp,
                 temp_min: main.temp_min,
                 temp_max: main.temp_max

             }
            // return resp.data.main,resp.data.weather[0].description
           
        }catch (error){
            console.log(error)
            return []
        }
    }
    agregarHistorial( lugar = ''){

        /// TODO prevenir duplicados
        /// 
        if (this.historial.includes( lugar .toLowerCase())){
            return;
        } 

        this.historial = this.historial.splice(0,5)
        this.historial.unshift(lugar.toLowerCase());
        /// grabar en db/txt
        this.guardarDB()
    }

    guardarDB(){
        const payload = {
            historial:this.historial
        }
        fs.writeFileSync(this.dbPath, JSON.stringify(payload))
    }

    leerDB(){
        if (!fs.existsSync(this.dbPath)){
            return null;
        }
        const info = fs.readFileSync(this.dbPath,{encoding: 'utf-8'})
        const data = JSON.parse(info)
        this.historial =  data.historial
    }
}

module.exports = {
    Busquedas
}