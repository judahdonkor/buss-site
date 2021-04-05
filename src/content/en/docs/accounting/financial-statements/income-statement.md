---
label: Receive
title: Receiving products in stockrooms
description: Server-side rendering (SSR), is the ability of an application to contribute by displaying the web-page on the server instead of rendering it in the browser.
position: 2
book: tracking
collection: accounting
---

Whenever you've got new products coming in, you should to record the receipts with the receive action.

## Receive products

To receive products, you can either go to <go-to :path="['Receipts']"></go-to> and <button-action>Receive</button-action>

![alt](/docs/inventory/tracking/receive-new.png)

or go to <go-to :path="['Inventory']"></go-to> and <button-action>Receive</button-action>

![alt](/docs/inventory/tracking/receive-at-inv.png)

By convention, the Inventory app receives all products to the **Backroom** at the present day while increasing the balance of your **Accrued Liabilities**. You may change these [preferences](/docs/inventory/preferences).

To add items, <button-action>Add</button-action>. Complete the record with the required information.

![alt](/docs/inventory/tracking/receive-form.png)

- Select the type of inventory. More on that [here](/docs/inventory/get-started/overview)
- Select a product or [create](/docs/inventory/get-started/product) a new product.
- Enter the quantity
- Select a unit of measure or add a new one. If you are unsure, simple select **Unit**. More on that [here](/docs/inventory/get-started/overview)
- Enter the cost of each item
- Apply optional tags. More on that [here](/docs/inventory/get-started/overview)

To remove an item, <button-action>the bin icon</button-action>

You should also enter a brief explanation of the receipt

<button-action>**Save**</button-action>.

Finally, confirm the receipt if you are satisfied with the entries, otherwise cancel it.

![alt](/docs/inventory/tracking/receive-confirm.png)
