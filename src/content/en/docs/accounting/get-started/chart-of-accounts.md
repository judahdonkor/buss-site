---
label: Chart of Accounts
title: Chart of Accounts
description: Products are the goods to be organized and tracked by the inventory app.
position: 2
book: get-started
collection: accounting
---

The chart of accounts is a listing of all accounts used in the general ledger of your business. It is quite important to initially create your chart of accounts before you record any financial activity. As most of these accounts have already been created on your behalf, you may simply go through them and make the neccessary changes or additions.

## Create an account

To create an account, you can either go to <go-to :path="['Chart of Accounts']"></go-to>
and <button-action>New Account</button-action>

![New Account at Chart of Accounts](/docs/inventory/get-started/product-new.png)

or select New Account in any account selector

![New Product on account selector](/docs/inventory/get-started/product-selector.png)

Enter the account's name and code if your reqire it. Check out [*Naming accounts*](#naming-accounts) on how to use the right name.

Select an account classification or New Classification. More on product classifcation [here](#classifying-accounts).

Select the business activity. More on business activities [here](#branding-products)

Decide whether to allow the account's balance to run into negative or not by flicking the "Run account into deficit" switch.

![Account form](/docs/inventory/get-started/product-form.png)

Finally, <button-action>Save</button-action> to save the account.

### Naming products

You may follow any convention when naming accounts. However you must be concious of the following:

- The name you choose shall appear as is in the financial statements
- You can use any format for the codes. They shall not show up in the financial statements
- You may change them at any time and the change shall take effect in the entire app

## Classifying accounts

Account Classifications dictate the structure of your financial reports. You may use any convention as long as the following requirements are adhered to:

- Avoid classifying assets as current/non-current as many of the items (as defined in US GAAP XBRL) can be either current or non-current. You may use the structure provided as the clasifications have particular recognition and measurement requirements. Example, we use "Property, Plant, and Equipment" as one class because all assets in this classification may undergo depreciation.
- Prefer classifying expenses by nature as opposed function as this classfication scheme is much more workable. For example, take payroll. It is preferable  to have a single account for “factory workers" where all payroll costs for factory workers are recognized during the period. At the end of the period, this account is  included (i.e. by profit or cost center) into Cost of sales as those expenses are directly involved in sales.

### Create an account classification

To create a new classification, you should select New Classification in an account classification selector when creating a product

![Account classification selector](/docs/inventory/get-started/product-class-selector.png)

Enter the name of your classification.

Select an existing classification as the parent or select New Classification to create yet another classification to use as the parent.

![Account classification form](/docs/inventory/get-started/product-class-form.png)

Finally, <button-action>Save</button-action> to save your classification.

## Business activities

Business activities include any activity a business engages in for the primary purpose of making a profit. They include the following:

- Operating activities which relate directly to the business providing its goods to the market, including manufacturing, distributing, marketing, and selling; they provide most of the company's cash flow and hugely influence its profitability.
- Investing activities which relate to the long-term use of cash, such as buying or selling a property or piece of equipment, or gains and losses from investments in financial markets and operating subsidiaries.
- Financing activities which include sources of cash from investors or banks, and the uses of cash paid to shareholders, such as payment of dividends or stock repurchases, and the repayment of loans.

We have further broken down operating activities into the following:

- Direct operating activities which include the direct cost and revenue of doing business. These cost can be directly traced through to the products sold or services provided. These expenses may be labeled cost of goods sold, or cost of services on the income statement depending on the type of business.
- Fixed Indirect operating activities which cannot be directly traced bach to the production of goods or provision of services. Expamples include rent, salaries, accounting etc. These expenses tend to remain the same over multiple periods.
- Variable indirect operating activities which loosely correlate to sales. Examples are advertising costs, commissions, etc.
