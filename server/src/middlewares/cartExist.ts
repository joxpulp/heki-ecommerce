import { Request, Response, NextFunction } from 'express';
import { cartModel } from '../models/cart';

export const cartExist = async (
	req: Request,
	res: Response,
	next: NextFunction
) => {
	try {
		const { id } = req.params;

		if (id) {
			const findById = await cartModel.get(req.user!._id, id);

			if (findById.length !== 0) {
				return next();
			}
			return res.status(404).json({
				error: 'This product does not exist in the cart or was deleted',
			});
		} else {
			const findAll = await cartModel.get(req.user!._id);

			if (findAll.length !== 0) {
				return next();
			}
			return res.status(404).json({
				error: 'No cart created for this user, try to add some products',
			});
		}
	} catch (error) {
		if (error instanceof Error) {
			res.status(500).json({ error: error.message });
		}
	}
};
