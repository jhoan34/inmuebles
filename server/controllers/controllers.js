import { validaciones } from "../helpers/validaciones.js";
import { bucket, db } from "../database/firebase.js";
import fs from "fs";
import path from "path";

const __dirname = path.resolve();
const Productos = async (req, res) => {
    try {
        console.log(req.body);
        if (!req.body || req.files.length === 0) {
            return res.json({ status: "error", message: "No se pudo agregar el inmueble" });
        }

        // Convertir los atributos a sus respectivos tipos de datos
        const {
            id,
            title,
            price,
            description,
            category,
            ubicacion,
            infocontacto,
            estrato,
            area,
            habitaciones,
            banos,
            status
        } = req.body;

        // Convertir id, price, estrato, area, habitaciones, y banos a números
        const parsedData = {
            id: Number(id),
            title: String(title),
            price: Number(price),
            description: String(description),
            category: String(category),
            ubicacion: String(ubicacion),
            infocontacto: String(infocontacto),
            estrato: Number(estrato),
            area: Number(area),
            habitaciones: Number(habitaciones),
            banos: Number(banos),
            status: String(status)
        };

        const validacion = validaciones(parsedData);

        if (validacion.valid === false) {
            return res.json({ status: "error", message: validacion.message });
        }

        const images = req.files;
        const imagesUrls = await Promise.all(images.map(async (image) => {
            try {
                const localFilepath = path.join(__dirname, `public/uploads/${image.originalname}`);
                const remoteFilepath = `productos/${image.originalname}`;
                const file = bucket.file(remoteFilepath);

                await file.save(fs.readFileSync(localFilepath), {
                    metadata: {
                        contentType: image.mimetype
                    }
                });

                fs.unlinkSync(localFilepath);


                const imageUrl = `https://firebasestorage.googleapis.com/v0/b/pagina-de-inmuebles.appspot.com/o/productos%2F${image.originalname}?alt=media&token=cca3f78f-36fe-4234-8318-1fd82da64ee4;`;

                return imageUrl;
            } catch (error) {
                console.error(`Error al subir la imagen ${image.originalname}:`, error);
                throw new Error("No se pudo subir correctamente las imágenes");
            }
        }));

        const date = new Date().getDate();
        const ProductoBasededatos = {
            ...parsedData,
            images: imagesUrls,
            date: date
        };

        await db.collection("inmuebles").add(ProductoBasededatos);
        console.log("Se agregó el inmueble");
        res.status(200).json({ status: "success", message: "Inmueble agregado correctamente" });

    } catch (error) {
        console.error("Error al agregar el inmueble:", error);
        res.status(500).json({ status: "error", message: error.message });
    }
};

const PostInfoCuenta = async (req, res) => {
    try {
      const { name, correo, celular, direccion, ciudad, pais } = req.body;
  
      if (!name || !correo || !celular || !direccion || !ciudad || !pais) {
        return res.status(400).json({ status: "error", message: "Todos los campos son obligatorios" });
      }
  
      const cuenta = {
        name: String(name),
        correo: String(correo),
        celular: Number(celular),
        direccion: String(direccion),
        ciudad: String(ciudad),
        pais: String(pais)
      };
  
      await db.collection("infocuenta").doc(correo).set(cuenta);
      console.log("Se agregó la cuenta");
      res.status(200).json({ status: "success", message: "Cuenta creada exitosamente" });
  
    } catch (error) {
      console.log(error.message);
      res.status(500).json({ status: "error", message: "No se pudo crear los datos de la cuenta" });
    }
};


const PostFavoritos = async (req, res) => {
    try {
        console.log(req.body);
        const { correo, inmueble } = req.body;
        const uid = Date.now().toString(20);
        console.log(uid);
        const favoritos = {
            id: String(uid),
            correo: String(correo),
            inmueble
        };

        await db.collection("favoritos").doc(uid).set(favoritos);

        res.status(200).json({ status: "success", message: "Inmueble agregado a favoritos" });
    } catch (error) {           
        res.status(500).json({ status: "error", message: error.message });
    }
};

const EliminarFavoritos = async (req, res) => {
    try {
        console.log(req.body);
        const userid = req.params.id;
        console.log(userid);
        await db.collection("favoritos").doc(userid).delete();
        res.status(200).json({ status: "success", message: "Inmueble eliminado de favoritos" });
    } catch (error) {
        res.status(500).json({ status: "error", message: error.message });
    }

};

export default {
    PostFavoritos,
    EliminarFavoritos,
    PostInfoCuenta,
    Productos
};
