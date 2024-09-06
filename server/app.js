import express from "express";
import cors from "cors";
import morgan from "morgan";
import Routes from "./routes/routes.js";
import { PORT } from "./PORT.js";

const app = express();

app.use(cors());
app.use(morgan("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(Routes);


app.listen(PORT, () => {
    console.log(`Servidor corriendo en el puerto ${PORT} URL: http://localhost:${PORT}` );
})