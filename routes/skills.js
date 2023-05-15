import express from 'express';
import { fetchBackendServer, sendResponse } from '../utils/functions.js';

const router = express.Router();

router.post('/add', async (req, res) => {
	console.log('auth: add skill');
	console.log(req.body);
	const response = await fetchBackendServer('/api/skills/add', req.body);
	console.log(response);
	sendResponse(response, res);
});

router.post('/edit', async (req, res) => {
	console.log('auth: edit skill');
	console.log(req.body);
	const response = await fetchBackendServer('/api/skills/edit', req.body);
	console.log(response);
	sendResponse(response, res);
});

router.post('/delete', async (req, res) => {
	console.log('auth: delete skill');
	console.log(req.body);
	const response = await fetchBackendServer('/api/skills/delete', req.body);
	console.log(response);
	sendResponse(response, res);
});

export default router;
