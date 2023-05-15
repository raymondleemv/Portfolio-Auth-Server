import passport from 'passport';
import LocalStrategy from 'passport-local';
import bcrypt from 'bcrypt';
import User from './models/User.js';

function initialize(passport) {
	console.log('initialize passport');
	passport.use(
		new LocalStrategy({ usernameField: 'email' }, async function verify(
			username,
			password,
			cb
		) {
			try {
				console.log('local strategy');
				const user = await User.findOne({ email: username });
				if (!user) {
					console.log('No user with that email');
					return cb(null, false, { message: 'No user with that email' });
				}
				console.log('passed check');
				const authenticated = await bcrypt.compare(password, user.password);
				if (authenticated) {
					console.log('Authenticated');
					return cb(null, user);
				} else {
					console.log('Incorrect Passowrd');
					return cb(null, false, { message: 'Incorrect Passowrd' });
				}
			} catch (e) {
				console.log(e);
				return cb(e);
			}
		})
	);

	passport.serializeUser(function (user, cb) {
		console.log('serializeUser');
		console.log(user);
		cb(null, { id: user.id, email: user.email });
	});

	passport.deserializeUser(function (user, cb) {
		console.log('deserializeUser');
		console.log(user);
		return cb(null, user);
	});
}

export default initialize;
