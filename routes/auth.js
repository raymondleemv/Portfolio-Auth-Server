import express from 'express';
import passport from 'passport';
import bcrypt from 'bcrypt';
import User from '../models/User.js';

const router = express.Router();

router.post(
	'/login',
	passport.authenticate('local', {
		successReturnToOrRedirect: '/login-success',
		failureRedirect: '/login-failed',
		failureMessage: true,
	})
);

router.get('/login', (req, res) => {
	res.sendFile('/index.html', { root: './routes' });
});

router.get('/login-success', (req, res) => {
	console.log('login successful');
	res.send({ message: 'login successful' });
});

router.get('/login-failed', (req, res) => {
	console.log('login failed');
	res.status(400).send('login failed');
});

router.post('/logout', function (req, res, next) {
	req.logout(function (err) {
		if (err) {
			return res.status(400).send(err);
		}
		res.send('You have successfully logged out.');
	});
});

router.post('/signup', async function (req, res, next) {
	const hashedPassword = await bcrypt.hash(req.body.password, 10);
	try {
		const user = await User.create({
			email: req.body.email,
			password: hashedPassword,
		});
	} catch (e) {
		return res.status(403).send(`Error: ${e}`);
	}
	res.send('User created successfully');
});

export default router;
