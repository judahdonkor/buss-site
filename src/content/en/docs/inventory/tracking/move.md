---
label: Move
title: Moving products between stockrooms
description: The Views section describes all you need to know to configure data and views for a specific route in your Nuxt.js Application. Views consist of an app template, a layout, and the actual page.
position: 4
book: tracking
collection: inventory
---

You can move products between stockrooms with the move action.

## Move products

To move products, you can either go to <go-to :path="['Moves']"></go-to> and <button-action>Move</button-action>

![alt](/docs/inventory/tracking/move-new.png)

or go to <go-to :path="['Inventory']"></go-to> and <button-action>Move</button-action>

![alt](/docs/inventory/tracking/move-at-inv.png)

By convention, the Inventory app moves products from the **Backroom** to the **Shop** at the present day. You may change these [preferences](/docs/inventory/preferences).

To add items, <button-action>Add</button-action>. Complete the record with the required information.

![alt](/docs/inventory/tracking/move-form.png)

- Select the type of inventory. More on that [here](/docs/inventory/get-started/overview)
- Select the product
- Enter the quantity
- Select a unit of measure or add a new one. If you are unsure, simple select **Piece**. More on that [here](/docs/inventory/get-started/overview)
- Apply optional tags. More on that [here](/docs/inventory/get-started/overview)

To remove an item, <button-action>the bin icon</button-action>.

You should also enter a brief explanation of the move

<button-action>**Save**</button-action>.

Finally, confirm the move if you are satisfied with the entries, otherwise cancel it.

![alt](/docs/inventory/tracking/move-confirm.png)
