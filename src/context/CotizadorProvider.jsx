import { useState, createContext } from "react";
import { obtenerDiferenciaYear, calcularMarca, calcularPlan, fomatearDinero } from '../helpers'

const CotizadorContext = createContext()

// provider es el lugar donde vamos a definir el state o el useEffect
// ó de donde vinen los datos

const CotizadorProvider = ({children}) => {

    // const hola = "Hola mundo"

    // const fnHolaMundo = () => {
    //     console.log('Hola mundo desde una funcion')
    // }

    // const [modal, setModal] = useState(false)

    // const cambiarModal = () => {
    //     setModal(!modal)
    // }

    const [datos, setDatos] = useState({
        marca: '',
        year: '',
        plan: ''
    })

    const[error, setError] = useState('')
    const[resultado, setResultado] = useState(0)
    const[cargando, setCargando] = useState(false)


    const hanledChangeDatos = (e) => {
        // console.log(e.target.name)
        // console.log(e.target.value)
        setDatos({
            ...datos,
            [e.target.name] : e.target.value
        })
    }

    const cotizarSeguro = () => {
        // Una base
        let resultado = 2000


        // Obtener diferencia de años
        const diferencia = obtenerDiferenciaYear(datos.year)
        
        // Hay que restar el, 3% por cada año
        resultado -= ((diferencia * 3) * resultado) / 100

        // europeo 30%
        // americano 15%
        // asiatico 5%
        resultado *= calcularMarca(datos.marca)
        // console.log(resultado)

        // basico 20%
        // completo 50%
        resultado *= calcularPlan(datos.plan)
        // resultado = resultado.toFixed(2)

        // FORMATEAR DINERO
        resultado = fomatearDinero(resultado)
        //console.log(resultado)

        setCargando(true)
        setTimeout(() => {
            setResultado(resultado)
            setCargando(false)
        }, 3000)


    }

    return(
        <CotizadorContext.Provider
            value={{
                // hola,
                // fnHolaMundo
                // modal, 
                // setModal,
                // cambiarModal
                hanledChangeDatos,
                datos,
                error,
                setError,
                cotizarSeguro,
                resultado, 
                cargando

            }}
        >
            {children}
        </CotizadorContext.Provider>
    )
}

export {
    CotizadorProvider
}

export default CotizadorContext