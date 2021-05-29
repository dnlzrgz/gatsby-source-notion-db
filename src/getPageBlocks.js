const getPageBlocks = async (notionClient, pageId) => {
	const pageBlocks = await notionClient.blocks.children.list({
		block_id: pageId,
		page_size: 100,
	});

	return pageBlocks.results;
};

module.exports = getPageBlocks;
