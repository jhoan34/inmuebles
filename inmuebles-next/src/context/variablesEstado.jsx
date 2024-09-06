import { createContext, useState, useContext, useEffect } from "react";
import { useFilters } from "@/context/productosfetch";

const VariablesContext = createContext();

export const VariablesProvider = ({ children }) => {
    const { result } = useFilters();
    const [categoria, setCategoria] = useState("");
    const [estado, setEstado] = useState("");
    const [datafiltacion, setdatafiltacion] = useState(result);

    useEffect(() => {
        setdatafiltacion(result);
    }, [result]);

    return (
        <VariablesContext.Provider value={{ categoria, setCategoria, estado, setEstado, datafiltacion, setdatafiltacion }}>
            {children}
        </VariablesContext.Provider>
    );
};

export function useVariables() {
    const context = useContext(VariablesContext);
    if (!context) {
        throw new Error("useVariables debe usarse dentro de un VariablesProvider");
    }
    return context;
}
