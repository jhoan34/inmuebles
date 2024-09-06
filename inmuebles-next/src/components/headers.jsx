import React, { useEffect } from "react";
import Link from 'next/link';
import { useUsuario } from "@/context/usuario";
const Cuenta = () => {
    const { usuariodata, emailCurrent } = useUsuario();

    if (usuariodata) {
        if (emailCurrent === "johanmonsalve125@gmail.com") {
            return (
                <li>
                    <Link href="/dashboardadmin">Dashboard Admin</Link>
                </li>
            );
        }
        return (
            <li>
                <Link href="/dashboard">Dashboard</Link>
            </li>
        );
    }
    return (
        <li>
            <Link href="/login">Login</Link>
        </li>
    );
};

export const Header = () => {

    return (
        <nav className="navbar">
        
            <div className="opciones-menu">
                <li>
                    <Link href="/">Home</Link>
                </li>
                <li>
                    <Link href="/inmuebles">Inmuebles</Link>
                </li>
                <li>
                    <Link href="/contacto">Contacto</Link>
                </li>

                <Cuenta />
            </div>
        </nav>
    );
};
