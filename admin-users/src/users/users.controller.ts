import { Controller, Get, Post, Body, Patch, Param, Delete, Res, HttpStatus } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsuarioDto } from './dto/usuario.dto';
import { response, Response } from 'express';
import { AuthService } from './auth/auth.service';

@Controller('users')
export class UsersController {
  constructor(
    private readonly usersService: UsersService, 
    private readonly authService: AuthService
  ) {}

  /** Recibe una petición Post y genera un nuevo usuario con los datos enviados en el Body */
  @Post('register')
  async create(@Body() usuario: UsuarioDto, @Res() response: Response) {
    /** Pasa los datos del body al servicio para realizar la consulta */
    const result = await this.usersService.register(usuario);
    response
      .status(HttpStatus.CREATED)
      .json({ok: true, result, message: "Usuario creado!"});
  }

  /** Recibe los datos del usuario y retorna un token si son correctos */
  @Post('login')
  async login(@Body() usuario: UsuarioDto, @Res() response: Response){
    const nombre = usuario.nombre;
    const password = usuario.password;
    /** Obtiene la clave del usuario ingresado */
    const claveRegistrada = await this.usersService.getPassword(nombre);
    /** Si obtuvo la contraseña de la base de datos, realiza el hash y compara las claves */
    if(claveRegistrada){
      /** Encripta la clave ingresada */
      const hashedPassword = await this.authService.hashPassword(password);
      /** Llama una función para comparar las contraseñas */
      const result = this.authService.comparePassword(hashedPassword, claveRegistrada);
      if(result){
        /** Si las claves coinciden, devuelve un token  */
        const token = this.authService.generateToken(usuario);
        response
        .status(HttpStatus.OK)
        .json({ ok: true, message: "Inicio de sesion exitoso!", token: token});
      } else {
        /** Si las contraseñas no coinciden devolverá un error */
        response
        .status(HttpStatus.UNAUTHORIZED)
        .json({ ok: false, message: "Error: Clave incorrecta!"});
      }
    } else {
      /** Si no obtuvo la clave, significa que el usuario no existe */
      response
      .status(HttpStatus.UNAUTHORIZED)
      .json({ ok: false, message: "Error: Usuario no encontrado" });
    }
  }

  /** Recibe una petición Get y obtiene todos los usuarios */
  @Get()
  async findAll() {
    const result = await this.usersService.findAll();
    response
      .status(HttpStatus.OK)
      .json({ok: true, result, message: "Lista de usuarios obtenida!"});
  }

  /** Recibe un Get y un id. Luego envia el usuario solicitado*/
  @Get(':id')
  async findOne(@Param('id') id: string) {
    const result = await this.usersService.findByID(+id);
    response
      .status(HttpStatus.OK)
      .json({ok: true, result, message: "Usuario obtenido!"});
  }

  /** Recibe una petición Patch y el id. Luego actualiza los datos 
   * del usuario con los que envióen el Body
   */
  @Patch(':id')
  async update(@Param('id') id: string, @Body() usuario: UsuarioDto) {
    const result = await this.usersService.update(+id, usuario);
    response
      .status(HttpStatus.OK)
      .json({ ok: true, result, message: "Usuario actualizado!"})
  }

  /** Recibe un Delete con el id y elimina el usuario indicado */
  @Delete(':id')
  async remove(@Param('id') id: string) {
    const result =  await this.usersService.remove(+id);
    response
      .status(HttpStatus.OK)
      .json({ ok: true, message: "Usuario eliminado!"})
  }
}
