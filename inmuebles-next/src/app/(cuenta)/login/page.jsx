"use client";
import { useState } from "react";
import { useRouter }  from "next/navigation";
import { appFirebease } from "@/services/firebase";
import { useUsuario } from "@/context/usuario";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import "./login.css";
const auth = getAuth(appFirebease);


const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error , setError] = useState("");

    const navigate = useRouter();

    const HandleLogin = async () => {
        try {

            const userCredential = await signInWithEmailAndPassword(auth, email, password);
            console.log(userCredential.user.email === "johanmonsalve125@gmail.com" ? true : false);
            if(userCredential.user.email === "johanmonsalve125@gmail.com"){
                navigate.push("/dashboardadmin")
                setError("Login iniciado con exito");
                setTimeout(() => {
                    setError("");
                }, 2000);
            }else{
                navigate.push("/dashboard");
                setError("Login iniciado con exito");
                setTimeout(() => {
                    setError("");
                }, 2000);
            }
           
        }catch (error){
            setError(error.message);
            setTimeout(() => {
                setError("");
            }, 3000);
        }
    }

    return (
        <div className="auth-container">
            <div className="auth-inputs">
                <input type="email" style={{color: "black"}} placeholder="ingresa tu email" onChange={(e) => setEmail(e.target.value) }  />
                <input type="password" style={{color: "black"}} placeholder="ingresa tu contraseña" onChange={(e) => setPassword(e.target.value)}/>
            </div>
                {error && <p className="auth-error">{error}</p>}
            <div>
                <button onClick={HandleLogin}>Iniciar Sesion</button>
            </div>
            <div className="auth-footer">
                <p>¿No tienes una cuenta?</p>
                <button onClick={() => navigate.push("/register")}>Registrarse</button>
            </div>

        </div>
    )
}


export default Login