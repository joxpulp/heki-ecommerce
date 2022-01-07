import { Request, Response, NextFunction } from 'express';
import passport, { editUser } from '../middlewares/auth';
import cloudinary from '../services/cloudinary';
import { UploadedFile } from 'express-fileupload';
class AuthController {
	login(req: Request, res: Response, next: NextFunction) {
		passport.authenticate('login', (err, user, info) => {
			if (err) return next(err);

			if (user) {
				req.login(user, () => {
					return res.json({
						userData: {
							_id: user._id,
							name: user.name,
							lastname: user.lastname,
							age: user.age,
							deliveryAddress: user.deliveryAddress,
							phone: user.phone,
							avatar: user.avatar,
							admin: user.admin,
						},
						loggedIn: true,
					});
				});
			} else {
				return res.status(401).json({ ...info, loggedIn: false });
			}
		})(req, res, next);
	}

	signup(req: Request, res: Response, next: NextFunction) {
		passport.authenticate('signup', (err, user, info) => {
			if (err) return next(err);

			if (user) {
				return res.status(201).json({
					userData: {
						_id: user._id,
						name: user.name,
						lastname: user.lastname,
						age: user.age,
						deliveryAddress: user.deliveryAddress,
						phone: user.phone,
						avatar: user.avatar,
						admin: user.admin,
					},
					msg: 'User created',
				});
			} else {
				return res.status(401).json({ ...info });
			}
		})(req, res, next);
	}

	isLoggedIn(req: Request, res: Response) {
		if (req.user) {
			return res.json({ loggedIn: true });
		} else {
			return res.status(404).json({ loggedIn: false });
		}
	}

	logout(req: Request, res: Response) {
		if (req.user) {
			req.logout();
			return res.json({ msg: 'Session ended', loggedIn: false });
		}

		return res
			.status(404)
			.json({ error: 'The is no session started or is already logout' });
	}

	async editUser(req: Request, res: Response) {
		const data = {
			...req.body,
		};

		if (req.files) {
			const { tempFilePath } = req.files.avatar as UploadedFile;
			await cloudinary.uploader.destroy(req.user!.avatar_id);
			const { secure_url, public_id } = await cloudinary.uploader.upload(
				tempFilePath,
				{ folder: 'AVATARS' }
			);
			data.avatar = secure_url;
			data.avatar_id = public_id;
		}

		const userUpdated = await editUser(req.user!._id, data);
		return res.status(201).json({ userUpdated, msg: 'User Updated' });
	}
}

export const authController = new AuthController();
