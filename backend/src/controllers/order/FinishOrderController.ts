import { Request, Response } from 'express';
import { FinishOrderService } from '../../services/order/FinishOrderService';

class FinishOrderControler{
  async handle( req: Request, res: Response ) {
    const { order_id }  = req.body;

    const fishOrderService = new FinishOrderService();

    const order = await fishOrderService.execute({
      order_id
    });

    return res.json(order);
  }
}

export { FinishOrderControler }