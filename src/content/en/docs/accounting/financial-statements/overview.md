---
title: Tracking your products
label: Overview
description: The context provides *additional* and often optional information about the current request to the application.
position: 1
book: tracking
collection: accounting
---

Organizing and tracking products in your stockrooms can become daunting if done by hand. The **Inventory** app addresses this pain point by doing the organization and tracking on your behalf.

## Recording your tracks

The Inventory app needs information about your operations in order to do the organization and tracking. You may provide this information using the following actions.

- The **Receive** action is used to record the receipt of products in your stockroom. You can learn more about this action [here](/docs/inventory/tracking/receive).
- The **Pull** action lets you take out or pull products from your stockroom. You can learn more about this action [here](/docs/inventory/tracking/pull).
- The **Move** action is a compound action that lets you move products between two stockrooms by way of a **Pull** and **Receive** action. You can learn more about this action [here](/docs/inventory/tracking/move).

## Where are my products stored?

Go to <go-to :path="['Inventory']"></go-to> to see where your products are stored.

### Aggregate

You may <button-action>Aggregate</button-action> to see your products arranged according to the initial order provided by the **Inventory** app. You can check the total cost and quantity of items in the principal stockrooms.

![alt](/docs/inventory/get-started/stockroom-inv-agg.png)

### Products within a stockroom

You may also <button-action>Products</button-action> and select a stockroom to see the cost and quantity of products inside the stockroom.

![alt](/docs/inventory/get-started/stockroom-inv.png)
