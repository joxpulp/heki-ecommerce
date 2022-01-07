import { Router } from 'express';
import { authController } from '../controllers/auth';
import { isAuth } from '../middlewares/auth';
import { validate } from '../middlewares/validate';
import { editUser, login, signup } from '../helpers/yup';

/**
 * @swagger
 * components:
 *   schemas:
 *     LoginBody:
 *       type: object
 *       properties:
 *         email:
 *           type: String
 *           description: User's email (must be a valid email)
 *           example: bokitforever@gmail.com
 *           required: true
 *         pwd:
 *           type: String
 *           description: User's password (min. 8 characters)
 *           example: bokitaforever
 *           required: true
 *     LoginResponse:
 *       type: object
 *       properties: 
 *         _id:
 *           type: String
 *           description: User's Id
 *           example: 6182191a7d9034b287c54c12
 *         name:
 *           type: String
 *           description: User's name
 *           example: Pepito Perez
 *         age:
 *           type: Number
 *           description: User's age
 *           example: 27
 *         deliveryAddress:
 *           type: object
 *           properties: 
 *             streetName: 
 *               type: String
 *               description: User's street name
 *               example: Av Rivadavia
 *             streetNumber: 
 *               type: Number
 *               description: User's street name
 *               example: 3811
 *             postalCode: 
 *               type: String
 *               description: User's street number
 *               example: C1425
 *             floor: 
 *               type: Number
 *               description: User's floor (if exist)
 *               example: 22
 *             apt: 
 *               type: String
 *               description: User's apt (if exist)
 *               example: D
 *             _id: 
 *               type: String
 *               description: Delivery Address id
 *               example: 61cc63f216a811331a5009c4
 *         phone:
 *           type: String
 *           description: User's phone
 *           example: '+5491128576884'
 *         avatar:
 *           type: String
 *           description: User's avatar url
 *           example: https://todosobrecamisetas.com/wp-content/uploads/tercera-camiseta-adidas-boca-juniors-2021-22-1.jpg 
 *         admin:
 *           type: Boolean
 *           description: User's role (false by default)
 *           example: false
 *     LoginError:
 *       type: object
 *       properties:
 *         error:
 *           type: String
 *           description: Error message
 *           example: Invalid email or password, try again
 *         loggedIn:
 *           type: Boolean
 *           description: True or false if user is logged in or not
 *           example: false
 *     EditUser:
 *       type: object
 *       properties: 
 *         avatar:
 *           type: file
 *           format: binary
 *           description: User's avatar img (Only .png jpeg jpg)
 *         name:
 *           type: String
 *           description: User's name
 *         lastname:
 *           type: String
 *           description: User's description
 *         age:
 *           type: Number
 *           description: User's category
 *         phone:
 *           type: String
 *           description: User's phone 
 *           example: +5491128576884
 *           required: true
 *         streetName:
 *           type: String
 *           description: User's street name (min. 4 characters)
 *           example: Av. Rivadavia
 *           required: true
 *         streetNumber:
 *           type: Number
 *           description: User's street number (min. 1 character)
 *           example: 2354
 *           required: true
 *         postalCode:
 *           type: String
 *           description: User's postal code (min. 4 characters)
 *           example: C1425
 *           required: true
 *         floor:
 *           type: Number
 *           description: User's address (min. 1 character)
 *           example: 22
 *         apt:
 *           type: String
 *           description: User's address (min. 1 character)
 *           example: D
 *         admin:
 *           type: Boolean
 *           description: User's role (true) by default false if not set. 
 *           example: true
 *     LogoutResponse:
 *       type: object
 *       properties:
 *         msg:
 *           type: String
 *           description: Message
 *           example: Session ended
 *         loggedIn:
 *           type: Boolean
 *           description: True or false if user is logged or not
 *           example: false
 *     LogoutError:
 *       type: object
 *       properties:
 *         error:
 *           type: String
 *           description: Error message
 *           example: There is no session started or is already logout
 *     SignupBody:
 *       type: object
 *       properties:
 *         email:
 *           type: String
 *           description: User's email (must be a valid email)
 *           example: bokitforever@gmail.com
 *           required: true
 *         pwd:
 *           type: String
 *           description: User's password (min. 8 characters)
 *           example: bokitaforever
 *           required: true
 *         pwdConfirmation:
 *           type: String
 *           description: User's password confirmation (min. 8 characters)
 *           example: bokitaforever
 *           required: true
 *         name:
 *           type: String
 *           description: User's name (min. 3 characters)
 *           example: Pepito
 *           required: true
 *         age:
 *           type: Number
 *           description: User's age (min. 16 years old)
 *           example: 27
 *           required: true
 *         phone:
 *           type: String
 *           description: User's phone 
 *           example: '+5491128576884'
 *           required: true
 *         streetName:
 *           type: String
 *           description: User's street name (min. 4 characters)
 *           example: Av. Rivadavia
 *           required: true
 *         streetNumber:
 *           type: Number
 *           description: User's street number (min. 1 character)
 *           example: 2354
 *           required: true
 *         postalCode:
 *           type: String
 *           description: User's postal code (min. 4 characters)
 *           example: C1425
 *           required: true
 *         floor:
 *           type: Number
 *           description: User's address (min. 1 character)
 *           example: 22
 *         apt:
 *           type: String
 *           description: User's address (min. 1 character)
 *           example: D
 *         admin:
 *           type: Boolean
 *           description: User's role (true) by default false if not set. 
 *           example: true
 *     SignupError:
 *       type: object
 *       properties: 
 *         error:
 *           type: String
 *           description: Error message
 *           example: This email already exist, try with other option
 *     ValidationErrors: 
 *       type: object
 *       properties:
 *         errors: 
 *           type: array
 *           items:
 *             type: string   
 *             example: required field(except patch), invalid field etc...
 *     AuthError:
 *       type: object
 *       properties:
 *         error:
 *           type: String
 *           description: Error message
 *           example: You are not logged in
 *         loggedIn:
 *           type: Boolean
 *           description: False because the user is not logged in
 *           example: false
 *     AdminError:
 *       type: object
 *       properties:
 *         error:
 *           type: String
 *           description: Error message
 *           example: Not authorized, login with admin privilegies  
 */

const router = Router();


/**
 * @swagger
 * /auth/login:
 *   post:
 *     summary: Login user
 *     tags:
 *     - Auth
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/LoginBody'
 *     responses:
 *       200:
 *         description: OK, Returns 'userData' and 'loggedIn' key with true
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 userData:
 *                   $ref: '#/components/schemas/LoginResponse'
 *                 loggedIn: 
 *                   type: Boolean
 *                   example: true
 *       401:
 *         description: Unauthorized, if user fails to login or is not registered
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/LoginError'
 *       400:
 *         description: Bad Request, if field validation fails
 *         content:
 *           application/json:
 *             schema: 
 *               $ref: '#/components/schemas/ValidationErrors'
 *
 */

router.post('/login', validate(login), authController.login);

/**
 * @swagger
 * /auth/edituser:
 *   patch:
 *     summary: Update user fields
 *     tags:
 *     - Auth
 *     requestBody:
 *       content:
 *         multipart/form-data:
 *           schema:
 *             $ref: '#/components/schemas/EditUser'
 *     responses:
 *       201:
 *         description: Created, Returns updated user fields and a message
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 userUpdated:
 *                   $ref: '#/components/schemas/LoginResponse'
 *                 msg: 
 *                   type: String
 *                   example: User Updated
 *       400:
 *         description: Bad Request, if field validation fails
 *         content:
 *           application/json:
 *             schema: 
 *               $ref: '#/components/schemas/ValidationErrors'
 *       401:
 *         description: Unauthorized, if user is not logged in
 *         content:
 *           application/json:
 *             schema: 
 *               $ref: '#/components/schemas/AuthError'
 */

router.patch(
	'/edituser',
	isAuth,
	validate(editUser),
	authController.editUser
);

/**
 * @swagger
 * /auth/logout:
 *   post:
 *     summary: Logout session
 *     tags:
 *     - Auth
 *     responses:
 *       200:
 *         description: OK, Returns a message and logged boolean with false
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/LogoutResponse'     
 *       404:
 *         description: Not Found, if a session does not exist 
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/LogoutError'
 */

router.post('/logout', authController.logout);

/**
 * @swagger
 * /auth/signup:
 *   post:
 *     summary: Signup a new user
 *     tags:
 *     - Auth
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/SignupBody'
 *     responses:
 *       200:
 *         description: OK, Returns user details and a message
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 userData: 
 *                   $ref: '#/components/schemas/LoginResponse'
 *                 msg: 
 *                   type: String
 *                   example: User created
 *       409:
 *         description: Conflict, if there is an user with the same email
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/SignupError'
 *       400:
 *         description: Bad Request, if field validation fails
 *         content:
 *           application/json:
 *             schema: 
 *               $ref: '#/components/schemas/ValidationErrors'
 */

router.post('/signup', validate(signup), authController.signup);

/**
 * @swagger
 * /auth/isloggedin:
 *   get:
 *     summary: Check if the user is logged in or not
 *     tags:
 *     - Auth
 *     responses:
 *       200:
 *         description: OK, Returns logged boolean with true because the user is logged in
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 loggedIn: 
 *                   type: Boolean
 *                   example: true
 *       404:
 *         description: Not Found, Returns logged boolean with false because the user is not logged in
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 loggedIn: 
 *                   type: Boolean
 *                   example: false
 */

router.get('/isloggedin', authController.isLoggedIn);

export default router;

