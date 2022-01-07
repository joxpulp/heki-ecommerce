import { cart } from './schemas/cartschema';
import { products } from './schemas/productschema';
import { order } from './schemas/orderschema';

class Bot {
	async getResponse(message: string, userId?: string) {
		switch (message.toLowerCase()) {
			case 'stock': {
				const productStock = await products.find({}, { name: 1, stock: 1 });
				let response = '';
				productStock.map((product) => {
					response += `- ${product.name}: ${product.stock} \n`;
				});
				return response;
			}
			case 'order': {
				const lastOrder = await order.findOne(
					{ userId },
					{},
					{ sort: { createdAt: -1 } }
				);

				let response = '';

				if (lastOrder === null) {
					response = 'No orders generated';
				} else {
					response = `Last order with id: ${lastOrder._id} \nCurrent state: ${lastOrder.state === 'generated'? lastOrder.state : lastOrder.state} and ${lastOrder.state === 'generated' ? 'will be delivered soon' : 'delivered'}\nWith this products: \n`;
					
					lastOrder.purchases!.map((product) => {
						response += `- ${product.name}, Price: ${product.price} USD, Qty: ${product.quantity}\n`;
					});
					response += `Total: ${lastOrder.total} USD`;
				}

				return response;
			}
			case 'cart': {
				const currentCart = await cart.findOne({ userId });
				let response = '';

				if (currentCart === null) {
					response = 'Your cart is empty';
				} else {
					response = 'Your cart has these products:\n';
					currentCart.cartProducts!.map((product) => {
						response += `- ${product.name}, Price: ${product.price}, Quantity: ${product.quantity}\n`;
					});
					response += `Total: ${currentCart.total} USD`;
				}
				return response;
			}

			default:
				return `Hi! I just couldn't understand your message.\nPlease type some of the following options:\n- Stock: To know our current stock.\n- Order: To get info of your last order.\n- Cart: To know info about your current cart.
                `;
		}
	}
}

export const botModel = new Bot();
