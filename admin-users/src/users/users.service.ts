import { HttpException, Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { UsuarioDto } from './dto/usuario.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { QueryFailedError, Repository } from 'typeorm';
import { Usuarios } from './entities/user.entity';
import checkNulls from './checkNulls';

@Injectable()
export class UsersService {
  constructor(
    /** Injecta entidad Usuarios (referencia a la tabla en la base) */
    @InjectRepository(Usuarios) private readonly repo: Repository<UsuarioDto>
  ){}

  /** Carga el usuario recibido a la base de datos*/
  async register(user: UsuarioDto): Promise<UsuarioDto> {
    try {
      /** Llama a la función para revisar campos obligatorios */
      checkNulls(user);
      /** Encripta la contraseña  */
      /** Ejecuta función save para guardar los datos en la base */
      const result = await this.repo.save(user);
      /** Retorna la respuesta de la consulta */
      return result;
    } catch (error) {
      /** Si tuvo un error lo muestra por terminal y envia el mensaje en la respuesta */
      if (error instanceof QueryFailedError)
        throw new HttpException(`${error.name} ${error.driverError}`, 404);
      throw new HttpException(error.message, error.status);
    }
  }

  /** Obtiene todos los usuarios de la base */
  async findAll(): Promise<UsuarioDto[]> {
    try {
      /** Envia la consulta a la base con metodo find */
      const usuarios = await this.repo.find();
      /** Retorna los resultados */
      return usuarios;
    } catch (error) {
      /** Si tuvo un error lo muestra por terminal y envia el mensaje en la respuesta */
      if (error instanceof QueryFailedError)
        throw new HttpException(`${error.name} ${error.driverError}`, 404);
      throw new HttpException(error.message, error.status);
    }
  }

  /** Recibe nombre de usuario, si encuentra una coincidencia en la base, retorna true */
  async getPassword(nombre: string){
    try {
      const result = await this.repo.findOne({ where: {nombre}});
      if (result) {
        return result.password;
      } else {
        return null;
      }
    } catch (error) {
      /** Si tuvo un error lo muestra por terminal y envia el mensaje en la respuesta */
      if (error instanceof QueryFailedError)
        throw new HttpException(`${error.name} ${error.driverError}`, 404);
      throw new HttpException(error.message, error.status);
    }
  }

  /** Recibe un id y obtiene el usuario correspondiente */
  async findByID(id: number): Promise<UsuarioDto> {
    try {
      /** Realiza la busqueda por id */
      const usuario = await this.repo.findOne({ where: {id} });
      /** Retorna usuario encontrado */
      if(!usuario) throw new NotFoundException("No se encontró el usuario solicitado");
      return usuario;
    } catch (error) {
      /** Si tuvo un error lo muestra por terminal y envia el mensaje en la respuesta */
      if (error instanceof QueryFailedError)
        throw new HttpException(`${error.name} ${error.driverError}`, 404);
      throw new HttpException(error.message, error.status);
    }
  }

  /** Recibe un id y un objeto con datos de usuario y actualiza los datos de usuario correspondiente al id*/
  async update(id: number, usuario: UsuarioDto){
    try {
      /** Pasa el id del usuario y los datos nuevos al metodo id para actualizar los datos */
      const actualizacion = await this.repo.update(id, usuario);
      return actualizacion;
    } catch (error) {
      /** Si tuvo un error lo muestra por terminal y envia el mensaje en la respuesta */
      if (error instanceof QueryFailedError)
        throw new HttpException(`${error.name} ${error.driverError}`, 404);
      throw new HttpException(error.message, error.status);
    }
  }

  /** Recibe un id y borra el usuario correspondiente */
  async remove(id: number){
    try {
      const borrar = await this.repo.delete(id);
      return borrar;
    } catch (error) {
      if (error instanceof QueryFailedError)
        throw new HttpException(`${error.name} ${error.driverError}`, 404);
      throw new HttpException(error.message, error.status);
    }
  }
}
