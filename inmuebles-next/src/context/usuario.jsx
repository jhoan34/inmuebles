import { createContext, useState, useContext, useEffect } from "react";
import { appFirebease } from "@/services/firebase";
import { getAuth, onAuthStateChanged } from "firebase/auth";

const auth = getAuth(appFirebease);

export const UsuarioContext = createContext();

export const UsuarioProvider = ({ children }) => {
    const [usuariodata, setUsuario] = useState(null);

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            if (user) {
                setUsuario(user);
            } else {
                setUsuario(null);
            }
        });

        return () => unsubscribe(); // Clean up the subscription on unmount
    }, []);

    const emailCurrent = usuariodata ? usuariodata.email : null;
    return (
        <UsuarioContext.Provider value={{ usuariodata, setUsuario, emailCurrent }}>
            {children}
        </UsuarioContext.Provider>
    );
};

export function useUsuario() {
    const context = useContext(UsuarioContext);
    if (!context) {
        throw new Error("useUsuario debe usarse dentro de un UsuarioProvider");
    }
    return context;
}
