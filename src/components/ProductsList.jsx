import { ResourceList, TextStyle, Stack, Thumbnail } from "@shopify/polaris";

// TODO

export function ProductsList({ data }) {
  return (
    <ResourceList
      showHeader
      resourceName={{ singular: "Product", plural: "Products" }}
      items={data.nodes}
      renderItem={(item) => {
        const media = (
          <Thumbnail
            source={
              item.images.edges[0] ? item.images.edges[0].node.originalSrc : ""
            }
            alt={item.images.edges[0] ? item.images.edges[0].node.altText : ""}
          />
        );
        return (
          <ResourceList.Item
            id={item.id}
            media={media}
            accessibilityLabel={`View details for ${item.title}`}
          >
            <Stack>
              <Stack.Item fill>
                <h3>
                  <TextStyle variation="strong">{item.title}</TextStyle>
                </h3>
              </Stack.Item>
            </Stack>
          </ResourceList.Item>
        );
      }}
    />
  );
}
