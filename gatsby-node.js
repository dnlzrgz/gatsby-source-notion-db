const { Client } = require('@notionhq/client');

async function sourceNodes(
	{ actions: { createNode }, createNodeId, createContentDigest },
	pluginOptions
) {
	const { token, databaseId } = pluginOptions;

	const notion = new Client({
		auth: token,
	});

	const response = await notion.databases.query({
		database_id: databaseId,
	});

	const { results } = response;

	results.forEach(async (result) => {
		const pageId = result.id;
		const response = await notion.pages.retrieve({ page_id: pageId });

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
