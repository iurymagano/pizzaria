import prismaClient from "../../prisma";

interface CategoryIdRequest{
  category_id: string
}

class ListByCategoryService {
  async execute({ category_id }: CategoryIdRequest) {

    const product = await prismaClient.product.findMany({
      where:{
        category_id: category_id
      }
    })

    return product;
  }
}

export { ListByCategoryService }