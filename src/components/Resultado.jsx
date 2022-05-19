
import {Fragment, useCallback, useMemo, useRef } from "react"
import useCotizador from "../hooks/useCotizador"
import { MARCAS, PLANES } from '../constants'


const Resultado = () => {

const { resultado, datos } = useCotizador()

const { marca, plan, year} = datos

const yearRef = useRef(year) // useRef congela el valor, es decir, a year

//        USECOLLBACK

// useCallback(fn, dependencias)
//Para que solo cambie en elinput pero no en el resultado 

// const [nombreMarca] = MARCAS.filter(m => m.id === Number(marca))
// const [nombreMarca] = useCallback( 
//   MARCAS.filter(m => m.id === Number(marca)), // funcion
//   [resultado] // dependencias
// )
// const [nombrePlan] = useCallback( 
//   PLANES.filter(p => p.id === Number(plan)),
//   [resultado]
// )

//        USEMEMO

const [nombreMarca] = useMemo( () =>
  MARCAS.filter(m => m.id === Number(marca)), // funcion
  [resultado] // dependencias
)
const [nombrePlan] = useMemo( () =>
  PLANES.filter(p => p.id === Number(plan)),
  [resultado]
)
console.log(nombreMarca)

if(resultado === 0) return null

  return (
    <div className="bg-gray-100 text-center mt-5 p-5 shadow">
        <h2 className="text-gray-600 font-black text-3xl">Resumen</h2>
        <p className="my-2">
            <span className="font-bold">Marca: </span>
            {nombreMarca.nombre}
        </p>
        <p className="my-2">
            <span className="font-bold">Plan: </span>
            {nombrePlan.nombre}
        </p>
        <Fragment>
          <p className="my-2">
              <span className="font-bold">Año del Auto: </span>
              {yearRef.current}
          </p>
        </Fragment>
        <p className="my-2 text-2xl">
            <span className="font-bold">Total Cotización: </span>
            {resultado}
        </p>
     
    </div>
  )
}

export default Resultado
