const { Client } = require('@notionhq/client');

async function sourceNodes(
	{ actions: { createNode }, reporter, createNodeId, createContentDigest },
	pluginOptions
) {
	const { token, databaseId, max = 100 } = pluginOptions;

	if (!token) {
		reporter.panic(
			'The auth token passed to gatsby-source-notion-db is empty or invalid. Please, use a valid auth token.'
		);
	} else if (!databaseId) {
		reporter.panic(
			'The database ID passed to gatsby-source-notion-db is empty or invalid. Please, use a valid database ID.'
		);
	}

	const notion = new Client({
		auth: token,
	});

	// Returns a 404 response if the database doesn't exist.
	// Or a 400 or 429 response if the request exceeds the request
	// limit.
	const response = await notion.databases.query({
		database_id: databaseId,
		page_size: max,
	});

	const { results } = response;

	results.forEach(async (result) => {
		const pageId = result.id;
		const response = await notion.pages.retrieve({
			page_id: pageId,
		});

		createNode({
			children: [],
			internal: {
				type: 'NotionPage',
				mediaType: 'application/json',
				content: JSON.stringify(response),
				contentDigest: createContentDigest(response),
			},
			...response,
			parent: JSON.stringify(pageId),
			id: createNodeId(pageId),
		});
	});

	return;
}

module.exports = { sourceNodes };
