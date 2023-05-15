import express from 'express';
import { fetchBackendServer } from '../utils/functions.js';

const router = express.Router();

router.post('/add', async (req, res) => {
	console.log('auth: add career');
	console.log(req.body);
	const response = await fetchBackendServer('/api/careers/add', req.body);
	let message = await response.text();
	console.log(response);
	res.send(message);
});

router.post('/edit', async (req, res) => {
	console.log('auth: edit career');
	console.log(req.body);
	const response = await fetchBackendServer('/api/careers/edit', req.body);
	console.log(response);
	let message = await response.text();
	res.send(message);
});

router.post('/delete', async (req, res) => {
	console.log('auth: delete career');
	console.log(req.body);
	const response = await fetchBackendServer('/api/careers/delete', req.body);
	console.log(response);
	if (response.status !== 200) {
		res.status(400).send('auth: delete career failed');
	}
	res.send('auth: delete career');
});

export default router;
