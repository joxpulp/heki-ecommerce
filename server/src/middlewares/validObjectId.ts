import { NextFunction, Request, Response } from 'express';

export const validObjectId = (
	req: Request,
	res: Response,
	next: NextFunction
) => {
	const { id, orderId } = req.params;
	const { productId, orderId: orderIdBody } = req.body;

	const idValidation = id || orderId || productId || orderIdBody;

	if (idValidation) {
		if (/^[0-9a-fA-F]{24}$/.test(idValidation)) {
			return next();
		}
		return res.status(404).json({ error: 'Invalid id try with other option' });
	}
	return next();
};
