const { leerInput, inquirerMenu, pausa } = require("./helpers/inquirer");
const { Busquedas } = require("./models/busquedas");


const main = async () => {
    
    const busquedas = new Busquedas()

   
    do {
        opt = await inquirerMenu()
       

        switch (opt){
            case 1:
                // mostrar mensaje
                const lugar = await leerInput('Ciudad :')
                busquedas.ciudad(lugar)

                // buscar los lugares

                // seleccionar el lugar

                // Clima

                // Mostrar resultados
                // console.log('\nInformación de la ciudad \n'.green)
                // console.log('Ciudad:',)
                // console.log('Lat:',)
                // console.log('Lng:',)
                // console.log('Temperatura:',)
                // console.log('Mínima:',)
                // console.log('Maxima:',)

            break;
            await pausa()
        }
        if (opt !== 0) await pausa()
    } while (opt !== 0);
}

main()