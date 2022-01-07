import { Request, Response } from 'express';
import { CONFIG } from '../config/config';
import { cartModel } from '../models/cart';
import { orderModel } from '../models/order';
import { emailGmail } from '../services/email';

class OrderController {
	async getOrders(req: Request, res: Response) {
		const { orderId } = req.params;
		if (orderId) {
			const findById = await orderModel.get(req.user!._id, orderId);
			if (findById.length) {
				return res.json(...findById);
			}
		}
		const findAll = await orderModel.get(req.user!._id);
		if (findAll.length) {
			return res.json(findAll);
		}

		return res.status(404).json({ error: 'No orders for this user' });
	}

	async newOrder(req: Request, res: Response) {
		const [cart] = await cartModel.get(req.user!._id);

		let productTitles = '';
		cart.cartProducts!.map((cart) => (productTitles += `- ${cart.name}\n`));

		const purchase = await orderModel.newOrder(req.user!._id);

		await emailGmail.sendEmail(
			CONFIG.GMAIL_EMAIL,
			`New order notification | ${req.user!.name} | ${req.user!.email}`,
			productTitles
		);

		return res.json({ msg: purchase });
	}

	async complete(req: Request, res: Response) {
		const { orderId } = req.body;

		const findById = await orderModel.get(req.user!._id, orderId);
		if (findById.length) {
			const completeOrder = await orderModel.complete(
				req.user!._id,
				orderId
			);
			await emailGmail.sendEmail(
				CONFIG.GMAIL_EMAIL,
				`Order notification | ${req.user!.name} | ${req.user!.email}`,
				'The state of your order changed to completed'
			);
			return res.json({ msg: completeOrder });
		}
		return res.status(404).json({ error: 'Order does not exist' });
	}
}

export const orderController = new OrderController();
