console.log("............................");
console.log(".. Starting Up the Store  ..");
console.log(".. Welcome to Not Shopify ..");
console.log("..   *HAPPY SHOPPING*     ..");
console.log("............................");

module.exports = {
    // Store all registered users
    users: [
        {
            username: "admin",
            password: "admin",
            role: "admin",
            cart: []
        },
        {
            username: "user",
            password: "user",
            role: "customer",
            cart: []
        },
        {
            username: "user2",
            password: "user2",
            role: "customer",
            cart: [
                {
                    productId: 1,
                    name: "Milk",
                    price: 2.00,
                    quantity: 3,
                    category: "Beverage"
                },
                {
                    productId: 2,
                    name: "Chicken",
                    price: 12.00,
                    quantity: 1,
                    category: "Meats"
                },
            ]
        }
    ],

    // Store all products here
    products: [
        {
            id: 1,
            name: "Milk",
            price: 2.00,
            stock: 22,
            category: "Beverage",
            salesCount: 18
        },
        {
            id: 2,
            name: "Chicken",
            price: 12.00,
            stock: 22,
            category: "Meats",
            salesCount: 10
        },
        {
            id: 3,
            name: "Bread",
            price: 1.50,
            stock: 3,
            category: "Bakery",
            salesCount: 6
        },
        {
            id: 4,
            name: "Eggs",
            price: 3.20,
            stock: 1,
            category: "Dairy",
            salesCount: 3
        },
        {
            id: 5,
            name: "Toilet Paper",
            price: 5.00,
            stock: 0,
            category: "Household",
            salesCount: 12
        }
    ],

    //stores all coupons
    coupons: [
        {
            code: "SAVE50",
            discount: 50,
            minAmount: 20,
        },
        {
            code: "SAVE10",
            discount: 10,
            minAmount: 10
        },
        {
            code: "SAVE20",
            discount: 20,
            minAmount: 35
        },
    ],

    //stores all saleslog
    salesLog: [
        {
            date: new Date("2024-05-01T10:30:00"),
            user: "user",
            items: [
                { productId: 1, name: "Milk", quantity: 2, price: 2.00, category: "Beverage" },
                { productId: 3, name: "Bread", quantity: 1, price: 1.50, category: "Bakery" }
            ],
            couponUsed: "SAVE50",
            total: 4.50
        },
        {
            date: new Date("2024-05-02T14:10:00"),
            user: "user2",
            items: [
                { productId: 2, name: "Chicken", quantity: 1, price: 12.00, category: "Meats" },
                { productId: 4, name: "Eggs", quantity: 2, price: 3.20, category: "Dairy" }
            ],
            couponUsed: null,
            total: 18.40
        },
        {
            date: new Date("2024-05-03T09:00:00"),
            user: "user",
            items: [
                { productId: 5, name: "Toilet Paper", quantity: 3, price: 5.00, category: "Household" }
            ],
            couponUsed: "SAVE50",
            total: 12.50
        },
        {
            date: new Date("2024-05-05T18:45:00"),
            user: "user2",
            items: [
                { productId: 1, name: "Milk", quantity: 1, price: 2.00, category: "Beverage" },
                { productId: 3, name: "Bread", quantity: 2, price: 1.50, category: "Bakery" }
            ],
            couponUsed: null,
            total: 5.00
        }
    ],

    //.....................
    //Common functions used
    //....................
    checkAdmin() {
        if (this.currentUser === null || this.currentUser.role !== "admin") {
            console.log("\nAccess denied. Only admin can use this function.");
            return false;
        }

        return true;
    },
    checkIntegerInput(number) {
        if (typeof number !== "number" || number < 0 || !Number.isInteger(number)) {
            console.log("\nInvalid number. Please enter a non-negative whole number.");
            return false;
        }
        return true;
    },
    checkLoggedIn() {
        if (this.currentUser !== null) {
            console.log("\nYou are already logged in. Log out before doing this action.");
            return false;
        }
        return true;
    },
    escapeRegex(str) {
        return str.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    },
    //.....................................

    // Track current logged-in user
    currentUser: null,

    //..............
    //Everyone
    //..............

    //1. Registers a new customer account.
    registerAccount(username, password) {
        // Prevent registration if someone is already logged in
        if (!this.checkLoggedIn()) {
            return;
        }

        // Validate input
        if (typeof username !== "string" || typeof password !== "string") {
            console.log("Username and password must be text.");
            return;
        }

        // Validate input
        if (!username || !password || username.trim() == "" || password.trim() == "") {
            console.log("Username and password cannot be empty.");
            return;
        }

        // Check if username already exists
        const exists = this.users.some(u => u.username === username);

        if (exists) {
            console.log("Please try again, name already exists.");
            return;
        }

        // Add new user if username is unique
        this.users.push({
            username,
            password,
            role: "customer",
            cart: []
        });

        console.log("\nCustomer account created successfully.");
    },

    //2. Logs in an existing user using username and password.
    loginAccount(username, password) {
        // Prevent login if someone is already logged in
        if (!this.checkLoggedIn()) {
            return;
        }

        // Find matching user
        const matchedUser = this.users.find(user => user.username === username && user.password === password);

        if (matchedUser) {
            this.currentUser = matchedUser;
            console.log(`\nLogin successful. Welcome, ${matchedUser.role} ${matchedUser.username}!`);
        }
        
        else {
            console.log("\nInvalid username or password.");
        }
    },

    //3. Logs out the currently logged-in user.
    logoutAccount() {
        // If someone is logged in, log them out and reset session
        if (this.currentUser) {
            console.log("\n" + this.currentUser.username + " has been logged out.");
            this.currentUser = null;
        }
        // If no one is logged in
        else {
            console.log("\nNo user is currently logged in.");
        }
    },

    //4. Displays all products in the catalog.
    viewAllProducts() {
        // Handle case where there are no products
        if (this.products.length == 0) {
            console.log("No Produts Available.");
            return;
        }

        console.log("\n=== Product Catalog ===");
        console.log("------------------------");
        for (let i = 0; i < this.products.length; i++) {
            const product = this.products[i];
            console.log(`ID: ${product.id}`);
            console.log(`Name: ${product.name}`);
            console.log(`Price: $${product.price.toFixed(2)}`);
            console.log(`Quantity Of Stock: ${product.stock}`);
            console.log(`Category: ${product.category}`);
            console.log("------------------------");
        }
    },

    //5. Searches products by name or category.
    searchProductsByNameorCategory(keyword) {
        // Validate input
        if (typeof keyword !== "string" || keyword.trim() == "") {
            console.log("\nInvalid keyword. Please enter a valid search term.");
            return;
        }

        // Remve unwanted special character
        const safeKeyword = this.escapeRegex(keyword);
        const searchTerm = safeKeyword.trim().toLowerCase();

        // Filter products by name or category
        const results = this.products.filter(product => product.name.toLowerCase().includes(searchTerm) || product.category.toLowerCase().includes(searchTerm));

        console.log(`\n=== Search Results for "${keyword}" (Name or Category) ===`);

        if (results.length == 0) {
            console.log("No products matched your search.");
            return;
        }

        // Display matched products
        for (let i = 0; i < results.length; i++) {
            const product = results[i];
            console.log(`ID: ${product.id}`);
            console.log(`Name: ${product.name}`);
            console.log(`Price: $${product.price.toFixed(2)}`);
            console.log(`Stock: ${product.stock}`);
            console.log(`Category: ${product.category}`);
            console.log("------------------------");
        }
    },


    //..............
    //Admin Roles
    //..............

    //6. Adds a new product to the catalog (admin-only).
    addProduct(name, price, stock, category) {
        // Ensure only admins can perform this action
        if (!this.checkAdmin()) {
            return;
        }

        // Validate correct data types for all inputs
        if (typeof name != "string" || typeof category != "string" || typeof price !== "number" || typeof stock !== "number") {
            console.log("\nInvalid data types:");
            console.log("- Name and Category must be strings.");
            console.log("- Price and Stock must be numbers.");
            return;
        }

        // Validate that name and category are not empty strings
        if (name.trim() == "" || category.trim() == "") {
            console.log("\nProduct name and category cannot be empty.");
            return;
        }

        // Check price and stock values for validity
        if (price <= 0 || !Number.isInteger(stock) || stock < 0) {
            console.log("\nInvalid values: Price must be greater than 0. Stock must be a non-negative whole number.");
            return;
        }

        // Create new product object and add to catalog
        const newProduct = {
            id: this.products.length + 1,
            name: name,
            price: price,
            stock: stock,
            category: category,
            salesCount: 0
        };

        this.products.push(newProduct);
        console.log("\nProduct Successfully added.");

    },

    //7. Edits product details (admin-only).
    editProduct(productId, type, data) {
        // Only admins can edit products
        if (!this.checkAdmin()) {
            return;
        }
        // Validate that productId is a valid integer
        if (!this.checkIntegerInput(productId)) {
            return;
        }

        const product = this.products.find(prdt => prdt.id === productId);

        if (!product) {
            console.log("\nProduct not found. Cannot edit.");
            return;
        }

        switch (type) {
            case "name":
                if (typeof data !== "string" || data.trim() == "") {
                    console.log("\nInvalid name. Must be in string.");
                    return;
                }
                product.name = data.trim(); // updated name
                console.log(`\nProduct ID ${product.id} name successfully updated to '${product.name}'.`);
                break;

            case "price":
                if (typeof data !== "number" || data <= 0) {
                    console.log("\nInvalid price. Must be either integer or float.");
                    return;
                }
                product.price = data; // updated price
                console.log(`\nProduct ID ${product.id} price successfully updated to '$${data.toFixed(2)}'.`);
                break;

            case "stock":
                if (!this.checkIntegerInput(data)) {
                    return;
                }
                product.stock = data; // updated stock qty
                console.log(`\nProduct ID ${product.id} stock successfully updated to ${data}.`);
                break;

            case "category":
                if (typeof data !== "string" || data.trim() == "") {
                    console.log("\nInvalid category. Must be in string.");
                    return;
                }
                product.category = data.trim(); // updated stock category
                console.log(`\nProduct ID ${product.id} category successfully updated to '${data}'.`);
                break;

            default:
                console.log("\nInvalid field type. Must be 'name', 'price', 'stock', or 'category'.");

            return
        }
    },

    //8. Deletes a product from the catalog by its ID (admin-only).
    deleteProduct(productId) {
        // Ensure only admins can perform this action
        if (!this.checkAdmin()) {
            return;
        }

        // Validate product ID input
        if (!this.checkIntegerInput(productId)) {
            return;
        }
        
        const products = this.products;
        const index = this.products.findIndex(prdt => prdt.id === productId);

        if (index == -1) {
            console.log("\nProduct not found. Cannot delete.");
            return;
        }

    
        console.log(`\nProduct '${products[index].name}' (ID: ${products[index].id}) has been deleted.`);
        products.splice(index, 1);
    },

    //9. Adds a new discount coupon code (admin-only).
    addCouponCodes(code, discount, minAmount = 0) {
        // Ensure only admins can add coupons
        if (!this.checkAdmin()) {
            return;
        }

        // Validate coupon code
        if (typeof code !== "string" || code.trim() == "") {
            console.log("\nInvalid coupon code. Must be in String");
            return;
        }

        // Validate discount range (must be 1–100)
        if (typeof discount !== "number" || discount <= 0 || discount > 100) {
            console.log("\nInvalid discount. Must be between 1 and 100.");
            return;
        }

        // Validate minimum spending requirement
        if (typeof minAmount !== "number" || minAmount < 0) {
            console.log("\nInvalid minimum amount. Must be in non-negative whole number");
            return;
        }

        // Check if the coupon already exists (case-insensitive)
        const upperCaseCode = code.trim().toUpperCase();

        const existingCoupon = this.coupons.some(cpn => cpn.code === upperCaseCode);
        if (existingCoupon) {
            console.log("\nCoupon code already exists.");
            return;
        }

        // Add coupon
        this.coupons.push({
            code: upperCaseCode,
            discount,
            minAmount
        });

        console.log(`\nCoupon '${upperCaseCode}' added with ${discount}% off (Min. $${minAmount}).`);
    },

    //10. Displays all available coupon codes (admin-only).
    viewAllCoupons() {
        // Ensure only admins can access coupon details
        if (!this.checkAdmin()) {
            return;
        }

        // If no coupons exist
        if (this.coupons.length == 0) {
            console.log("No coupons available.");
            return;
        }

        // Display coupon list
        console.log("\n=== List of Coupons Codes ===");
        for (let i = 0; i < this.coupons.length; i++) {
            const coupon = this.coupons[i];
            console.log(`Code: ${coupon.code}`);
            console.log(`Discount: ${coupon.discount}`);
            console.log(`Minimum Spend: ${coupon.minAmount}`);
            console.log(`--------------------------`);
        }
    },

    //11. Shows top-selling products and sales by category (admin-only).
    getSalesPerformanceProductSummary(limit = 5) {
        if (!this.checkAdmin()) {
            return;
        }

        console.log(`\n=== Top ${limit} Selling Products ===`);

        // Filter and sort sold products
        const sortedProducts  = this.products.sort((a, b) => b.salesCount - a.salesCount);

        if (sortedProducts.length == 0) {
            console.log("No products in the catalog.");
        }

        else {
            const topProducts = sortedProducts.slice(0, limit);
            for (let i = 0; i < topProducts.length; i++) {
                const prdt = topProducts[i];
                console.log(`${i + 1}. ${prdt.name} - ${prdt.salesCount} units sold`);
            }
        }
    },

    //12. Generates a report of sales between two dates (admin-only).
    getSalesRecordsByDateRange(start, end) {
        // Ensure only admins can access
        if (!this.checkAdmin()) {
            return;
        }

        //Convert string dates into Date objects
        const startDate = new Date(start);
        const endDate = new Date(end + "T23:59:59");

        //Check if start date is before end date
        if (startDate > endDate) {
            console.log("\nStart date must be before or equal to end date.");
            return;
        }

        //Validate date format
        if (isNaN(startDate.getTime()) || isNaN(endDate.getTime())) {
            console.log("Invalid date format. Use YYYY-MM-DD.");
            return;
        }

        //Filter sales in the given date range
        const filteredSales = [];
        for (let i = 0; i < this.salesLog.length; i++) {
            const sale = this.salesLog[i];
            const saleDate = new Date(sale.date);

            if (saleDate >= startDate && saleDate <= endDate) {
                filteredSales.push(sale);
            }
        }

        // If no products sold in the range
        if (filteredSales.length == 0) {
            console.log(`\nNo sales between ${start} and ${end}.`);
            return;
        }

        console.log(`\n=== Sales Report from ${start} to ${end} ===`);

        let totalRevenue = 0;

        for (let i = 0; i < filteredSales.length; i++) {
            const sale = filteredSales[i];
            totalRevenue += sale.total;

            //Display order breakdown
            console.log(`\n Order by ${sale.user} on ${new Date(sale.date).toDateString()}`);
            for (let j = 0; j < sale.items.length; j++) {
                const item = sale.items[j];
                console.log(`- ${item.name} x ${item.quantity} -- $${item.price.toFixed(2)}`);
            }
            console.log(`Coupon used: ${sale.couponUsed}`);
            console.log(`Order Total: $${sale.total.toFixed(2)}`);

        }

        console.log(`\nSummary`);
        console.log(`Total Orders: ${filteredSales.length}`);
        console.log(`Total Revenue: $${totalRevenue.toFixed(2)}`);
    },

    //13. Analyzes stock levels and sales data to flag risky products (admin-only).
    getInventoryRiskReport() {
        if (!this.checkAdmin()) {
            return;
        }

        console.log("\n=== Inventory Risk Report ===");

        // Loop through all products in the catalog
        for (let i = 0; i < this.products.length; i++) {
            const product = this.products[i];

            const stock = product.stock;
            const sales = product.salesCount;
            const riskScore = sales / (stock + 1);

            let riskLevel = "Low Risk";

            // Group risk based on score
            if (riskScore > 3) {
                riskLevel = "Critical Risk";
            }

            else if (riskScore >= 1.5) {
                riskLevel = "Moderate Risk";
            }

            // Print out the report line for this product
            console.log(`- ${product.name} | Stock: ${stock} | Sold: ${sales} | Risk Score: ${riskScore.toFixed(2)} → ${riskLevel} To Running Out.`);
        }
    },




    //..............
    //Customers
    //..............

    //14. Adds a product to the logged-in customer's cart or updates it when product already exist in the cart
    addToCart(productId, quantity) {
        // Ensure the user is a logged-in customer
        if (!this.currentUser || this.currentUser.role !== "customer") {
            console.log("\nOnly logged-in customers can add items to cart.");
            return;
        }

        // Validate quantity
        if (!this.checkIntegerInput(quantity) || quantity <= 0) {
            console.log("\nQuantity must be a positive whole number greater than zero.");
            return;
        }

        // Find the product
        const product = this.products.find(prdt => prdt.id === productId);

        if (!product) {
            console.log("\nProduct not found.");
            return;
        }

        // Find existing item and its quantity
        const cart = this.currentUser.cart;
        const existingItem = cart.find(item => item.productId === productId);

        
        let existingQty = 0;
        // Check if the product already exists in the cart
        // if it does retrive item's quantity otherwise existingQty stays at zero
        if (existingItem) {
            existingQty = existingItem.quantity;
        }

        // Check available stock
        const totalAddedQuantity = existingQty + quantity;
        if (totalAddedQuantity > product.stock) {
            const available = product.stock - existingQty;
            console.log(`\nCannot add that much. Only ${available} more available to add.`);
            return;
        }

        // Update cart quantity
        if (existingItem) {
            existingItem.quantity += quantity;
        }
        // Add to array
        else {
            cart.push({
                productId: product.id,
                name: product.name,
                price: product.price,
                quantity: quantity,
                category: product.category
            });
        }

        console.log(`\n${quantity} x ${product.name} added to cart successfully.`);
    },

    //15. Displays the contents of the logged-in customer's shopping cart.
    viewCart() {
        // Check if user is logged in and is customer
        if (!this.currentUser || this.currentUser.role !== "customer") {
            console.log("\nOnly logged-in customers can add items to cart.");
            return;
        }

        // Check if cart is empty
        if (this.currentUser.cart.length == 0) {
            console.log("\nYour cart is empty.");
            return;
        }

        console.log("\n=== Your Shopping Cart ===");
        let grandTotal = 0;

        // Loop through each item in the cart and display details
        for (let i = 0; i < this.currentUser.cart.length; i++) {
            const item = this.currentUser.cart[i];
            const subtotal = item.price * item.quantity;
            grandTotal += subtotal;

            console.log(`Product id: ${item.productId}`)
            console.log(`Product: ${item.name}`);
            console.log(`Quantity: ${item.quantity}`);
            console.log(`Price per unit: $${item.price.toFixed(2)}`);
            console.log(`Subtotal: $${subtotal.toFixed(2)}`);
            console.log("-------------------------");
        }
        console.log(`Grand Total: $${grandTotal.toFixed(2)}`);
    },

    //16. Processes the checkout for the logged-in customer.
    checkout(couponCode = "") {
        // Check if user is logged in and is customer
        if (!this.currentUser || this.currentUser.role !== "customer") {
            console.log("\nOnly logged-in customers can checkout.");
            return;
        }

        if (typeof couponCode !== "string") {
            console.log("\nCoupon code must be a string.");
            return;
        }

        // Check if cart is empty
        if (this.currentUser.cart.length == 0) {
            console.log("\nYour cart is empty.");
            return;
        }

        console.log("\n=== Checkout Receipt ===");
        let subtotal = 0;

        // Calculate subtotal and deduct stock by looping through the cart
        for (let i = 0; i < this.currentUser.cart.length; i++) {
            const item = this.currentUser.cart[i];
            const itemTotal = item.price * item.quantity;
            subtotal += itemTotal;

            console.log(`${item.quantity} x ${item.name} @ $${item.price.toFixed(2)} = $${itemTotal.toFixed(2)}`);

            // Reduce product stock and add sale count of bought product
            const product = this.products.find(prdt => prdt.id === item.productId);
            if (product) {
                product.stock -= item.quantity;
                product.salesCount += item.quantity;
            }
        }

        console.log(`\nSubtotal: $${subtotal.toFixed(2)}`);

        // Apply coupon if provided
        let discount = 0;
        let matchedCoupon = null;
        const trimmedCode = couponCode.trim().toUpperCase();

        let couponUsed = null;

        // Check if coupon is valid and applicable
        if (trimmedCode !== "") {
            matchedCoupon = this.coupons.find(cpn => cpn.code === trimmedCode);
            if (!matchedCoupon) {
                console.log(`Invalid coupon code: ${couponCode}`);
                return;
            }

            if (subtotal < matchedCoupon.minAmount) {
                console.log(`Coupon requires minimum spend of $${matchedCoupon.minAmount.toFixed(2)}.`); 
                return;
            }

            discount = subtotal * (matchedCoupon.discount / 100);
            console.log(`Coupon Applied: ${matchedCoupon.code} (${matchedCoupon.discount}% OFF)`);

            couponUsed = matchedCoupon.code;
        }

        // Display totals
        const total = subtotal - discount;
        console.log(`Discount: -$${discount.toFixed(2)}`);
        console.log(`Total to Pay: $${total.toFixed(2)}`);
        console.log("\nThank you for your purchase!");

        // Log the sale into salesLog
        this.salesLog.push({
            date: new Date(),
            user: this.currentUser.username,
            items: this.currentUser.cart.map(item => ({
                productId: item.productId,
                name: item.name,
                quantity: item.quantity,
                price: item.price,
                category: item.category

            })),
            couponUsed: couponUsed,
            total: total
        });

        // Clear cart
        this.currentUser.cart = [];
    },

    //17. Removes a specified quantity of a product from the customer's cart.
    removeQuantityFromCart(productId, quantityToRemove) {
        // Check if user is logged in and is customer
        if (!this.currentUser || this.currentUser.role !== "customer") {
            console.log("\nOnly logged-in customers can remove quantities from cart.");
            return;
        }

        // Validate quantityToRemove input
        if (!this.checkIntegerInput(productId) || !this.checkIntegerInput(quantityToRemove) || quantityToRemove == 0) {
            console.log("\nQuantity to remove must be a positive whole number.");
            return;
        }

        const cart = this.currentUser.cart;
        const index = cart.findIndex(item => item.productId === productId);

        if (index == -1) {
            console.log(`\nProduct with ID '${productId}' was not found in your cart.`);
            return;
        }

        // Removed all quantity of the item
        if (quantityToRemove >= cart[index].quantity) {
            console.log(`\nRemoved all of '${cart[index].name}' from your cart.`);
            cart.splice(index, 1);
        }

        // Updated the existing quantity
        else {
            cart[index].quantity -= quantityToRemove;
            console.log(`\nRemoved ${quantityToRemove} from '${cart[index].name}'. New quantity: ${cart[index].quantity}`);
        }

    },

    //18. Recommends applicable coupon codes based on the customer's current cart total.
    suggestCoupons() {
        //Check user is logged in and a customer
        if (!this.currentUser || this.currentUser.role !== "customer") {
            console.log("\nOnly logged-in customers can receive coupon suggestions.");
            return;
        }

        // Check if cart is empty
        if (this.currentUser.cart.length == 0) {
            console.log("\nYour cart is empty. Add items to get coupon suggestions.");
            return;
        }

        //Calculate cart total
        let total = 0;
        for (let i = 0; i < this.currentUser.cart.length; i++) {
            const item = this.currentUser.cart[i];
            total += item.price * item.quantity;
        }
        console.log(`\nYour current cart total is $${total.toFixed(2)}.`);

        // Filter out and collect the coupons that cart total >= minimum amount
        const validCoupons = this.coupons.filter(coupon => total >= coupon.minAmount);

        if (validCoupons.length == 0) {
            console.log("No coupons apply to your current cart total.");
            return;
        }

        console.log("Based on your cart, you can use the following coupon(s):");
        for (let i = 0; i < validCoupons.length; i++) {
            const cpn = validCoupons[i];
            console.log(`- Code: ${cpn.code} | ${cpn.discount}% off (Min: $${cpn.minAmount})`);
        }

    }

}