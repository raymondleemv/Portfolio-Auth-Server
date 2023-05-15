async function fetchBackendServer(url, data) {
	let fetchOptions = {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
		},
		body: JSON.stringify(data),
	};
	let response = await fetch(
		process.env.BACKEND_SERVER_URL + url,
		fetchOptions
	);
	console.log(process.env.BACKEND_SERVER_URL + url);
	return response;
}

async function sendResponse(fetchResponse, res) {
	if (fetchResponse.status !== 200) {
		res.status(400);
	}
	const message = await fetchResponse.text();
	res.send(message);
}

export { fetchBackendServer, sendResponse };
