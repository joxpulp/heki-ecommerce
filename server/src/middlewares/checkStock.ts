import { Request, Response, NextFunction } from 'express';
import { productModel } from '../models/product';

export const checkStock = async (
	req: Request,
	res: Response,
	next: NextFunction
) => {
	try {
		const { productId, quantity } = req.body;

		if (productId) {
			const [findById] = await productModel.get(productId);
			if (findById.stock! > 0 || findById.stock! > quantity) {
				return next();
			}
			return res.status(404).json({
				error:
					'The product is out of stock or you are trying to add more than we have in stock right now',
			});
		}
	} catch (error) {
		if (error instanceof Error) {
			res.status(500).json({ error: error.message });
		}
	}
};
