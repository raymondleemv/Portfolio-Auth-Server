import express from 'express';
import { fetchBackendServer } from '../utils/functions.js';

const router = express.Router();

router.post('/add', async (req, res) => {
	console.log('auth: add skill');
	console.log(req.body);
	const response = await fetchBackendServer('/api/skills/add', req.body);
	let message = await response.text();
	console.log(response);
	res.send(message);
});

router.post('/edit', async (req, res) => {
	console.log('auth: edit skill');
	console.log(req.body);
	const response = await fetchBackendServer('/api/skills/edit', req.body);
	console.log(response);
	let message = await response.text();
	res.send(message);
});

router.post('/delete', async (req, res) => {
	console.log('auth: delete skill');
	console.log(req.body);
	const response = await fetchBackendServer('/api/skills/delete', req.body);
	console.log(response);
	if (response.status !== 200) {
		res.status(400).send('auth: delete skill failed');
	}
	res.send('auth: delete skill');
});

export default router;
