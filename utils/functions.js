async function fetchBackendServer(url, data) {
	const BACKEND_SERVER_URL = 'http://localhost:3000';
	let fetchOptions = {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
		},
		body: JSON.stringify(data),
	};
	let response = await fetch(BACKEND_SERVER_URL + url, fetchOptions);
	return response;
}

export { fetchBackendServer };
