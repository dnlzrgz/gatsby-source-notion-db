# Gatsby Source Notion DB

![GitHub release (latest SemVer)](https://img.shields.io/github/v/release/danielkvist/gatsby-source-notion-db)
[![MIT License](https://img.shields.io/apm/l/atomic-design-ui.svg?)](https://github.com/tterb/atomic-design-ui/blob/master/LICENSEs)
![npm bundle size](https://img.shields.io/bundlephobia/min/gatsby-source-notion-db)
![npm](https://img.shields.io/npm/dt/gatsby-source-notion-db)

Plugin for connecting a Notion database to Gatby's GraphQL using the official Notion SDK.

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

> Currently the Notion API is in development. Some things may change or break so please, be careful!

You need a Notion access token and a Notion's database ID in order to be able to source content for your Notion database. You should keep this authentication token in an environment variable to the build process, so credentials aren't commited to source control. My recommendation is to use `.env` files.

```javascript
// In your gatsby-config.js
module.exports = {
	// ...
	plugins: [
		{
			resolve: `gatsby-source-notion-db`,
			options: {
				token: process.env.NOTION_AUTH_TOKEN,
				databaseId: process.env.NOTION_DATABASE_ID,
				max: 50, // Max possible is 100, default is also 100.
			},
		},
	],
};
```

## Blocks

The `gatsby-source-notion-db` fetches the first 100 blocks on each page. This will change in the near future to get the total amount of blocks a page can contain.

```graphql
query myBlocks {
	allNotionPage {
		nodes {
			id
			_rawBlocks {
				type
			}
		}
	}
}
```

> These blocks are not formatted and come as the Notion API returns them. In the future I will add a transformer to convert them into Markdown and other formats to make them much easier to use.

## Example Query

As you know, Notion is very flexible when it comes to creating and ordering content. In my case I use Notion for a lot of things, among them I store in a database different articles and videos that I would like to review in the future. It is that database that I am using for the development of this plugin. One of the reasons for this is the large number of blocks contained in the different elements.

```graphql
query MyQuery {
	allNotionPage {
		nodes {
			id
			properties {
				Title {
					title {
						plain_text
					}
				}
				Fav {
					type
					checkbox
				}
				URL {
					url
				}
			}
		}
	}
}
```

## Current limitations

For the moment `gatsby-source-notion-db` only fetches a maximum of 100 elements in a database and 100 blocks inside each page.
