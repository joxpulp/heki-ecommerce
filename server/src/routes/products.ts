import { Router } from 'express';
import { isAuth } from '../middlewares/auth';
import { productExist } from '../middlewares/productExist';
import { productController } from '../controllers/products';
import { validate } from '../middlewares/validate';
import { addProduct, editProduct } from '../helpers/yup';
import { productsByCat } from '../middlewares/productsByCat';
import { validObjectId } from '../middlewares/validObjectId';

/**
 * @swagger
 * components:
 *   schemas:
 *     ProductsResponse:
 *       type: object
 *       properties:
 *         products:
 *           type: array
 *           items:
 *             type: object
 *             properties:
 *               _id:
 *                 type: String
 *                 description: ID del producto
 *               name:
 *                 type: String
 *                 description: Product's name
 *               description:
 *                 type: String
 *                 description: Product's description
 *               category:
 *                 type: String
 *                 description: Product's category
 *               thumbnail:
 *                 type: String
 *                 description: Product's thumbnail url
 *               thumbnail_id:
 *                 type: String
 *                 description: Product's thumbnail id as reference to the files db
 *               price:
 *                 type: number
 *                 description: Product's price (USD)
 *               stock:
 *                 type: number
 *                 description: Product's stock
 *           example:
 *             -  _id:  6174e458c79d9be056c0fa2s
 *                name: Nintendo Switch
 *                description:  This a nintendo switch
 *                category:  Gaming
 *                thumbnail:  https://res.cloudinary.com/fullstackedrans/image/upload/v1636063394/PRODUCTS/xsxpyswdpri9jwpxjonn.png
 *                thumbnail_id:  PRODUCTS/cyth979mt7m83r8rkis1
 *                price:  60
 *                stock:  560
 *             -  _id:  617fe479c79d9be003c0fa25
 *                name: Sony PlayStation 5
 *                description:  This a playstation
 *                category:  Gaming
 *                thumbnail:  https://res.cloudinary.com/fullstackedrans/image/upload/v1636063353/PRODUCTS/nemonb4mftxldidpc7op.png
 *                thumbnail_id:  PRODUCTS/axhw979mt7m83r8rkihx
 *                price:  10
 *                stock:  400
 *     ProductsResponseCat:
 *       type: object
 *       properties:
 *         products:
 *           type: array
 *           items:
 *             type: object
 *             properties:
 *               _id:
 *                 type: String
 *                 description: ID del producto
 *               name:
 *                 type: String
 *                 description: Product's name
 *               description:
 *                 type: String
 *                 description: Product's description
 *               category:
 *                 type: String
 *                 description: Product's category
 *               thumbnail:
 *                 type: String
 *                 description: Product's thumbnail url
 *               thumbnail_id:
 *                 type: String
 *                 description: Product's thumbnail id as reference to the files db
 *               price:
 *                 type: number
 *                 description: Product's price (USD)
 *               stock:
 *                 type: number
 *                 description: Product's stock
 *           example:
 *             -  _id:  6174e458c79d9be056c0fa2s
 *                name: Camiseta Boca Juniors 2021
 *                description:  La nueva camiseta de bokita para este 2021 es lo mas
 *                category:  Ropa deportiva
 *                thumbnail:  https://todosobrecamisetas.com/wp-content/uploads/tercera-camiseta-adidas-boca-juniors-2021-22-1.jpg
 *                thumbnail_id:  PRODUCTS/cyth979mt7m83r8rkis1
 *                price:  60
 *                stock:  1000
 *             -  _id:  617fe479c79d9be003c0fa25
 *                name: Piluso Boca Juniors
 *                description:  Para ir a la moda toca user este piluso
 *                category:  Ropa deportiva
 *                thumbnail:  https://http2.mlstatic.com/D_NQ_NP_958291-MLA40333873535_012020-O.jpg
 *                thumbnail_id:  PRODUCTS/axhw979mt7m83r8rkihx
 *                price:  10
 *                stock:  500
 *     ProductsError:
 *       type: object
 *       properties:
 *         error:
 *           type: String
 *           description: Error message
 *           example: There are no products in db
 *     ProductsErrorCat:
 *       type: object
 *       properties:
 *         error:
 *           type: string
 *           description: Error message
 *           example: There are no products with this category
 *     ProductError:
 *       type: object
 *       properties:
 *         error:
 *           type: string
 *           description: Error message
 *           example: This product does not exist in db or was deleted
 *     AddProductBody:
 *       type: object
 *       properties:
 *         thumbnail:
 *           type: file
 *           format: binary
 *           description: Product's thumbnail img (Only .png .jpeg .jpg)
 *         name:
 *           type: String
 *           description: Product's name
 *         description:
 *           type: String
 *           description: Product's description
 *         category:
 *           type: String
 *           description: Product's category
 *         price:
 *           type: number
 *           description: Product's price
 *         stock:
 *           type: number
 *           description: Product's stock
 *     AddProductResponse:
 *       type: object
 *       properties:
 *         addedProduct:
 *           type: object
 *           properties:
 *             name:
 *               type: String
 *               description: Product's name
 *               example: Balon Boca Juniors
 *             description:
 *               type: String
 *               description: Product's description
 *               example: Balon para complementar la camiseta y el sombrero de bokita
 *             category:
 *               type: String
 *               description: Product's category
 *               example: Balon de Futbol
 *             thumbnail:
 *               type: String
 *               description: Product's thumbnail url
 *               example: https://m.media-amazon.com/images/I/81b7GfAYf5L._AC_SY450_.jpg
 *             thumbnail_id:
 *               type: String
 *               description: Product's thumbnail id
 *               example: PRODUCTS/jkth979mt7m83r8rkboc
 *             price:
 *               type: Number
 *               description: Product's price (USD)
 *               example: 10
 *             stock:
 *               type: Number
 *               description: Product's stock
 *               example: 500
 *             _id:
 *               type: String
 *               description: Product's id
 *               example: 6174e458c79d9be056c0bo1x
 *         msg:
 *           type: String
 *           description: Sucess message
 *           example: Product Added
 *     UpdateProductResponse:
 *       type: object
 *       properties:
 *         updatedProduct:
 *           type: object
 *           properties:
 *             name:
 *               type: String
 *               description: Product's name
 *               example: Balon Boca Juniors
 *             description:
 *               type: String
 *               description: Product's description
 *               example: Balon para complementar la camiseta y el sombrero de bokita
 *             category:
 *               type: String
 *               description: Product's category
 *               example: Balon de Futbol
 *             thumbnail:
 *               type: String
 *               description: Product's thumbnail url
 *               example: https://m.media-amazon.com/images/I/81b7GfAYf5L._AC_SY450_.jpg
 *             thumbnail_id:
 *               type: String
 *               description: Product's thumbnail id
 *               example: PRODUCTS/jkth979mt7m83r8rkboc
 *             price:
 *               type: Number
 *               description: Product's price (USD)
 *               example: 10
 *             stock:
 *               type: Number
 *               description: Product's stock
 *               example: 600
 *             _id:
 *               type: String
 *               description: Product's id
 *               example: 6174e458c79d9be056c0bo1x
 *         msg:
 *           type: String
 *           description: Sucess message
 *           example: Product Updated
 *     ProductDeletedResponse:
 *       type: object
 *       properties:
 *         deletedProduct:
 *           type: array
 *           items:
 *             type: object
 *             description: Product details
 *             properties:
 *               _id:
 *                 type: String
 *                 description: Product's id
 *               name:
 *                 type: String
 *                 description: Product's name
 *               description:
 *                 type: String
 *                 description: Product's description
 *               category:
 *                 type: String
 *                 description: Product's category
 *               thumbnail:
 *                 type: String
 *                 description: Product's thumbnail url
 *               thumbnail_id:
 *                 type: String
 *                 description: Product's thumbnail id
 *               price:
 *                 type: number
 *                 description: Product's price
 *               stock:
 *                 type: number
 *                 description: Product's stock
 *           example:
 *             -  _id: 6174e458c79d9be056c0fa2s
 *                name: Camiseta Boca Juniors 2021
 *                description: La nueva camiseta de bokita para este 2021 es lo mas
 *                category: Camisetas de Equipos
 *                thumbnail: https://todosobrecamisetas.com/wp-content/uploads/tercera-camiseta-adidas-boca-juniors-2021-22-1.jpg
 *                thumbnail_id: PRODUCTS/cyth979mt7m83r8rkis1
 *                price: 120
 *                stock: 700
 *         msg:
 *           type: String
 *           description: Success message
 *           example: Product Deleted
 *
 */

const router = Router();

router.get(
	'/listbyid/:id',
	validObjectId,
	productExist,
	productController.getProduct
);

/**
 * @swagger
 * /products/list:
 *   get:
 *     summary: List all products in db
 *     tags:
 *     - Products
 *     responses:
 *       200:
 *         description: OK, Returns an array of objects with all the products
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ProductsResponse'
 *       404:
 *         description: Not Found, if there are no products in db
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ProductsError'
 *
 */

/**
 * @swagger
 * /products/list/{category}:
 *   get:
 *     summary: Get products by category
 *     parameters:
 *       - in: path
 *         name: category
 *         schema:
 *           type: string
 *         description: Product's category
 *     tags:
 *     - Products
 *     responses:
 *       200:
 *         description: OK, Returns products that matches the category
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ProductsResponseCat'
 *       404:
 *         description: Not Found, if there are no products that matches the category
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ProductsErrorCat'
 *
 */

router.get('/list/:category?', productsByCat, productController.getProductsCat);

/**
 * @swagger
 * /products/add:
 *   post:
 *     summary: Add a new product (user must be logged in and with ADMIN role to access this route)
 *     tags:
 *     - Products
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             $ref: '#/components/schemas/AddProductBody'
 *     responses:
 *       200:
 *         description: OK, Returns added product
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/AddProductResponse'
 *       400:
 *         description: Bad Request, if field validation fails
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ValidationErrors'
 *       401:
 *         description: Unauthorized, if user is not logged in with ADMIN role
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/AdminError'
 */

router.post('/add', isAuth, validate(addProduct), productController.addProduct);

/**
 * @swagger
 * /products/update/{id}:
 *   patch:
 *     summary: Update a product (user must be logged in and with ADMIN role to access this route)
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         description: Product's id
 *     tags:
 *     - Products
 *     requestBody:
 *       content:
 *         multipart/form-data:
 *           schema:
 *             $ref: '#/components/schemas/AddProductBody'
 *     responses:
 *       201:
 *         description: Created, Returns updated product and a message
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/UpdateProductResponse'
 *       400:
 *         description: Bad Request, if field validation fails
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ValidationErrors'
 *       401:
 *         description: Unauthorized, if user is not logged in with ADMIN role
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/AdminError'
 *       404:
 *         description: Not Found, if there is no product that matches the id
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ProductError'
 */

router.patch(
	'/update/:id',
	isAuth,
	productExist,
	validate(editProduct),
	productController.updateProduct
);

/**
 * @swagger
 *
 * /products/delete/{id}:
 *   delete:
 *     summary: Delete a product from db (user must be logged in and with ADMIN role to access this route)
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         description: Product's id
 *     tags:
 *     - Products
 *     responses:
 *       200:
 *         description: OK, Returns deleted product and a msg
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ProductDeletedResponse'
 *       401:
 *         description: Unauthorized, if user is not logged in
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/AdminError'
 *       404:
 *         description: Not Found, if there is no product that matches the id
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ProductError'
 *
 */

router.delete(
	'/delete/:id',
	isAuth,
	productExist,
	productController.deleteProduct
);

export default router;
