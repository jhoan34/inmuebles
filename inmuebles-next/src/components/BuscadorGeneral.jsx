"use client";
import { useFilters } from "@/context/productosfetch";
import { useVariables } from "@/context/variablesEstado";
import { useEffect } from "react";

export function BuscadorGeneral() {
    const { result } = useFilters(); // Elimina la coma adicional
    const { categoria, setEstado, estado, setCategoria, datafiltacion, setdatafiltacion } = useVariables();

    useEffect(() => {
        const conpy = [...result];
        if (categoria.toLowerCase() === "inmuebles") {
            setdatafiltacion(conpy);
        } else {
            const categoriaFiltrada = conpy.filter((inmueble) => inmueble.category.toLowerCase() === categoria.toLowerCase());
            setdatafiltacion(categoriaFiltrada);
        }
    }, [categoria, result, setdatafiltacion]);
    
    useEffect(() => {
        const conpy = [...result];
        const estadoFiltrada = conpy.filter((inmueble) => inmueble.status.toLowerCase() === estado.toLowerCase());
        setdatafiltacion(estadoFiltrada);
    }, [estado, result, setdatafiltacion]);
    

    return (
        <div style={{ display: "flex", justifyContent: "center", alignItems: "center", height:"20%", backgroundColor:"red", borderRadius:"10px", backgroundColor: `rgb(0, 0, 0)`, gap:"20%",border: "2px solid  rgb(45, 2, 75)"}}>
            <div className="buscadorGeneral">
                <div className="category" style={{ display: "flex", flexDirection: "column" }}>
                    <label htmlFor="categoria">Categoría:</label>
                    <select id="categoria" name="categoria" onChange={(e) => setCategoria(e.target.value)} style={{ backgroundColor: "black", color: "white", border :"1 px solid #ccc"}}>
                        <option value="inmuebles">Inmuebles</option>
                        <option value="lotes">Lotes</option>
                        <option value="viviendas">Viviendas</option>
                        <option value="oficinas">Oficinas</option>
                        <option value="apartamentos">Apartamentos</option>
                        <option value="cabaña">Cabaña</option>
                        <option value="fincas">Finca</option>
                        <option value="apartastudio">Apartastudio</option>
                    </select>
                </div>
            </div>
            <div style={{ display: "flex", flexDirection: "column" }}>
                <label htmlFor="estado">Venta/Alquiler:</label>
                <select
                    style={{ backgroundColor: "black", color: "white" }}
                    id="estado"
                    name="estado"
                    onChange={(e) => setEstado(e.target.value)}
                >
                    <option value="">--seleccione--</option>
                    <option value="alquiler">Alquiler</option>
                    <option value="venta">Venta</option>
                </select>
            </div>
        </div>
    );
}
