import { createContext, useState, useContext, useEffect } from "react";
import { db } from "@/services/firebase";
import { collection, onSnapshot } from "firebase/firestore";

const FiltersContext = createContext();

export const FiltersProvider = ({ children }) => {
    const [result, setResult] = useState([]);
    const [dataCuenta, setDataCuenta] = useState([]);
    const [dataFavoritos, setDataFavoritos] = useState([]);

    useEffect(() => {
        const unsubInmuebles = onSnapshot(collection(db, "inmuebles"), (querySnapshot) => {
            const docs = [];
            querySnapshot.forEach((doc) => {
                docs.push({ ...doc.data() });
            });
            setResult(docs);
        }, (error) => {
            console.log(error);
        });

        const unsubCuentas = onSnapshot(collection(db, "infocuenta"), (querySnapshot) => {
            const docs = [];
            querySnapshot.forEach((doc) => {
                docs.push({ ...doc.data(), id: doc.id });
            });
            setDataCuenta(docs);
        }, (error) => {
            console.log(error);
        });

        const unsubFavoritos = onSnapshot(collection(db, "favoritos"), (querySnapshot) => {
            const docs = [];
            querySnapshot.forEach((doc) => {
                docs.push({ ...doc.data() });
            });
            setDataFavoritos(docs);
        }, (error) => {
            console.log(error);
        });

        // Limpieza: desuscribirse de las actualizaciones cuando el componente se desmonte
        return () => {
            unsubInmuebles();
            unsubCuentas();
            unsubFavoritos();
        };
    }, []);

    return (
        <FiltersContext.Provider value={{ result, setResult, dataCuenta, dataFavoritos }}>
            {children}
        </FiltersContext.Provider>
    );
};

export function useFilters() {
    const context = useContext(FiltersContext);
    if (!context) {
        throw new Error("useFilters debe usarse dentro de un FiltersProvider");
    }
    return context;
}
