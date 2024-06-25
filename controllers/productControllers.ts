import { Request, Response, NextFunction } from 'express'

async function products_get(req: Request, res: Response) {
  return res.status(200).json([{ product_name: 'Laptop' }])
}

export default { products_get }
