require('dotenv').config()
const { leerInput, inquirerMenu, pausa,listarLugares } = require("./helpers/inquirer");
const { Busquedas } = require("./models/busquedas");


const main = async () => {
    
    const busquedas = new Busquedas()

   
    do {
        opt = await inquirerMenu()
       

        switch (opt){
            case 1:
                // mostrar mensaje
                const termino = await leerInput('Ciudad :')
               
               


                // buscar los lugares
                const lugares = await busquedas.ciudad(termino)
               
                // seleccionar el lugar
                const id = await listarLugares(lugares)

                if (id === '0') continue

                // guarar en db
                
                const lugarSeleccionado = lugares.find( l => l.id === id)
                busquedas.agregarHistorial(lugarSeleccionado.nombre)
                // Clima
                const clima = await busquedas.clima(lugarSeleccionado.lng,lugarSeleccionado.lat)
                // console.log(clima)
                // Mostrar resultados
                console.log('\nInformación de la ciudad \n'.green)
                console.log('Ciudad:',lugarSeleccionado.nombre)
                console.log('Lat:',lugarSeleccionado.lat)
                console.log('Lng:',lugarSeleccionado.lng,)
                console.log('Temperatura:',clima.temp,)
                console.log('Mínima:',clima.temp_min)
                console.log('Maxima:',clima.temp_max)
                console.log('Estado:',clima.desc)
            break;
            case 2:
                busquedas.historialCapitalizado.forEach((lugar,i) =>{
                    const idx = `${i+1}.`.green;
                    console.log(idx,lugar)
                })
                // busquedas.historial.forEach( (lugar,i) => {
                //     const idx = `${i + 1}.`.green
                //     console.log(idx,lugar)
                // })
            break;
            
        }
        if (opt !== 0) await pausa()
    } while (opt !== 0);
}

main()