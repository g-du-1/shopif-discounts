import { useState, useEffect } from "react";
import { Card, TextContainer, Button, ButtonGroup } from "@shopify/polaris";
import { ResourcePicker } from "@shopify/app-bridge-react";
import { useAppBridge } from "@shopify/app-bridge-react";
import { getSessionToken } from "@shopify/app-bridge-utils";

import { ProductsCard } from "./ProductsCard";

// TODO

export function DiscountsCard() {
  const [productPickerOpen, setProductPickerOpen] = useState(false);
  const [selectedProducts, setSelectedProducts] = useState([]);

  const handleSelectProductsClick = () => {
    setProductPickerOpen(!productPickerOpen);
  };

  const handleSelection = async (resources) => {
    setProductPickerOpen(false);
    const productIds = resources.selection.map((product) => product.id);
    await storeOffers(productIds);
    const storedOffers = await getOffers();
    setSelectedProducts(storedOffers.map((productObj) => productObj.gid));
  };

  const handleClearClick = async () => {
    await clearOffers();
    setSelectedProducts([]);
  };

  useEffect(() => {
    const fetchData = async () => {
      const data = await getOffers();
      setSelectedProducts(data.map((productObj) => productObj.gid));
    };

    fetchData();
  }, []);

  const app = useAppBridge();

  const getOffers = async () => {
    const token = await getSessionToken(app);

    const response = await fetch(`/api/v1/offers`, {
      headers: { Authorization: `Bearer ${token}` },
    });

    const data = await response.json();

    return data;
  };

  const test = async () => {
    const token = await getSessionToken(app);

    const response = await fetch(`/api/v1/discounts`, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      method: "POST",
      body: JSON.stringify({ discount: "558" }),
    });

    return await response.json();
  };

  const storeOffers = async (offers) => {
    const token = await getSessionToken(app);

    const response = await fetch(`/api/v1/offers`, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      method: "POST",
      body: JSON.stringify(offers),
    });

    return await response.json();
  };

  const clearOffers = async () => {
    const token = await getSessionToken(app);

    await fetch(`/api/v1/offers`, {
      headers: { Authorization: `Bearer ${token}` },
      method: "DELETE",
    });
  };

  return (
    <>
      <Card title="3 For ??10 Discounts" sectioned>
        <TextContainer spacing="loose">
          <p>Set the 3 for ??10 Offers.</p>
          <ButtonGroup>
            <Button primary onClick={handleSelectProductsClick}>
              Select Products
            </Button>
            <Button destructive onClick={handleClearClick}>
              Clear offers
            </Button>
          </ButtonGroup>
          <ResourcePicker
            resourceType="Product"
            showVariants={false}
            open={productPickerOpen}
            onSelection={(resources) => handleSelection(resources)}
            onCancel={() => setOpen(false)}
          />
        </TextContainer>
      </Card>
      {selectedProducts.length > 0 && (
        <ProductsCard productIds={selectedProducts} />
      )}
    </>
  );
}
