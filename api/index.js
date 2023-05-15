import express from 'express';
import cors from 'cors';
import session from 'express-session';
import passport from 'passport';
import MongoStore from 'connect-mongo';
import dotenv from 'dotenv';
import authRouter from '../routes/auth.js';
import mongoose from 'mongoose';
import initializePassport from '../passport.config.js';
import projectsRouter from '../routes/projects.js';
import careersRouter from '../routes/careers.js';
import skillsRouter from '../routes/skills.js';

dotenv.config();

const app = express();
const port = process.env.PORT || 3001;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(
	cors({
		origin:
			process.env.PRODUCTION === 'true'
				? [
						'https://www.raymondleemv.com',
						'https://react-portfolio-git-development-raymondleemv.vercel.app',
				  ]
				: 'http://localhost:5173',
		credentials: true,
		methods: ['POST', 'PUT', 'GET', 'OPTIONS', 'HEAD'],
	})
);

mongoose
	.connect(process.env.MONGODB_URI)
	.then(console.log('connected'))
	.catch((err) => console.log(err));

let sessionOptions = {
	secret: process.env.SESSION_SECRET,
	resave: false,
	saveUninitialized: false,
	store: MongoStore.create({
		mongoUrl: process.env.MONGODB_URI,
	}),
};

if (process.env.PRODUCTION === 'true') {
	sessionOptions.cookie = {
		secure: true,
		sameSite: 'none',
	};
}

app.set('trust proxy', 1);
app.use(session(sessionOptions));
app.use(passport.authenticate('session'));
initializePassport(passport);

app.use('/api', authRouter);

let ensureLoggedIn = (req, res, next) => {
	console.log('ensure logged in middleware');
	if (!req.isAuthenticated()) {
		console.log('Not Authorized');
		return res.status(400).send('Not Authorized. Please log in first.');
	}
	console.log('Authorized');
	next();
};

app.use(ensureLoggedIn);
app.post('/api/authentication-status', (req, res, next) => {
	// if reached here, user is authenticated
	res.send('Authorized');
});
app.use('/api/projects/', projectsRouter);
app.use('/api/careers/', careersRouter);
app.use('/api/skills/', skillsRouter);

app.get('/protected', (req, res, next) => {
	console.log(req.sessionID);
	console.log('protected route');
	console.log(`IsAuthenticated ${req.isAuthenticated()}`);
	if (!req.isAuthenticated()) {
		return res.send({ message: 'Not Authorized' });
	}
	res.send(`Welcome ${req.user.email}`);
});

app.listen(port, () => {
	console.log(`app listening on ${port}`);
});

export { app };
