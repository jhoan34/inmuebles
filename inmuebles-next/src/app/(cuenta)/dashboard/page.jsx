"use client"

import { useEffect, useState } from "react";
import { useFilters } from "@/context/productosfetch";
import { useUsuario } from "@/context/usuario";
import { getAuth, signOut } from "firebase/auth";
import { appFirebease } from "@/services/firebase";
import { useRouter } from "next/navigation";
import "./dashboard.css"

const auth = getAuth(appFirebease);

const Cuenta = () => {
    const { usuariodata } = useUsuario();
    const { dataCuenta } = useFilters();
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);
    const [form, setForm] = useState({
        name: '',
        correo: usuariodata.email,
        celular: '',
        direccion: '',
        ciudad: '',
        pais: '',
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        if (name === "correo" && value !== usuariodata.email) {
            setError("No puedes cambiar el correo");
        } else {
            setError(null);
            setForm({
                ...form,
                [name]: value
            });
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(JSON.stringify(form));
        if (form.correo !== usuariodata.email) {
            setError("No se puede editar porque el correo no coincide con el correo de la cuenta");
            return;
        }

        if (!form.name || !form.celular || !form.direccion || !form.ciudad || !form.pais) {
            setError("Todos los campos son obligatorios");
            return;
        }

        setLoading(true);

        fetch('http://localhost:4000/api/dashboard/cuenta', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(form)
        })
        .then(response => response.json())
        .then(data => {
            setForm({
                name: '',
                correo: usuariodata.email,
                celular: '',
                direccion: '',
                ciudad: '',
                pais: '',
            });
            setError("Información actualizada correctamente");
            setTimeout(() => {
                setError(null);
            }, 3000);
            window.location.reload();
        })
        .catch(error => {
            console.error('Error al enviar la solicitud:', error);
            setError("Error al enviar la solicitud, inténtalo de nuevo más tarde");
        })
        .finally(() => {
            setLoading(false);
        });
    };

    return (
        <div className="form-info-cuenta">
            <h2>Información de la Cuenta</h2>
            <form onSubmit={handleSubmit} className="form-cuenta-datos">
                <div>
                    <label className="form-label" htmlFor="correo">Correo: favor de no cambiar el correo en el formulario</label>
                    <input className="form-input" type="email" id="correo" value={form.correo} name="correo" onChange={handleChange} disabled />
                </div>
                <div>
                    <label className="form-label" htmlFor="name">Nombre:</label>
                    <input className="form-input" type="text" id="name" value={form.name} name="name" onChange={handleChange} />
                </div>
                <div>
                    <label className="form-label" htmlFor="celular">Celular:</label>
                    <input className="form-input" type="tel" id="celular" value={form.celular} name="celular" onChange={handleChange} />
                </div>
                <div>
                    <label className="form-label" htmlFor="direccion">Dirección:</label>
                    <input className="form-input" type="text" id="direccion" value={form.direccion} name="direccion" onChange={handleChange} />
                </div>
                <div>
                    <label className="form-label" htmlFor="ciudad">Ciudad:</label>
                    <input className="form-input" type="text" id="ciudad" value={form.ciudad} name="ciudad" onChange={handleChange} />
                </div>
                <div>
                    <label className="form-label" htmlFor="pais">País:</label>
                    <input className="form-input" type="text" id="pais" value={form.pais} name="pais" onChange={handleChange} />
                </div>
                <div>
                    <button className="form-button" type="submit" disabled={loading}>
                        {loading ? 'Enviando...' : 'Enviar'}
                    </button>
                </div>
                {error && <p style={{ color: 'green' }}>{error}</p>}
            </form>
        </div>
    );
};

const Infocuenta = ({ CuentaEncontrada }) => {
    const [edit, setEdit] = useState(false);
    const handleEditar = () => {
      setEdit(!edit);
    };
    return (
      <>
        {
          edit ? <Cuenta /> :
            <div className="info-cuenta-container">
              <h2 style={{ textAlign: 'center' }}>Información de la Cuenta guardada</h2>
              <div className="info-cuenta-content">
                <div className="info-cuenta-info">
                  <div>
                    <h3>Nombre:</h3>
                    <p>{CuentaEncontrada.name}</p>
                  </div>
                  <div>
                    <h3>Correo:</h3>
                    <p>{CuentaEncontrada.correo}</p>
                  </div>
                  <div>
                    <h3>Celular:</h3>
                    <p>{CuentaEncontrada.celular}</p>
                  </div>
                  <div>
                    <h3>Dirección:</h3>
                    <p>{ CuentaEncontrada.direccion}</p>
                  </div>
                  <div>
                    <h3>Ciudad:</h3>
                    <p>{CuentaEncontrada.ciudad}</p>
                  </div>
                  <div>
                    <h3>País:</h3>
                    <p>{CuentaEncontrada.pais}</p>
                  </div>
                </div>
                <button onClick={handleEditar}>Editar</button>
              </div>
            </div>
        }
      </>
    );
};

const Favoritos = () => {
    const { dataFavoritos } = useFilters();
    const { usuariodata, emailCurrent } = useUsuario();
    const favoritosEncontrados = dataFavoritos.filter((cuenta) => cuenta.correo === emailCurrent);
    console.log(favoritosEncontrados);
    
    const Delete = ({ id }) => {
        const [error, setError] = useState(null);
        const [loading, setLoading] = useState(false);
        const handleDelete = async () => {
            setLoading(true);
            try {
                const response = await fetch(`http://localhost:4000/api/dashboard/favoritos/delete/${id}`, {
                    method: 'DELETE',
                })
                const data = await response.json();
                if(data.status === "success" ){
                    window.location.reload();
                }
                setLoading(false);
            } catch (error) {
                setError(error.message);
                setLoading(false);
            }
        }
        return (
            <button onClick={handleDelete}>Eliminar</button>
        )
    }

    return (
        <div>
            <h1>Favoritos</h1>
            <div>
                {
                    favoritosEncontrados && favoritosEncontrados.length > 0 ? (
                        favoritosEncontrados.map((favorito) => (
                            <div key={favorito.id}>
                                <p>{favorito.correo}</p>
                                <div>
                                    <p>{favorito.inmueble.title}</p>
                                </div>
                                <Delete id={favorito.id} />
                            </div>
                        ))
                    ) : (
                        <p>No hay favoritos</p>
                    )
                }
            </div>
        </div>
    );
};


export default function DashboardAdmin() {
    const [innerText, setInnerText] = useState('');
    const { usuariodata, emailCurrent } = useUsuario();
    const { dataCuenta } = useFilters();
    const router = useRouter();
    const CuentaEncontrada = dataCuenta.find((cuenta) => cuenta.correo === emailCurrent);

    const cerrarSesion = async () => {
        await signOut(auth);
        router.push("/login");
    };

    const handleVolatilValue = (e) => {
        setInnerText(e.target.innerText);
    };

    const renderComponent = () => {
        switch (innerText) {
            case 'Cuenta':
                return CuentaEncontrada ? <Infocuenta CuentaEncontrada={CuentaEncontrada} /> : <Cuenta />;
            case 'favoritos':
                return <Favoritos />;
            default:
                return CuentaEncontrada ? <Infocuenta CuentaEncontrada={CuentaEncontrada} /> : <Cuenta />;
        }
    };

    return (
        emailCurrent ? (
            <div className="padre-dashboardadmin">
                <div className="menu-opciones">
                    <button onClick={handleVolatilValue}>Cuenta</button>
                    <button onClick={handleVolatilValue}>favoritos</button>
                    <button onClick={cerrarSesion}>Cerrar Sesion</button>
                </div>
                {renderComponent()}
            </div>
        ) : (
            <h1 style={{ textAlign: "center", marginTop: "30%", color: "white" }}>Usuario no autorizado</h1>
        )
    );
}
