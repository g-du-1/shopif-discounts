// TODO
import { Shopify } from "@shopify/shopify-api";
import Crypto from "crypto";

export const generateCode = () => {
  const size = 16;
  return Crypto.randomBytes(size).toString("base64").slice(0, size);
};

export const createDiscountCode = async (session, payload) => {
  const discount = payload.discount;
  const code = generateCode();
  const now = new Date().toISOString();
  let expires = new Date();
  expires.setHours(expires.getHours() + 1);
  expires = expires.toISOString();

  const client = new Shopify.Clients.Graphql(session.shop, session.accessToken);

  const data = await client.query({
    data: {
      query: `mutation discountCodeBasicCreate($basicCodeDiscount: DiscountCodeBasicInput!) {
        discountCodeBasicCreate(basicCodeDiscount: $basicCodeDiscount) {
          codeDiscountNode {
            id
            codeDiscount {
              ... on DiscountCodeBasic {
                codes(first:10) {
                  nodes {
                    code
                  }
                }
              }
            }
          }
          userErrors {
            field
            code
            message
          }
        }
      }`,
      variables: {
        basicCodeDiscount: {
          title: code,
          code: code,
          startsAt: now,
          endsAt: expires,
          customerSelection: {
            all: true,
          },
          customerGets: {
            value: {
              discountAmount: {
                amount: discount / 100,
                appliesOnEachItem: false,
              },
            },
            items: {
              all: true,
            },
          },
          appliesOncePerCustomer: true,
          usageLimit: 1,
        },
      },
    },
  });

  // Is there a better way to do this?
  const returnedData = {
    id: data.body.data.discountCodeBasicCreate.codeDiscountNode.id,
    code: data.body.data.discountCodeBasicCreate.codeDiscountNode.codeDiscount
      .codes.nodes[0].code,
  };

  return returnedData;
};

export const deleteDiscountCode = async (session, id) => {
  const client = new Shopify.Clients.Graphql(session.shop, session.accessToken);

  const data = await client.query({
    data: {
      query: `mutation discountCodeDelete($id:ID!) {
        discountCodeDelete(id: $id) {
          deletedCodeDiscountId
          userErrors {
            field
            code
            message
          }
        }
      }`,
      variables: {
        id: id,
      },
    },
  });

  return data.body.data.discountCodeDelete.deletedCodeDiscountId;
};
