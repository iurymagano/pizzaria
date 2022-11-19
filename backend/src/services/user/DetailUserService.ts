import prismaClient from "../../prisma";

class DetailUserService{
  async execute(user_id: string) {
    
    //recebendo o id pela req, após vai conferir com o id que tenha o mesmo no banco
    const user = prismaClient.user.findFirst({
      where: {
        id: user_id
      },
      select:{
        id: true,
        name: true,
        email: true,
      }
    })
    return user;
  }
}

export { DetailUserService }