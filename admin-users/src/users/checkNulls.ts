import { UnauthorizedException } from "@nestjs/common";

/** Array de campos requeridos */
const requeridos=["nombre", "password"];

/** Recibe el objeto y comprueba si tiene los campos obligatorios */
export default function checkNulls(usuario){
    requeridos.forEach(item => {
        if(!usuario.item) throw new UnauthorizedException(`Error: campo obligatorio no completado (${item})`)
    });
}