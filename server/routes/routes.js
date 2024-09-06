import { Router } from "express";
import { upload } from "../middlewares/multer.js";
import controllersRoutes from "../controllers/controllers.js";
const router = Router();

router.post("/api/productos", upload.array("images", 10), controllersRoutes.Productos); 
router.post("/api/dashboard/cuenta", controllersRoutes.PostInfoCuenta);
router.post("/api/dashboard/favoritos", controllersRoutes.PostFavoritos);
router.delete("/api/dashboard/favoritos/delete/:id", controllersRoutes.EliminarFavoritos);

export default router