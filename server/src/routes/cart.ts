import { Router } from 'express';
import { cartController } from '../controllers/cart';
import { addProductCart } from '../helpers/yup';
import { isAuth } from '../middlewares/auth';
import { cartExist } from '../middlewares/cartExist';
import { checkStock } from '../middlewares/checkStock';
import { productExist } from '../middlewares/productExist';
import { validate } from '../middlewares/validate';
import { validObjectId } from '../middlewares/validObjectId';

/**
 * @swagger
 * components:
 *   schemas:
 *     CartResponse:
 *       type: object
 *       properties:
 *         _id:
 *           type: String
 *           description: Cart Id
 *           example: 6174e458c79d95e020c0h6h2
 *         userId:
 *           type: String
 *           description: User's Id
 *           example: 6182191a7d9034b287c54c12
 *         cartProducts:
 *           type: array
 *           items:
 *             type: object
 *             description: Products in cart
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
 *                 description: Product's price (USD)
 *               quantity:
 *                 type: String
 *                 description: Product's quantity
 *           example:
 *             -  _id: 6174e458c79d9be056c0fa2s
 *                name: Camiseta Boca Juniors 2021
 *                description: La nueva camiseta de bokita para este 2021 es lo mas
 *                category: Camisetas de Equipos
 *                thumbnail: https://todosobrecamisetas.com/wp-content/uploads/tercera-camiseta-adidas-boca-juniors-2021-22-1.jpg
 *                thumbnail_id: PRODUCTS/cyth979mt7m83r8rkis1
 *                price: 120
 *                quantity: 2
 *             -  _id: 617fe479c79d9be003c0fa25
 *                name: Piluso Boca Juniors
 *                description: Para ir a la moda toca user este piluso
 *                category: Sombreros
 *                thumbnail: https://http2.mlstatic.com/D_NQ_NP_958291-MLA40333873535_012020-O.jpg
 *                thumbnail_id: PRODUCTS/axhw979mt7m83r8rkihx
 *                price: 10
 *                quantity: 1
 *         createdAt:
 *           type: String
 *           description: Timestamp (when the cart was created)
 *           example: 2021-11-12T13:32:57.758Z
 *         total:
 *           type: Number
 *           description: User's total to be paid (USD)
 *           example: 130
 *         totalItems:
 *           type: Number
 *           description: User's total items in cart (same product with more than one quantity incl.)
 *           example: 3
 *         updatedAt:
 *           type: String
 *           description: Timestamp (last update to the cart)
 *           example: 2021-11-12T13:32:57.758Z
 *         deliveryAddress:
 *           type: array
 *           items:
 *             type: object
 *             description: Delivery address
 *             properties:
 *               _id:
 *                 type: String
 *                 description: Product's id
 *                 example: 6174e458c79d9be056c0fa2a
 *               streetName:
 *                 type: String
 *                 description: Street name
 *                 example: Av. Rivadavia
 *               streetNumber:
 *                 type: Number
 *                 description: Street number
 *                 example: 3814
 *               postalCode:
 *                 type: String
 *                 description: Postal code
 *                 example: C1425
 *               floor:
 *                 type: Number
 *                 description: Building floor
 *                 example: 22
 *               apt:
 *                 type: String
 *                 description: Building Apartment
 *                 example: D
 *     CartError:
 *       type: object
 *       properties:
 *         error:
 *           type: String
 *           description: Error message
 *           example: No cart created for this user, try to add some products
 *     ProductInCartResponse:
 *       type: object
 *       properties:
 *         product:
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
 *               quantity:
 *                 type: String
 *                 description: Product's quantity
 *           example:
 *             -  _id: 6174e458c79d9be056c0fa2s
 *                name: Camiseta Boca Juniors 2021
 *                description: La nueva camiseta de bokita para este 2021 es lo mas
 *                category: Camisetas de Equipos
 *                thumbnail: https://todosobrecamisetas.com/wp-content/uploads/tercera-camiseta-adidas-boca-juniors-2021-22-1.jpg
 *                thumbnail_id: PRODUCTS/cyth979mt7m83r8rkis1
 *                price: 120
 *                quantity: 2
 *     ProductInCartError:
 *       type: object
 *       properties:
 *         error:
 *           type: string
 *           description: Error message
 *           example: This product does not exist in the cart or was deleted
 *     ProductInCartStockError:
 *       type: object
 *       properties:
 *         error:
 *           type: string
 *           description: Error message
 *           example: The product is out of stock or you are trying to add more than we have in stock right now
 *     AddProductToCartBody:
 *       type: object
 *       properties:
 *         productId:
 *           type: string
 *           description: Product's id
 *           example: 6174e458c79d9be056c0fa2s
 *         quantity:
 *           type: number
 *           description: Product's quantity to be added
 *           example: 2
 *     AddProductToCartResponse:
 *       type: object
 *       properties:
 *         productAdded:
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
 *               quantity:
 *                 type: number
 *                 description: Product's quantity
 *           example:
 *             -  _id: 6174e458c79d9be056c0fa2s
 *                name: Camiseta Boca Juniors 2021
 *                description: La nueva camiseta de bokita para este 2021 es lo mas
 *                category: Camisetas de Equipos
 *                thumbnail: https://todosobrecamisetas.com/wp-content/uploads/tercera-camiseta-adidas-boca-juniors-2021-22-1.jpg
 *                thumbnail_id: PRODUCTS/cyth979mt7m83r8rkis1
 *                price: 120
 *                quantity: 2
 *         msg:
 *           type: String
 *           description: Success message
 *           example: Product added to the cart
 *     DeleteProductFromCartResponse:
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
 *               quantity:
 *                 type: number
 *                 description: Product's quantity
 *           example:
 *             -  _id: 6174e458c79d9be056c0fa2s
 *                name: Camiseta Boca Juniors 2021
 *                description: La nueva camiseta de bokita para este 2021 es lo mas
 *                category: Camisetas de Equipos
 *                thumbnail: https://todosobrecamisetas.com/wp-content/uploads/tercera-camiseta-adidas-boca-juniors-2021-22-1.jpg
 *                thumbnail_id: PRODUCTS/cyth979mt7m83r8rkis1
 *                price: 120
 *                quantity: 2
 *         msg:
 *           type: String
 *           description: Success message
 *           example: Product deleted from cart
 */

const router = Router();

/**
 * @swagger
 * /cart/list:
 *   get:
 *     summary: User's current cart
 *     tags:
 *     - Cart (Protected routes, user must be logged in)
 *     responses:
 *       200:
 *         description: OK, Returns the cart of the currently logged in user
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/CartResponse'
 *       401:
 *         description: Unauthorized, if user is not logged in
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/AuthError'
 *       404:
 *         description: Not Found, if there is no cart for the user
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/CartError'
 *
 */

/**
 * @swagger
 * /cart/list/{id}:
 *   get:
 *     summary: User's product in cart
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         description: Product's id from /api/products/list endpoint
 *     tags:
 *     - Cart (Protected routes, user must be logged in)
 *     responses:
 *       200:
 *         description: OK, Returns a product that matches with the id
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ProductInCartResponse'
 *       401:
 *         description: Unauthorized, if user is not logged in
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/AuthError'
 *       404:
 *         description: Not Found, if there is no product in cart that matches the id
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ProductInCartError'
 *
 */

router.get(
	'/list/:id?',
	isAuth,
	validObjectId,
	cartExist,
	cartController.getProducts
);

/**
 * @swagger
 * /cart/add:
 *   post:
 *     summary: Add product to the user's cart
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/AddProductToCartBody'
 *     tags:
 *     - Cart (Protected routes, user must be logged in)
 *     responses:
 *       200:
 *         description: OK, Returns added product and a msg
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/AddProductToCartResponse'
 *       401:
 *         description: Unauthorized, if user is not logged in
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/AuthError'
 *       404:
 *         description: Not Found, if the product is out of stock or the quantity is bigger than the current stock.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ProductInCartStockError'
 *
 */

router.post(
	'/add',
	isAuth,
	validate(addProductCart),
	validObjectId,
	productExist,
	checkStock,
	cartController.addProducts
);

/**
 * @swagger
 * /cart/delete/{id}:
 *   delete:
 *     summary: Delete a product from the user's cart by passing a product id
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         description: Product's id from /api/cart/list endpoint
 *     tags:
 *     - Cart (Protected routes, user must be logged in)
 *     responses:
 *       200:
 *         description: OK, Returns deleted product from cart and a msg
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/DeleteProductFromCartResponse'
 *       401:
 *         description: Unauthorized, if user is not logged in
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/AuthError'
 *       404:
 *         description: Not Found, if there is no product in /api/cart/list endpoint that matches the id
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ProductInCartError'
 *
 */

router.delete(
	'/delete/:id',
	isAuth,
	validObjectId,
	cartExist,
	cartController.deleteProducts
);

export default router;
