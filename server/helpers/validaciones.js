export function validaciones({ id, title, price, description, category, ubicacion, infocontacto, estrato, area, habitaciones, banos }) {
    if (!id || !title || !price || !description || !category || !ubicacion || !infocontacto || !estrato || !area ) {
        return { valid: false, message: "Se requiere todos los datos" };
    }

    if (typeof id !== "number" || id < 0) {
        return { valid: false, message: "ID invalido" };
    }

    if (typeof title !== "string") {
        return { valid: false, message: "Title invalido" };
    }

    if (typeof price !== "number" || price < 0) {
        return { valid: false, message: "Price invalido" };
    }

    if (typeof description !== "string") {
        return { valid: false, message: "Description invalido" };
    }

    if (typeof category !== "string") {
        return { valid: false, message: "Category invalido" };
    }

    if (typeof ubicacion !== "string") {
        return { valid: false, message: "Ubicacion invalido" };
    }

    if (typeof infocontacto !== "string") {
        return { valid: false, message: "Infocontacto invalido" };
    }

    if (typeof estrato !== "number" || estrato < 0) {
        return { valid: false, message: "Estrato invalido" };
    }

    if (typeof area !== "number" || area < 0) {
        return { valid: false, message: "Area invalido" };
    }

    if (typeof habitaciones !== "number" || habitaciones < 0) {
        return { valid: false, message: "Habitaciones invalido" };
    }

    if (typeof banos !== "number" || banos < 0) {
        return { valid: false, message: "Banos invalido" };
    }

    return { valid: true };
}
