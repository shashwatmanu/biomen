import fetch from 'node-fetch';

const domain = 'ptvhp5-sb.myshopify.com';
const apiVersion = '2025-01';
const storefrontToken = 'f9dbfaee98fc4e9322849ef80d320cb5';

const endpoint = `https://${domain}/api/${apiVersion}/graphql.json`;

const query = `
{
  product(handle: "t-core") {
    title
    variants(first: 10) {
      edges {
        node {
          id
          title
          price { amount }
        }
      }
    }
  }
}
`;

fetch(endpoint, {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'X-Shopify-Storefront-Access-Token': storefrontToken,
  },
  body: JSON.stringify({ query }),
})
.then(res => res.json())
.then(json => console.log(JSON.stringify(json, null, 2)));
