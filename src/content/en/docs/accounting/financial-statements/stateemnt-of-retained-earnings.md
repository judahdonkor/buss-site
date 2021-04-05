---
label: Pull
title: Pulling products from stockrooms
description: With static site generation you can render your application during the build phase and deploy it to any static hosting services such as Netlify, Github pages, Vercel etc.
position: 3
book: tracking
collection: accounting
---

You can pull products from your stockroom to be used in the manufacturing process or sales with the pull action.

## Pull products

To pull products, you can either go to <go-to :path="['Pulls']"></go-to> and <button-action>Pull</button-action>

![alt](/docs/inventory/tracking/pull-new.png)

or go to <go-to :path="['Inventory']"></go-to> and <button-action>Pull</button-action>

![alt](/docs/inventory/tracking/pull-at-inv.png)

By convention, the Inventory app pulls products from the **Shop** at the present day while increasing the balance of your **Accrued Revenue**. You may change these [preferences](/docs/inventory/preferences).

To add items, <button-action>Add</button-action>. Complete the record with the required information.

![alt](/docs/inventory/tracking/pull-form.png)

- Select the type of inventory. More on that [here](/docs/inventory/get-started/overview)
- Select the product
- Enter the quantity
- Select a unit of measure or add a new one. If you are unsure, simple select **Unit**. More on that [here](/docs/inventory/get-started/overview)
- Apply optional tags. More on that [here](/docs/inventory/get-started/overview)

To remove an item, <button-action>the bin icon</button-action>.

You should also enter a brief explanation of the receipt

<button-action>**Save**</button-action>.

Finally, confirm the pull if you are satisfied with the entries, otherwise cancel it.

![alt](/docs/inventory/tracking/pull-confirm.png)
