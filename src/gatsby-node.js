require('dotenv').config();
const { Client } = require('@notionhq/client');

export async function sourceNodes({ boundActionCreators }, pluginOptions) {
	const { createNode } = boundActionCreators;
	const { token, databaseId } = pluginOptions;

	const notion = new Client({
		auth: token,
	});

	const response = await notion.databases.query({
		database_id: databaseId,
	});

	const { results } = response;

	results.forEach(async ({ result }) => {
		const pageId = result.id;
		const response = await notion.pages.retrieve({ page_id: pageId });

		createNode({
			id: pageId,
			parent: '__SOURCE__',
			internal: {
				...response,
			},
		});
	});

	return;
}
