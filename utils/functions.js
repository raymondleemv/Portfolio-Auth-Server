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
	return response;
}

export { fetchBackendServer };
