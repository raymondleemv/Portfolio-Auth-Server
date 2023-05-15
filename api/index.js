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
				? 'https://www.raymondleemv.com'
				: 'http://localhost:5173',
		credentials: true,
	})
);

const MONGO_URI = `mongodb+srv://${process.env.MONGO_USERNAME}:${process.env.MONGO_PASSWORD}@cluster0.j65vffw.mongodb.net/auth-server?retryWrites=true&w=majority`;

mongoose
	.connect(MONGO_URI)
	.then(console.log('connected'))
	.catch((err) => console.log(err));

let sessionOptions = {
	secret: process.env.SESSION_SECRET,
	resave: false,
	saveUninitialized: false,
	store: MongoStore.create({
		mongoUrl: MONGO_URI,
	}),
};

if (process.env.PRODUCTION === 'true') {
	sessionOptions.cookie = {
		secure: true,
		sameSite: 'none',
	};
}

app.use(session(sessionOptions));
app.use(passport.authenticate('session'));
initializePassport(passport);

app.use('/', authRouter);

let ensureLoggedIn = (req, res, next) => {
	console.log('ensure logged in middleware');
	if (!req.isAuthenticated()) {
		console.log('Not Authorized');
		return res.send('Not Authorized. Please log in first.');
	}
	console.log('Authorized');
	next();
};

app.use(ensureLoggedIn);
app.use('/projects/', projectsRouter);
app.use('/careers/', careersRouter);
app.use('/skills/', skillsRouter);

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
