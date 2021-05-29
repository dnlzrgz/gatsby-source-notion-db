const getPages = async (notionClient, databaseId, max) => {
	// Returns a 404 response if the database doesn't exist.
	// Or a 400 or 429 response if the request exceeds the request
	// limit.
	const response = await notionClient.databases.query({
		database_id: databaseId,
		page_size: max,
	});

	const { results } = response;

	return results;
};

module.exports = getPages;
