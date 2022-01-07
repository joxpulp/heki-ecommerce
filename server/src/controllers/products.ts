import { Request, Response } from 'express';
import cloudinary from '../services/cloudinary';
import { productModel } from '../models/product';
import { UploadedFile } from 'express-fileupload';

class ProductController {
	async getProduct(req: Request, res: Response) {
		try {
			const { id } = req.params;

			if (id) {
				const findById = await productModel.get(id);
				return res.json({ product: findById });
			} else {
				const findAll = await productModel.get();
				return res.json({ products: findAll });
			}
		} catch (error) {
			if (error instanceof Error) {
				res.status(500).json({ error: error.message });
			}
		}
	}
	async getProductsCat(req: Request, res: Response) {
		try {
			const { category } = req.params;

			if (category) {
				const findById = await productModel.getByCategory(category);
				return res.json({ product: findById });
			} else {
				const findAll = await productModel.get();
				return res.json({ products: findAll });
			}
		} catch (error) {
			if (error instanceof Error) {
				res.status(500).json({ error: error.message });
			}
		}
	}

	async addProduct(req: Request, res: Response) {
		try {
			const data = {
				...req.body,
			};

			if (req.files) {
				const { tempFilePath } = req.files.thumbnail as UploadedFile;
				const { secure_url, public_id } = await cloudinary.uploader.upload(
					tempFilePath,
					{ folder: 'PRODUCTS' }
				);

				data.thumbnail = secure_url;
				data.thumbnail_id = public_id;
			}

			const addedProduct = await productModel.add(data);
			return res.json({ addedProduct, msg: 'Product Added' });
		} catch (error) {
			if (error instanceof Error) {
				res.status(500).json({ error: error.message });
			}
		}
	}

	async updateProduct(req: Request, res: Response) {
		try {
			const { id } = req.params;
			//* Find product by id to get product fields
			const [product] = await productModel.get(id);

			const data = {
				...req.body,
			};

			//* If user upload a new image, previous image is destroyed by passing the thumbnail_id,
			//* Variables thumbnail and thumbnail_id are overwritten by the new image
			if (req.files) {
				await cloudinary.uploader.destroy(product.thumbnail_id!);
				const { tempFilePath } = req.files.thumbnail as UploadedFile;
				const { secure_url, public_id } = await cloudinary.uploader.upload(
					tempFilePath,
					{ folder: 'PRODUCTS' }
				);
				data.thumbnail = secure_url;
				data.thumbnail_id = public_id;
			}

			const updatedProduct = await productModel.update(id, data);
			return res.status(201).json({ updatedProduct, msg: 'Product Updated' });
		} catch (error) {
			if (error instanceof Error) {
				res.status(500).json({ error: error.message });
			}
		}
	}

	async deleteProduct(req: Request, res: Response) {
		try {
			const { id } = req.params;

			const [product] = await productModel.get(id);

			await cloudinary.uploader.destroy(product.thumbnail_id!);

			const deletedProduct = await productModel.delete(id);
			return res.json({ deletedProduct, msg: 'Product Deleted' });
		} catch (error) {
			if (error instanceof Error) {
				res.status(500).json({ error: error.message });
			}
		}
	}
}

export const productController = new ProductController();
