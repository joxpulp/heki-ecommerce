import { products } from './schemas/productschema';
import { NewProductI, ProductI, ProductQuery } from './interfaces';
import { cart } from './schemas/cartschema';

class Product {
	async get(id?: string): Promise<ProductI[]> {
		let outputGet: ProductI[] = [];

		if (id) {
			const singleProduct = await products.findById(id);
			if (singleProduct) outputGet.push(singleProduct);
		} else {
			outputGet = await products.find();
		}
		return outputGet;
	}
	async getByCategory(category: string): Promise<ProductI[]> {
		let outputGet: ProductI[] = [];
		const catFormatter = category.charAt(0).toUpperCase() + category.slice(1).toLowerCase();

		const productsByCat = await products.find({ category: catFormatter });
		if (productsByCat) outputGet.push(...productsByCat);

		return outputGet;
	}

	async add(data: NewProductI): Promise<ProductI> {
		const newProduct = new products(data);
		await newProduct.save();
		return newProduct;
	}

	async update(id: string, data: NewProductI): Promise<ProductI[]> {
		const outputUpdate: ProductI[] = [];

		await products.findByIdAndUpdate(
			id,
			{ $set: data },
			{ runValidators: true }
		);

		const updatedProduct = await products.findById(id);
		if (updatedProduct) outputUpdate.push(updatedProduct);

		return outputUpdate;
	}

	async delete(id: string): Promise<ProductI[]> {
		const outputDelete: ProductI[] = [];

		const deletedProduct = await products.findByIdAndDelete(id);
		if (deletedProduct) outputDelete.push(deletedProduct);

		// * Deletes the product if is present on all user's cart
		await cart.updateMany(
			{},
			{
				$inc: { total: -deletedProduct!.price! },
				$pull: {
					cartProducts: { _id: id },
				},
			}
		);

		return outputDelete;
	}

	async query(options: ProductQuery): Promise<ProductI[]> {
		const query: any = {};
		if (options.title) query.title = options.title;

		if (options.priceMin && options.priceMax)
			query.price = { $gte: options.priceMin, $lte: options.priceMax };

		if (options.stockMin && options.stockMax)
			query.stock = { $gte: options.stockMin, $lte: options.stockMax };

		if (options.code) query.code = options.code;

		return await products.find(query);
	}
}

export const productModel = new Product();
