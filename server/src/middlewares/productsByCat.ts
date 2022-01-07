import { Request, Response, NextFunction } from 'express';
import { productModel } from '../models/product';

export const productsByCat = async (
	req: Request,
	res: Response,
	next: NextFunction
) => {
	try {
		const { category } = req.params;

		if (category) {
			const findById = await productModel.getByCategory(category);
			if (findById.length !== 0) {
				return next();
			}
			return res
				.status(404)
				.json({ error: 'There are no products with this category' });
		} else {
			const findAll = await productModel.get();
			if (findAll.length !== 0) {
				return next();
			}
			return res.status(404).json({ error: 'There are no products in db' });
		}
	} catch (error) {
		if (error instanceof Error) {
			res.status(500).json({ error: error.message });
		}
	}
};
