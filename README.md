# Gatsby Source Notion DB

Plugin for connecting a Notion database to Gatby's GraphQL.

- [Notion's API documentation](https://developers.notion.com/docs)
- [Dotenv](https://github.com/motdotla/dotenv#readme)

## Install

```shell
# NPM
npm install gatsby-source-notion-db

# Yarn
yarn add gatsby-source-notion-db
```

## How to use

You need a Notion access token and a Notion's database ID in order to be able to source content for your Notion database. You should keep this authentication token in an environment variable to the build process, so credentials aren't commited to source control. My recommendation is to use `.env` files.

```javascript
// In your gatsby-config.js
module.exports {
	plugins: [
		{
			resolve: 'gatsby-source-notion-db',
			options: {
				token: process.env.NOTION_TOKEN,
				databaseId: process.env.NOTION_DATABASE_ID,
				max: 10, // Max possible is 100, default is also 100
			},
		},
	],
}
```

> Currently the Notion API is in development. Some things may change or break so please, don't use in production yet!

## Current limitations

For the moment `gatsby-source-notion-db` only fetches a maximum of 100 elements in a database and doesn't retrieves page's content, only its properties.

Some of these limititations are due to the current state of the API.
