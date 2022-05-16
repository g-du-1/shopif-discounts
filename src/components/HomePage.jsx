import { Page, Layout } from "@shopify/polaris";

import { DiscountsCard } from "./DiscountsCard";

// TODO

export function HomePage() {
  return (
    <Page fullWidth>
      <Layout>
        <Layout.Section>
          <DiscountsCard />
        </Layout.Section>
      </Layout>
    </Page>
  );
}
