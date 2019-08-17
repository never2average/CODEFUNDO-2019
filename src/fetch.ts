export default async function(url: string, config: any = {}) {

	const existingHeaders = config.headers ? config.headers : {}

	return (await fetch(url, {
		method: 'POST',
		...config,
		headers: {
			...existingHeaders,
			'Content-Type': 'application/json'
		}
	})).json()
}