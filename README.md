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
      resolve: "gatsby-source-notion-db",
      options: {
        token: process.env.NOTION_ACCESS_TOKEN,
        databaseId: process.env.NOTION_DATABASE_ID,
      },
    },
  ],
}
```

## In Development

This plugin is in development and it's not stable. So please, don't use it in production.

## Current limitations

For the moment `gatsby-source-notion-db` only fetches the first 100 elements in a database and doesn't retrieves each page content, only its properties.
