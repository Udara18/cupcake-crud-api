# Cupcake Ordering API
- Introduction
This is a simple Node.js API for managing a cupcake shop's inventory, customer data, and orders. The API is built using Express.js and provides endpoints for managing cupcakes, customers, and orders. The data is stored in temporary arrays, simulating a database.

- Table of Contents
Introduction
Installation
Usage
API Endpoints
Cupcakes
Customers
Orders
Validation
Dependencies
Installation
To install and run this project locally, follow these steps:

- Clone this repository:
```bash
Copy code
git clone https://github.com/Udara18/cupcake-crud-api.git
```
- Navigate into the project directory:
```bash
Copy code
cd cupcake-ordering-api
```
- Install the required dependencies:
```bash
Copy code
npm install
```
- Start the server:
```bash
Copy code
npm start
```
- Usage
After starting the server, you can interact with the API using tools like Postman or curl. The server will be running on http://localhost:3010 by default.

<h3> API Endpoints</h3>

# Cupcakes

- GET /api/all-cupcakes
Retrieve all cupcakes in the inventory.

- POST /api/add-new-cupcake
Add a new cupcake to the inventory.

Request Body:
json
Copy code

{
  "item_name": "Strawberry Delight",
  "flavor": "strawberry",
  "price": 120.00
}
- POST /api/update-cupcake/:cakeID
Update the details of an existing cupcake.

Request Body:
json
Copy code
```{```
 ``` "item_name": "Updated Cupcake Name",```
 ``` "flavor": "updated flavor",```
 ``` "price": 150.00```
```} ```

- DELETE /api/delete-cupcake/:cakeID
Remove a cupcake from the inventory.

# Customers
- GET /api/all-customers
Retrieve all customer data.

- POST /api/add-new-customer
Add a new customer.

Request Body:
json
Copy code
```{```
 ``` "name": "John Doe",```
 ``` "contact": "0761234567",```
  ```"gender": "male"```
```}```

# Orders

POST /api/create-new-order
Create a new order.

Request Body:
json
Copy code
{
  "customer_id": 1,
  "cake_id": 2,
  "date": "2024-08-10",
  "quentity": 3
}
- GET /api/all-orders-for-selected-customer/:customerID
Retrieve all orders for a specific customer.

- GET /api/filter-order-by-qty
Filter orders by quantity.

- GET /api/top-five-customers
Retrieve the top five customers by total sales.

- GET /api/highest-value-order/:customerID
Retrieve the highest value order for a specific customer.

# Validation
The API uses Joi for request body validation. Each endpoint has its own validation schema to ensure that the incoming data is properly structured.

Cupcake Validation
item_name: string, required, minimum 3 characters
flavor: required
price: required
Customer Validation
name: string, required, minimum 3 characters
contact: string, required, minimum 9 characters
gender: required
Order Validation
customer_id: required
cake_id: required
date: string, required, minimum 9 characters
quentity: required
Dependencies
Express.js
Joi
