# Assignment 1 – Not Shopify

This Node.js module simulates a basic e-commerce backend system where users can register, log in, browse products, and complete purchases. Admins can manage product inventory, coupons, and analyze sales performance.

All features are accessible through function calls in the terminal. The project supports three user roles: Guest, Customer, and Admin, each with different levels of access.

## Setup Instructions
1. Ensure you have **Node.js installed** on your machine.  
2. Save the module file as  `siayuanen_ecommercestore.js`.  
3. Create a separate `app.js` file to test and interact with the module.
4. Run the app using either: `node app.js` or `nodemon app.js`.

Example `app.js`:
```js
const store = require("./siayuanen_ecommercestore.js");

store.loginAccount("user", "user");
store.viewAllProducts();
store.addToCart(1, 2);
store.suggestCoupons();
store.checkout("SAVE10");
```
> Note: The code above is just a template. You are encouraged to simulate your own shopping flow by using the module’s functions.

>The only requirement is to include the require() statement to import the store module. 

**Have fun shopping!** :3

---
## Feature Summary

This module exposes various functions based on user roles. You can call them directly from `app.js` to simulate store operations. The table below summarizes what each role can access:

| Feature                          | Guest | Customer | Admin |
|----------------------------------|:-----:|:--------:|:-----:|
| Register / Login / Logout       |  ✅   |    ✅    |  ✅   |
| View & Search Products          |  ✅   |    ✅    |  ✅   |
| Add to Cart / Remove Quantity   |       |    ✅    |       |
| Apply / Suggest Coupons         |       |    ✅    |       |
| Checkout                        |       |    ✅    |       |
| Add / Edit / Delete Products    |       |          |  ✅   |
| Manage Coupon Codes             |       |          |  ✅   |
| Sales Performance Summary       |       |          |  ✅   |
| Sales Report by Date Range      |       |          |  ✅   |
| Inventory Risk Report           |       |          |  ✅   |

> Note: The store comes preloaded with users, products, coupons, and sales history for testing purposes. 

> You can immediately test all features without adding new data to the `users`, `products`, `coupons`, or `salesLog` arrays.

## Test User Accounts
To explore the system, you can log in using one of the following test accounts:

- **Admin Account:**  
  `username: admin`  
  `password: admin`  

- **Customer Account 1 (Has an Empty Cart):**  
  `username: user`  
  `password: user`  

- **Customer Account 2 (Has a Pre-filled Cart):**  
  `username: user2`  
  `password: user2`  

> Note: Guests (users who are not logged in) can still view the product catalog and use the search feature.

## Arrays Used
#### `users`

An array of user objects, each includes:
- `username` (string): User’s login name
- `password` (string): User’s login password
- `role` (string): Either "admin" or "customer"
- `cart` (array): List of items in the user's cart (product objects)

#### `products`
An array of product objects, each includes:
- `id` (number): Unique product ID
- `name` (string): Product name
- `price` (number): Unit price
- `stock` (number): Units available in inventory
- `category` (string): Product category
- `salesCount` (number): Total units sold

#### `coupons`
An array of coupon objects, each includes:
- `code` (string): Coupon code (e.g. "SAVE10")
- `discount` (number): Percentage discount (1–100)
- `minAmount` (number): Minimum cart total required to apply the coupon

#### `salesLog`
An array of sales records, each includes:

- `date` (Date): When the order was made
- `user` (string): Username of the buyer
- `items` (array): List of products purchased in that order
- `couponUsed` (string or null): Code used or null
- `total` (number): Final total amount paid after discount



## All Functions

### Guest Functions

&nbsp;&nbsp;&nbsp;`registerAccount(username, password)`
- Creates a new customer account if not logged in and the username is unique and valid.

&nbsp;&nbsp;&nbsp;`loginAccount(username, password)`
- Logs in a user if credentials match and no one is currently logged in.

&nbsp;&nbsp;&nbsp;`logoutAccount()`
- Logs out the current user if someone is logged in.

&nbsp;&nbsp;&nbsp;`viewAllProducts()`
- Displays all products in the catalog with their details. Displays a message if no products are available.

&nbsp;&nbsp;&nbsp;`searchProductsByNameorCategory(keyword)`
- Searches for products by name or category using a case-insensitive keywords. Displays matching results or a message if none are found.



### Admin Functions

&nbsp;&nbsp;&nbsp;`addProduct(name, price, stock, category)`
- Adds a new product to the catalog if all input values are valid.

&nbsp;&nbsp;&nbsp;`editProduct(productId, type, data)`
- Edits the specified product field (name, price, stock, or category) with the new value provided in data.

&nbsp;&nbsp;&nbsp;`deleteProduct(productId)`
- Deletes a product from the catalog if the product ID is valid.

&nbsp;&nbsp;&nbsp;`addCouponCodes(code, discount, minAmount = 0)`
- Adds a new discount coupon and the input values are valid and unique.

&nbsp;&nbsp;&nbsp;`viewAllCoupons()`
- Displays all available coupon codes. Shows a message if no coupons exist.

&nbsp;&nbsp;&nbsp;`getSalesPerformanceProductSummary(limit = 5)`
- Displays the top-selling products based on units sold, limited to the top N results.

&nbsp;&nbsp;&nbsp;`getSalesRecordsByDateRange(start, end)`
- Generates a sales report within a specified date range, showing each order the total orders and revenue.

&nbsp;&nbsp;&nbsp;`getInventoryRiskReport()`
- Analyzes product sales-to-stock ratios to determine risk levels. Outputs a risk score and classification for each product indicating how likely it is to run out.

### Customer Functions
&nbsp;&nbsp;&nbsp;`addToCart(productId, quantity)`
- Adds a product to the customer’s cart or updates its quantity if already exists, provided the input is valid and enough stock is available.

&nbsp;&nbsp;&nbsp;`viewCart()`
- Displays all items in the customer’s cart with their quantities, subtotals, and the grand total.

&nbsp;&nbsp;&nbsp;`checkout(couponCode = "")`
- Processes the customer’s cart if the cart is not empty, applies a valid coupon if provided, updates stock, records the sale, and clears the cart.


&nbsp;&nbsp;&nbsp;`removeQuantityFromCart(productId, quantityToRemove)`
- Removes a specified quantity of a product from the customer’s cart or deletes the item entirely if the quantity is greater than the quantity in the cart.

&nbsp;&nbsp;&nbsp;`suggestCoupons()`
- Evaluates the customer’s cart total and displays applicable coupon codes based on minimum spending requirements of the coupons.

&nbsp;&nbsp;&nbsp;

# References
- https://www.shopify.com/sg
- https://www.amazon.com/
- JavaScript Regular Expressions ( For common function -- `escapeRegex(str)` )       
   https://www.w3schools.com/js/js_regexp.asp
- JavaScript Sorting Arrays   
   https://www.w3schools.com/js/js_array_sort.asp

