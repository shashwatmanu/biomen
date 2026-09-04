const domain = import.meta.env.VITE_SHOPIFY_STORE_DOMAIN || 'ptvhp5-sb.myshopify.com';
const apiVersion = import.meta.env.VITE_SHOPIFY_API_VERSION || '2025-01';
const storefrontToken = import.meta.env.VITE_SHOPIFY_STOREFRONT_TOKEN || 'f9dbfaee98fc4e9322849ef80d320cb5';

const endpoint = `https://${domain}/api/${apiVersion}/graphql.json`;

const headers = {
  'Content-Type': 'application/json',
  'X-Shopify-Storefront-Access-Token': storefrontToken,
};

export async function shopifyFetch(query, variables = {}) {
  try {
    const response = await fetch(endpoint, {
      method: 'POST',
      headers,
      body: JSON.stringify({ query, variables }),
    });
    const json = await response.json();
    if (json.errors) {
      console.error('Shopify GraphQL Errors:', json.errors);
      throw new Error('Failed to fetch from Shopify Storefront API');
    }
    return json.data;
  } catch (error) {
    console.error('Shopify Request Failed:', error);
    throw error;
  }
}

// Queries
export const getProductByHandle = async (handle) => {
  const query = `
    query getProduct($handle: String!) {
      product(handle: $handle) {
        id
        handle
        title
        variants(first: 10) {
          edges {
            node {
              id
              title
              price {
                amount
                currencyCode
              }
              availableForSale
            }
          }
        }
      }
    }
  `;
  const data = await shopifyFetch(query, { handle });
  return data?.product;
};

export const getCart = async (cartId) => {
  const query = `
    query getCart($cartId: ID!) {
      cart(id: $cartId) {
        id
        checkoutUrl
        lines(first: 10) {
          edges {
            node {
              id
              quantity
              merchandise {
                ... on ProductVariant {
                  id
                  product {
                    title
                    handle
                  }
                  title
                  price {
                    amount
                    currencyCode
                  }
                }
              }
            }
          }
        }
      }
    }
  `;
  const data = await shopifyFetch(query, { cartId });
  return data?.cart;
};

// Mutations
export const createCart = async (variantId, quantity) => {
  const query = `
    mutation cartCreate($input: CartInput!) {
      cartCreate(input: $input) {
        cart {
          id
          checkoutUrl
          lines(first: 10) {
            edges {
              node {
                id
                quantity
                merchandise {
                  ... on ProductVariant {
                    id
                    product {
                      title
                      handle
                    }
                    title
                    price {
                      amount
                      currencyCode
                    }
                  }
                }
              }
            }
          }
        }
        userErrors {
          field
          message
        }
      }
    }
  `;
  const input = {
    lines: [
      {
        merchandiseId: variantId,
        quantity,
      },
    ],
  };
  const data = await shopifyFetch(query, { input });
  return data?.cartCreate?.cart;
};

export const addToCart = async (cartId, variantId, quantity) => {
  const query = `
    mutation cartLinesAdd($cartId: ID!, $lines: [CartLineInput!]!) {
      cartLinesAdd(cartId: $cartId, lines: $lines) {
        cart {
          id
          checkoutUrl
          lines(first: 10) {
            edges {
              node {
                id
                quantity
                merchandise {
                  ... on ProductVariant {
                    id
                    product {
                      title
                      handle
                    }
                    title
                    price {
                      amount
                      currencyCode
                    }
                  }
                }
              }
            }
          }
        }
        userErrors {
          field
          message
        }
      }
    }
  `;
  const lines = [
    {
      merchandiseId: variantId,
      quantity,
    },
  ];
  const data = await shopifyFetch(query, { cartId, lines });
  return data?.cartLinesAdd?.cart;
};

export const updateCartLine = async (cartId, lineId, quantity) => {
  const query = `
    mutation cartLinesUpdate($cartId: ID!, $lines: [CartLineUpdateInput!]!) {
      cartLinesUpdate(cartId: $cartId, lines: $lines) {
        cart {
          id
          checkoutUrl
          lines(first: 10) {
            edges {
              node {
                id
                quantity
                merchandise {
                  ... on ProductVariant {
                    id
                    product {
                      title
                      handle
                    }
                    title
                    price {
                      amount
                      currencyCode
                    }
                  }
                }
              }
            }
          }
        }
        userErrors {
          field
          message
        }
      }
    }
  `;
  const lines = [
    {
      id: lineId,
      quantity,
    },
  ];
  const data = await shopifyFetch(query, { cartId, lines });
  return data?.cartLinesUpdate?.cart;
};

export const removeCartLine = async (cartId, lineIds) => {
  const query = `
    mutation cartLinesRemove($cartId: ID!, $lineIds: [ID!]!) {
      cartLinesRemove(cartId: $cartId, lineIds: $lineIds) {
        cart {
          id
          checkoutUrl
          lines(first: 10) {
            edges {
              node {
                id
                quantity
                merchandise {
                  ... on ProductVariant {
                    id
                    product {
                      title
                      handle
                    }
                    title
                    price {
                      amount
                      currencyCode
                    }
                  }
                }
              }
            }
          }
        }
        userErrors {
          field
          message
        }
      }
    }
  `;
  const data = await shopifyFetch(query, { cartId, lineIds });
  return data?.cartLinesRemove?.cart;
};
