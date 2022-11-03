import prismaClient from '../../prisma/index';
import { hash } from 'bcryptjs';

interface UserRequest {
  name: string
  email: string
  password: string
}

class CreateUserService {
  async execute({name, email, password}: UserRequest) {
    
    //verificar se ele enviou um email
    if(!email) {
      throw new Error("Email incorreto!");
    }
    
    //Verificar se esse email já está cadastrado
    const usuarioExiste = await prismaClient.user.findFirst({
      where: {
        email: email
      }
    })

    if(usuarioExiste) {
      throw new Error("Usuario já existe!")
    }

    const passwordHash = await hash(password, 8);

    const user = await prismaClient.user.create({
      data:{
        name:name,
        email: email,
        password: passwordHash
      },
      select:{
        id: true,
        name:true,
        email:true,
      }
    })

    return user;
  }
}
export { CreateUserService };