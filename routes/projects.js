import express from 'express';
import { fetchBackendServer } from '../utils/functions.js';

const router = express.Router();

router.post('/add', async (req, res) => {
	console.log('auth: add project');
	console.log(req.body);
	const response = await fetchBackendServer('/api/projects/add', req.body);
	let message = await response.text();
	console.log(response);
	res.send(message);
});

router.post('/edit', async (req, res) => {
	console.log('auth: edit project');
	console.log(req.body);
	const response = await fetchBackendServer('/api/projects/edit', req.body);
	console.log(response);
	let message = await response.text();
	res.send(message);
});

router.post('/delete', async (req, res) => {
	console.log('auth: delete project');
	console.log(req.body);
	const response = await fetchBackendServer('/api/projects/delete', req.body);
	console.log(response);
	if (response.status !== 200) {
		res.status(400).send('auth: delete project failed');
	}
	res.send('auth: delete project');
});

export default router;
