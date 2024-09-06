"use client";

import { useState } from "react";
import { HandleFiltros } from "@/hooks/searchfilters";
import { useVariables } from "@/context/variablesEstado";
import { BuscadorGeneral } from "./BuscadorGeneral";

const useValidacionesDatos = () => {
    const [precio1, setPrecio1] = useState(0);
    const [precio2, setPrecio2] = useState(0);
    const [estrato, setEstrato] = useState(0);

    // Área
    const [desde, setDesde] = useState(0);
    const [hasta, setHasta] = useState(0);

    // Espacios
    const [habitaciones, setHabitaciones] = useState(0);
    const [banos, setBanos] = useState(0);

    const validateData = () => {
        if (precio1 < 0 || precio2 < 0) {
            alert("El precio no puede ser negativo");
            return false;
        }
        if (precio1 > precio2) {
            alert("El precio mínimo no puede ser mayor que el precio máximo");
            return false;
        }
        if (desde < 0 || hasta < 0) {
            alert("El área no puede ser negativa");
            return false;
        }
        if (desde > hasta) {
            alert("El área mínima no puede ser mayor que el área máxima");
            return false;
        }
        if (estrato < 1 || estrato > 6) {
            alert("El estrato debe estar entre 1 y 6");
            return false;
        }
        if (habitaciones < 0 || banos < 0) {
            alert("El número de habitaciones y baños no puede ser negativo");
            return false;
        }
        return true;
    };

    return {
        precio1, precio2, estrato, setPrecio1, setPrecio2, setEstrato, 
        desde, hasta, setDesde, setHasta,
        setHabitaciones, setBanos, habitaciones, banos, 
        validateData
    };
};

export const SearchBar = () => {
    const { categoria} = useVariables();
    const {
        precio1, precio2, estrato, setPrecio1, setPrecio2, setEstrato,
        desde, hasta, setDesde, setHasta, setHabitaciones, setBanos,
        habitaciones, banos, validateData
    } = useValidacionesDatos();

    const { filtracion } = HandleFiltros({ precio1, precio2, estrato, desde, hasta, habitaciones, banos });

    const handleFiltracion = () => {
        if (validateData()) {
            filtracion();
        }
    };

    const RenderValidacionesEspacios = () => {
        if (categoria === "lotes") {
            return null; // No mostrar nada para Lotes
        }
        if (categoria === "oficinas") {
            return (
                <div className="espacio">
                    <h3>Espacios</h3>
                    <div>
                        <h4>Baños</h4>
                        <select
                            id="banos-oficinas"
                            name="banos"
                            onChange={(e) => setBanos(Number(e.target.value))}
                        >
                            <option value="">--seleccione--</option>
                            <option value={1}>1</option>
                            <option value={2}>2</option>
                            <option value={3}>3</option>
                            <option value={4}>4</option>
                        </select>
                    </div>
                </div>
            );
        }

        return (
            <div className="espacio">
                <h3>Espacios</h3>
                <div>
                    <h4>Habitaciones</h4>
                    <select
                        id="habitaciones"
                        name="habitaciones"
                        onChange={(e) => setHabitaciones(Number(e.target.value))}
                    >
                        <option value="">--seleccione--</option>
                        <option value={1}>1</option>
                        <option value={2}>2</option>
                        <option value={3}>3</option>
                        <option value={4}>4</option>
                    </select>
                </div>
                <div>
                    <h4>Baños</h4>
                    <select
                        id="banos"
                        name="banos"
                        onChange={(e) => setBanos(Number(e.target.value))}
                    >
                        <option value="">--seleccione--</option>
                        <option value={1}>1</option>
                        <option value={2}>2</option>
                        <option value={3}>3</option>
                        <option value={4}>4</option>
                    </select>
                </div>
            </div>
        );
    };

    return (
        <>
            <BuscadorGeneral/>
            <div className="searchbar">
                <div className="caja1">
                    <div className="price">
                        <div>
                            <label htmlFor="precio1">Precio: Desde 100.000</label>
                            <input
                                id="precio1"
                                name="precio1"
                                type="number"
                                placeholder="Ingresa el precio desde"
                                onChange={(e) => setPrecio1(Number(e.target.value))}
                            />
                        </div>
                        <div>
                            <label htmlFor="precio2">Precio: Hasta 5.000.000</label>
                            <input
                                id="precio2"
                                name="precio2"
                                type="number"
                                placeholder="Ingresa el precio hasta"
                                onChange={(e) => setPrecio2(Number(e.target.value))}
                            />
                        </div>
                    </div>
                    <div>
                        <label htmlFor="estrato">Estrato:</label>
                        <select
                            id="estrato"
                            name="estrato"
                            onChange={(e) => setEstrato(Number(e.target.value))}
                        >
                            <option value="">--seleccione--</option>
                            <option value={1}>1</option>
                            <option value={2}>2</option>
                            <option value={3}>3</option>
                            <option value={4}>4</option>
                            <option value={5}>5</option>
                            <option value={6}>6</option>
                        </select>
                    </div>
                </div>
                <div className="caja2">
                    <div className="area">
                        <h3>Área</h3>
                        <input
                            id="desde-area"
                            name="desde-area"
                            type="number"
                            placeholder="Desde (m²)"
                            onChange={(e) => setDesde(Number(e.target.value))}
                        />
                        <input
                            id="hasta-area"
                            name="hasta-area"
                            type="number"
                            placeholder="Hasta (m²)"
                            onChange={(e) => setHasta(Number(e.target.value))}
                        />
                    </div>
                    <RenderValidacionesEspacios />
                </div>
                <button onClick={handleFiltracion}>Aplicar Los Filtros</button>
            </div>
        </>
    );
};
