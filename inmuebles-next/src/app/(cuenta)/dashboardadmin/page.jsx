"use client"

import { useEffect, useState } from "react";
import { useFilters } from "@/context/productosfetch";
import { useUsuario } from "@/context/usuario";
import { getAuth, signOut } from "firebase/auth";
import { appFirebease } from "@/services/firebase";
import { useRouter } from "next/navigation";
import "./admin.css"

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

function RenderPostProducts() {
    const [error, setError] = useState(null);
    const [product, setProduct] = useState({
        id: 1,
        title: "",
        price: 0,
        description: "",
        category: "",
        images: [],
        ubicacion: "",
        infoContacto: "",
        estrato: 0,
        area: 0,
        habitaciones: 0,
        banos: 0,
        status: "" // Nuevo campo para el estado del producto
    });

    const handleChange = (e) => {
        const { name, value, files, type } = e.target;
        if (name === 'images') {
            setProduct({
                ...product,
                [name]: [...files]
            });
        } else {
            setProduct({
                ...product,
                [name]: type === 'number' ? parseInt(value) || '' : value
            });
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const { id, title, price, description, category, images, ubicacion, infoContacto, estrato, area, habitaciones, banos, status } = product;

        if (category.toLowerCase() === "lotes") {
            if (!id || !title || !price || !description || !category || !images || !ubicacion || !infoContacto || !estrato || !area) {
                setError('Todos los campos son obligatorios');
                setTimeout(() => {
                    setError(null);
                }, 2000);
                return;
            }
        }

        if (category.toLowerCase() === "oficinas") {
            if (!id || !title || !price || !description || !category || !images || !ubicacion || !infoContacto || !estrato || !area || !banos) {
                setError('Todos los campos son obligatorios');
                setTimeout(() => {
                    setError(null);
                }, 2000);
                return;
            }
        }

        if (!id || !title || !price || !description || !category || !images || !ubicacion || !infoContacto || !estrato || !area) {
            setError('Todos los campos son obligatorios');
            setTimeout(() => {
                setError(null);
            }, 2000);
            return;
        }

        const formData = new FormData();
        formData.append('id', parseInt(id));
        formData.append('title', title);
        formData.append('price', parseInt(price));
        formData.append('description', description);
        formData.append('category', category.toLowerCase());
        images.forEach(image => {
            formData.append('images', image);
        });
        formData.append('ubicacion', ubicacion);
        formData.append('infocontacto', infoContacto);
        formData.append('estrato', estrato);
        formData.append('area', parseInt(area));
        formData.append('habitaciones', parseInt(habitaciones));
        formData.append('banos', parseInt(banos));
        formData.append('status', status); // Añadir estado al FormData

        try {
            const response = await fetch('http://localhost:4000/api/productos', {
                method: 'POST',
                body: formData
            });
            const data = await response.json();
            if (response.ok) {
                setError("Producto creado exitosamente");
            }
            setTimeout(() => {
                setError(null);
            }, 2000);
        } catch (error) {
            setError(error.message);
            setTimeout(() => {
                setError(null);
            }, 2000);
        }
    };

    return (
        <div className="render-product">
            <form onSubmit={handleSubmit} className="form-dashboardadmin">
                <div>
                    <label htmlFor="id">ID:</label>
                    <input type="number" id="id" name="id" value={product.id} onChange={handleChange} />
                </div>
                <div>
                    <label htmlFor="title">Title:</label>
                    <input type="text" id="title" name="title" value={product.title} onChange={handleChange} />
                </div>
                <div>
                    <label htmlFor="price">Price:</label>
                    <input type="number" id="price" name="price" value={product.price} step="0.01" onChange={handleChange} />
                </div>
                <div>
                    <label htmlFor="description">Description:</label>
                    <textarea id="description" name="description" value={product.description} onChange={handleChange}></textarea>
                </div>
                <div>
                    <label htmlFor="category">Category:</label>
                    <input type="text" id="category" name="category" value={product.category} onChange={handleChange} />
                </div>
                <div>
                    <label htmlFor="images">Image URL:</label>
                    <input type="file" id="images" name="images" multiple onChange={handleChange} />
                </div>
                <div>
                    <label htmlFor="ubicacion">Ubicación:</label>
                    <input type="text" id="ubicacion" name="ubicacion" value={product.ubicacion} onChange={handleChange} />
                </div>
                <div>
                    <label htmlFor="infoContacto">Info de Contacto:</label>
                    <input type="email" id="infoContacto" name="infoContacto" value={product.infoContacto} onChange={handleChange} />
                </div>
                <div>
                    <label htmlFor="estrato">Estrato:</label>
                    <input type="number" id="estrato" name="estrato" value={product.estrato} onChange={handleChange} />
                </div>
                <div>
                    <label htmlFor="area">Área:</label>
                    <input type="number" id="area" name="area" value={product.area} onChange={handleChange} />
                </div>
                <div>
                    <label htmlFor="habitaciones">Habitaciones:</label>
                    <input type="number" id="habitaciones" name="habitaciones" value={product.habitaciones} onChange={handleChange} />
                </div>
                <div>
                    <label htmlFor="banos">Baños:</label>
                    <input type="number" id="banos" name="banos" value={product.banos} onChange={handleChange} />
                </div>
                <div>
                    <label htmlFor="status">Estado:</label>
                    <select id="status" name="status" value={product.status} onChange={handleChange}>
                        <option value="">Seleccione</option>
                        <option value="venta">Venta</option>
                        <option value="alquiler">Alquiler</option>
                    </select>
                </div>
                <button className="btn-submit" type="submit">Enviar</button>
            </form>
            {error && <p>{error}</p>}
        </div>
    );
}
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
            case 'renderProducts':
                return <RenderPostProducts />;
            default:
                return CuentaEncontrada ? <Infocuenta CuentaEncontrada={CuentaEncontrada} /> : <Cuenta />;
        }
    };

    return (
        emailCurrent === "johanmonsalve125@gmail.com" ? (
            <div className="padre-dashboardadmin">
                <div className="menu-opciones">
                    <button onClick={handleVolatilValue}>Cuenta</button>
                    <button onClick={handleVolatilValue}>renderProducts</button>
                    <button onClick={cerrarSesion}>Cerrar Sesion</button>
                </div>
                {renderComponent()}
            </div>
        ) : (
            <h1 style={{ textAlign: "center", marginTop: "30%", color: "white" }}>Usuario no autorizado</h1>
        )
    );
}
