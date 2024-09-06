"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useVariables } from "@/context/variablesEstado";
import { useUsuario } from "@/context/usuario";
import { useFilters } from "@/context/productosfetch";

export const CardInmuebles = () => {
    const { result, dataFavoritos } = useFilters();
    const [final, setFinal] = useState([]);
    const { datafiltacion } = useVariables();
    const { emailCurrent } = useUsuario();
    useEffect(() => {
        if (datafiltacion && datafiltacion.length > 0) {
            setFinal(datafiltacion);
        } else {
            setFinal(result);
        }
    }, [datafiltacion, result]);

    const Favoritos = ({ inmueble }) => {
        const [messageColor, setMessageColor] = useState("");
        const [error, setError] = useState(null);
        
        if (!emailCurrent || emailCurrent === "") return null;

        const handleFavoritos = async (e) => {
            
            try {
                const validacionInmueble = dataFavoritos.find((favorito) => favorito.inmueble.id === inmueble.id);
                if (validacionInmueble !== undefined) {
                    setError("Ya tienes este inmueble en favoritos");
                    setMessageColor("red");
                    setTimeout(() => {
                        setError(null);
                        setMessageColor("");
                    }, 3000)
                    return
                }

                const res = await fetch('http://localhost:4000/api/dashboard/favoritos', {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                        },
                        body: JSON.stringify({ correo: emailCurrent, inmueble }),
                });
    
                const data = await res.json();
                if (data.status === "success") {
                        setMessageColor("green");
                } else {
                    throw new Error(data.message || "Error al añadir a favoritos");
                }

            } catch (error) {
                setMessageColor("red");
                setError(error.message);
                setTimeout(() => {
                    setError(null);
                    setMessageColor("");
                }, 3000);
            }
        };

        return (
            <>
                <button style={{ backgroundColor: messageColor }} onClick={handleFavoritos}>Añadir a favoritos</button>
            </>
        );
    };

    return (
        <>
            {final.map((inmueble) => (
                <div className="cards" key={inmueble.id}>
                    <h3 className="card-category">{inmueble.category}</h3>
                    <div className="card-inmueble__image">
                        <img src={inmueble.images[0]} alt={inmueble.title} width={500} height={300} />
                    </div>
                    <div className="card-inmueble__info">
                        <h3 className="card-price">Price: {inmueble.price}</h3>
                        <div className="card-inmueble__specifications">
                            <h3>Especificaciones</h3>
                            <ul>
                                <li>Estrato: {inmueble.estrato}</li>
                                <li>Área: {inmueble.area} m²</li>
                            </ul>
                        </div>
                        <p className="card-author">Author: &apos;author/propietario del inmueble&apos;</p>
                        <div style={{display: "flex", justifyContent:"space-between" }}>
                            <div>
                                <button><Link href={`/inmuebles/${inmueble.id}`}>Ver inmueble</Link></button>
                            </div>
                            <div>
                                <Favoritos inmueble={inmueble} />
                            </div>
                        </div>
                    </div>

                </div>
            ))}
        </>
    );
};
