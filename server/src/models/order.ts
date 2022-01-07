import { OrderI } from './interfaces';
import { cart } from './schemas/cartschema';
import { order } from './schemas/orderschema';
class Order {
	async get(userId: string, orderId?: string): Promise<OrderI[]> {
		const outputGet: OrderI[] = [];

		if (orderId) {
			const getOrderById = await order.findOne({ _id: orderId, userId });
			if (getOrderById) {
				outputGet.push(getOrderById!);
			}
			return outputGet;
		}

		const getPurchases = await order.find({ userId });
		if (getPurchases) {
			outputGet.push(...getPurchases!);
		}
		return outputGet;
	}

	async newOrder(userId: string): Promise<string> {
		const findCart = await cart.findOne({ userId });

		const newOrder = new order({ userId });
		await newOrder.save();

		await order.updateOne(
			{ _id: newOrder._id },
			{
				$set: { total: findCart!.total },
				$push: {
					purchases: findCart!.cartProducts,
				},
			}
		);

		await cart.findOneAndDelete({ userId });
		return 'Order generated';
	}

	async complete(userId: string, orderId: string): Promise<string> {
		await order.updateOne(
			{ userId, orderId },
			{
				$set: { state: 'completed' },
			}
		);

		return 'Order state changed to completed';
	}
}

export const orderModel = new Order();
