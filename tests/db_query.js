require('dotenv').config();
const { Client } = require('@notionhq/client');

const notion = new Client({
	auth: process.env.NOTION_TOKEN,
});

(async () => {
	const databaseId = process.env.NOTION_DATABASE_ID;
	const response = await notion.databases.query({
		database_id: databaseId,
		page_size: 10,
	});
	const { results } = response;

	results.forEach(async (result) => {
		const pageId = result.id;
		const response = await notion.pages.retrieve({ page_id: pageId });

		console.log(response);
	});
})();
