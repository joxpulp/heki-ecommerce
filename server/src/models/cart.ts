import { productModel } from './product';
import { cart } from './schemas/cartschema';
import { CartI, ProductI, AddressI } from './interfaces';
import { products } from './schemas/productschema';

class Cart {
	async get(userId: string, productId?: string): Promise<ProductI[] & CartI[]> {
		let outputGet: ProductI[] & CartI[] = [];

		if (productId) {
			const findById = await cart.findOne(
				{ userId },
				{ cartProducts: { $elemMatch: { _id: productId } } }
			);
			if (findById) outputGet.push(...findById.cartProducts!);
			return outputGet;
		} else {
			const findAll = await cart.findOne({ userId });
			if (findAll) outputGet.push(findAll);
		}

		return outputGet;
	}

	async add(
		userId: string,
		address: AddressI,
		productId: string,
		quantity: number
	): Promise<ProductI> {
		const [findProduct] = await productModel.get(productId);
		const findProductPlain = findProduct.toObject(); // In order to add new properties to ouputNew object, findProduct needs to be converted to plain object.
		const findProductCart = await this.get(userId, productId);

		const ouputNew: ProductI = findProductPlain;
		ouputNew.quantity = quantity;
		ouputNew.price = findProduct.price! * quantity;

		if (findProductCart.length === 0) {
			await cart.updateOne(
				{ userId },
				{
					$inc: {
						totalItems: quantity,
						total: ouputNew.price,
					},
					$set: { deliveryAddress: address },
					$addToSet: {
						cartProducts: ouputNew,
					},
				},
				{ upsert: true }
			);
		} else {
			await cart.updateOne(
				{ userId, 'cartProducts._id': findProduct._id },
				{
					$inc: {
						totalItems: quantity,
						total: ouputNew.price,
						'cartProducts.$.quantity': quantity,
						'cartProducts.$.price': ouputNew.price,
					},
				}
			);
		}

		//* Updates the stock to added product in cart
		await products.updateOne(
			{ _id: productId },
			{
				$inc: { stock: -quantity },
			}
		);

		return ouputNew;
	}

	async delete(userId: string, productId: string): Promise<ProductI[]> {
		const [findProduct] = await productModel.get(productId);

		const [findProductCart] = await this.get(userId, productId);
		const outputDelete: ProductI[] = [];

		await cart.updateMany(
			{ userId },
			{
				$inc: {
					total: -findProductCart.price!,
					totalItems: -findProductCart.quantity!,
				},
				$pull: {
					cartProducts: { _id: productId },
				},
			}
		);

		//* If there is no product in cart, the entire cart is deleted
		const findById = await cart.findOne({ userId }, 'cartProducts');
		if (findById!.cartProducts!.length === 0)
			await cart.findOneAndDelete({ userId });

		outputDelete.push(findProductCart);

		//* Updates the stock to deleted product in cart
		await productModel.update(productId, {
			stock: findProduct.stock! + findProductCart.quantity!,
		});

		return outputDelete;
	}
}

export const cartModel = new Cart();
