import express from 'express';
import { fetchBackendServer, sendResponse } from '../utils/functions.js';

const router = express.Router();

router.post('/add', async (req, res) => {
	console.log('auth: add project');
	console.log(req.body);
	const response = await fetchBackendServer('/api/projects/add', req.body);
	if (response.status !== 200) {
		res.status(400);
	}
	console.log(response);
	sendResponse(response, res);
});

router.post('/edit', async (req, res) => {
	console.log('auth: edit project');
	console.log(req.body);
	const response = await fetchBackendServer('/api/projects/edit', req.body);
	console.log(response);
	sendResponse(response, res);
});

router.post('/delete', async (req, res) => {
	console.log('auth: delete project');
	console.log(req.body);
	const response = await fetchBackendServer('/api/projects/delete', req.body);
	console.log(response);
	sendResponse(response, res);
});

export default router;
