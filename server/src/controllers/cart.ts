import { Request, Response } from 'express';
import { cartModel } from '../models/cart';

class CartController {
	async getProducts(req: Request, res: Response) {
		try {
			const { id } = req.params;

			if (id) {
				const findById = await cartModel.get(req.user!._id, id);
				return res.json({ product: findById });
			} else {
				const findAll = await cartModel.get(req.user!._id);
				return res.json(findAll);
			}
		} catch (error) {
			if (error instanceof Error) { 
				res.status(500).json({ error: error.message }); 
			}
		}
	}

	async addProducts(req: Request, res: Response) {
		try {
			const { productId, quantity } = req.body; 

			const productAdded = await cartModel.add(
				req.user!._id,
				req.user!.deliveryAddress!,
				productId,
				quantity
			);
			return res.json({ productAdded, msg: 'Product added to the cart' });
		} catch (error) {
			if (error instanceof Error) {
				res.status(500).json({ error: error.message });
			}
		}
	}

	async deleteProducts(req: Request, res: Response) {
		try {
			const { id } = req.params;

			const deletedProduct = await cartModel.delete(req.user!._id, id);
			return res.json({ deletedProduct, msg: 'Product deleted from cart' });
		} catch (error) {
			if (error instanceof Error) {
				res.status(500).json({ error: error.message });
			}
		}
	}
}

export const cartController = new CartController();
