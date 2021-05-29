const { Client } = require('@notionhq/client');
const getPages = require('./src/getPages');
const getPageProps = require('./src/getPageProps');
const getPageBlocks = require('./src/getPageBlocks');

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

	const results = await getPages(notion, databaseId, max);

	results.forEach(async (result) => {
		const pageId = result.id;
		const pageProps = await getPageProps(notion, pageId);
		const pageBlocks = await getPageBlocks(notion, pageId);

		createNode({
			children: [],
			internal: {
				type: 'NotionPage',
				mediaType: 'application/json',
				content: JSON.stringify(pageProps),
				contentDigest: createContentDigest(pageProps),
			},
			...pageProps,
			_rawBlocks: [...pageBlocks],
			parent: JSON.stringify(pageId),
			id: createNodeId(pageId),
		});
	});

	return;
}

module.exports = { sourceNodes };
