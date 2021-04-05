---
label: Stockrooms
title: Organize your products in stockrooms
description: Stockrooms are the locations where you put away your products.
position: 3
book: get-started
collection: inventory
---

Stockrooms are the locations where you put away your products. You should arrange your stockrooms in such a way that it reveals the order of compartments in your warehouse.

<!-- ![Stockroom hierarchy example](/docs/inventory/get-started/sc.jpg) -->

The Inventory app provides an initial arrangement with **Master** being the root compartment. The immediate stockrooms within the **Master** are:

- The **Backroom**, where items received are put away. All products meant for storage should be kept within this stockroom.
- Products that are meant for sale should be kept in the **Shop**.
- Products that should be returned to the supplier are kept in **Return**
- Products sold but not yet received by customers shall be kept at **Delivery** or **Pickup** depending on the situation
- Products that have gone bad should be kept at **Expired**
- Products you've purchased but have yet to receive are kept in **Pipeline**

## Create a stockroom

To create a stockroom, you should go to <go-to :path="['Stockrooms']"></go-to> and <button-action>New Stockroom</button-action>

![Stockroom new](/docs/inventory/get-started/stockroom-new.png)

Enter the name of your stockroom

Select an existing stockroom or New Stockroom to create yet another stockroom as the parent compartment

![Stockroom form](/docs/inventory/get-started/stockroom-form.png)

Finally, <button-action>Save</button-action> to create the stockroom
