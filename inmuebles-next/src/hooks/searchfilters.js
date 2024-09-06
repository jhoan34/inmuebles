import { useState, useEffect } from "react";
import { useFilters } from "@/context/productosfetch";
import { useVariables } from "@/context/variablesEstado";

export const HandleFiltros = ({ precio1, precio2, estrato, desde, hasta, habitaciones, banos }) => {
    const { result } = useFilters();
    const {  datafiltacion , setdatafiltacion } = useVariables();
    const filtracion = () => {
        let copyResult = [...result];

        if (parseInt(precio1) > 0 && parseInt(precio2) > 0) {
            copyResult = copyResult.filter((inmueble) => inmueble.price >= precio1 && inmueble.price <= precio2);
        }

        if (parseInt(estrato) > 0) {
            copyResult = copyResult.filter((inmueble) => inmueble.estrato === parseInt(estrato));
        }
        
        if (desde > 0 && hasta > 0) {
            copyResult = copyResult.filter((inmueble) => inmueble.area >= desde && inmueble.area <= hasta);
        }

        if (habitaciones > 0) {
            copyResult = copyResult.filter((inmueble) => inmueble.habitaciones === habitaciones);
        }

        if (banos > 0) {
            copyResult = copyResult.filter((inmueble) => inmueble.banos === banos);
        }

        setdatafiltacion(copyResult);
    };

    return { filtracion };
};
