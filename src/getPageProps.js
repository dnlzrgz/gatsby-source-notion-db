const getPageProps = async (notionClient, pageId) => {
	return await notionClient.pages.retrieve({ page_id: pageId });
};

module.exports = getPageProps;
