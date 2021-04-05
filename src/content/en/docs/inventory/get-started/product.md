---
label: Products
title: Products to organize and track
description: Products are the goods to be organized and tracked by the inventory app.
position: 2
book: get-started
collection: inventory
---

Products are the goods to be organized and tracked by the **Inventory** app.

## Create a product

To create a product, you can either go to <go-to :path="['Products']"></go-to>
and <button-action>New Product</button-action>

![New Product at Products](/docs/inventory/get-started/product-new.png)

or select New Product in any product selector

![New Product on product selector](/docs/inventory/get-started/product-selector.png)

Enter the product's name. Check out [*Naming products*](#naming-products) on how to use the right name.

Select a product classification or New Classification. More on product classifcation [here](#classifying-products).

Select a brand or New Brand. More on branding products [here](#branding-products)

![Product form](/docs/inventory/get-started/product-form.png)

Finally, <button-action>Save</button-action> to save your product.

### Naming products

When naming products, you want them to be easily discoverable. The following rules could help you come up with such names:

- Avoid generic names such as coffee, rather, you should use a well-known brand name like Nescafé.
- For products that aren not branded such as raw materials, you may use names like yam, orange, etc.
- Use the singular form of a noun.
- Do not include the unit of a product to it's name.
- Do not include the model information to the product's name. You could use [tags](/docs/inventory/get-started/overview#still-particular-about-the-small-details?) for that.

## Classifying products

Classifying your products helps the **Inventory** app determine how to treat each product.

<!-- ![New Product on product selector](/docs/inventory/get-started/sc.jpg) -->

Product classifications come from a long line of hierarchy with roots to two fundamental classifications:

- **Stockable** products will be tracked.
- while **Non-Stockable** products will not be tracked.

### Create a product classification

To create a new classification, you should select New Classification in a product classification selector when creating a product

![Product classification selector](/docs/inventory/get-started/product-class-selector.png)

Enter the name of your classification.

Select an existing classification as the parent or select New Classification to create yet another classification to use as the parent.

![Product classification form](/docs/inventory/get-started/product-class-form.png)

Finally, <button-action>Save</button-action> to save your classification.

## Branding products

If your product has a brand, you should add it to the product information in order to maintain the identity it has in the marketplace.

### Create a brand

To create a new brand, you should select New Brand in a brand selector when creating a product.

![New Product Brand selector](/docs/inventory/get-started/product-brand-selector.png)

Enter the name of the brand.

Select the company that owns the brand or select New Company to create a new company for the brand.

![New Product Brand selector](/docs/inventory/get-started/product-brand-form.png)

Finally, <button-action>Save</button-action> to save your brand.
