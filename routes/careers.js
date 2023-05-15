import express from 'express';
import { fetchBackendServer, sendResponse } from '../utils/functions.js';

const router = express.Router();

router.post('/add', async (req, res) => {
	console.log('auth: add career');
	console.log(req.body);
	const response = await fetchBackendServer('/api/careers/add', req.body);
	console.log(response);
	sendResponse(response, res);
});

router.post('/edit', async (req, res) => {
	console.log('auth: edit career');
	console.log(req.body);
	const response = await fetchBackendServer('/api/careers/edit', req.body);
	console.log(response);
	sendResponse(response, res);
});

router.post('/delete', async (req, res) => {
	console.log('auth: delete career');
	console.log(req.body);
	const response = await fetchBackendServer('/api/careers/delete', req.body);
	console.log(response);
	sendResponse(response, res);
});

export default router;
