const express = require('express');
const Joi = require('joi');
const app = express();
app.use(express.json());
//===========================================================================================

//---------- arrays (temperary database) ----------------------
const cupcakes = [
    {
        "cake_id": 1,
        "item_name" : "Chocolate Delight",
        "flavor" : "chocolate",
        "price" : 100.00
    },
    {
        "cake_id": 2,
        "item_name" : "vanila Delight",
        "flavor" : "vanila",
        "price" : 105.00
    }
];

const customers = [
    {
        "customer_id" : 1,
        "name" : "kamal",
        "contact" : "0760000000",
        "gender" : "male"
    },
    {
        "customer_id" : 2,
        "name" : "nomal",
        "contact" : "0760000001",
        "gender" : "male"
    }
];

const orders = [
    {
        "order_id": 1,
        "customer_id" : 1,
        "cake_id" : 2,
        "date" : "2024-08-09",
        "quentity" : 3,
        "total_amount" : 210
    },
    {
        "order_id": 2,
        "customer_id" : 2,
        "cake_id" : 1,
        "date" : "2024-08-09",
        "quentity" : 5,
        "total_amount" : 500
    }
];

//--------------------------------------------------------------

//---------------------API end ponts ---------------------------
app.get("/",(req,res)=>{
    res.send('hi welcome to cupcakes world');
});

app.get("/api/all-cupcakes",(req,res)=>{
    res.send(
        {
            "success":true,
            "statusCode":200,
            "message":"all cupcake data retrived..!!!",
            "data": cupcakes
        }
    )
});

app.post("/api/add-new-cupcake",(req,res)=>{
    const {error} = validatecupcake(req.body);
    if(error){
        return res.send(
            {
                "success":false,
                "statusCode":400,
                "massage":"something went wrong !!!",
                "data": error.details[0].message
            }
        )
    }

    const newCupcakeID = cupcakes.sort((a,b)=>b.cake_id-a.cake_id)[0].cake_id+1;

    const newCakeitem = {
        "cake_id": newCupcakeID,
        "item_name" : req.body.item_name,
        "flavor" : req.body.flavor,
        "price" : req.body.price
    }

    cupcakes.push(newCakeitem);
    if(newCakeitem){
        res.send(
            {
                "success":true,
                "statusCode":201,
                "message":"your entered cup cake was added...!",
                "data": newCakeitem
            }
        )
    }else{
        res.send(
            {
                "success":false,
                "statusCode":404,
                "message":"your entered cup cake was rejected...!"
            }
        )
    }
});

app.post("/api/update-cupcake/:cakeID",(req,res)=>{
    const {error} = validatecupcake(req.body);
    if(error){
        return res.send(
            {
                "success":false,
                "statusCode":400,
                "massage":"something went wrong !!!",
                "data": error.details[0].message
            }
        )
    }

    const cakeID = parseInt(req.params.cakeID);
    const cakeItem = cupcakes.find((item)=>item.cake_id===cakeID);

    if(!cakeItem){
        return res.send(
            {
                "success":false,
                "statusCode":404,
                "massage":"you entered id : "+cakeID+"is not found",
            }
        )
    }
    if(req.body.item_name){
        cakeItem.item_name = req.body.item_name;
    }
    if(req.body.flavor){
        cakeItem.flavor = req.body.flavor;
    }
    if(req.body.price){
        cakeItem.price = req.body.price;
    }

    return res.send(
        {
            "success":false,
                "statusCode":204,
                "massage":"your entered id"+cakeID+"related item is updated",
                "data": cakeItem
        }
    )


});

app.delete("/api/delete-cupcake/:cakeID",(req,res)=>{
    const cakeID = parseInt(req.params.cakeID);
    const cakeItem = cupcakes.find((item)=>item.cake_id===cakeID);
    if(!cakeItem){
        return res.send(
            {
                "success":false,
                "statusCode":404,
                "massage":"requested cupcake for id: "+cakeID+"is not found!"
            }

        )
    }
    const itemIndex = cupcakes.indexOf(cakeItem);
    cupcakes.splice(itemIndex);

    return res.send(
        {
            "success":true,
            "statusCode":200,
            "massage":"cupcake for id: "+cakeID+"removed succesfully!",
            "data": cakeItem.item_name
        }

    )
});

app.get("/api/all-customers",(req,res)=>{
    res.send(
        {
            "success":true,
            "statusCode":200,
            "message":"all customer data retrived..!!!",
            "data": customers
        }
    )
});

app.post("/api/add-new-customer",(req,res)=>{

    const {error} = validatecustomer(req.body);
    if(error){
        return res.send(
            {
                "success":false,
                "statusCode":400,
                "massage":"something went wrong !!!",
                "data": error.details[0].message
            }
        )
    }

    const newCustomerID = customers.sort((a,b)=>b.customer_id-a.customer_id)[0].customer_id+1;

    const newCustomer = {
        "customer_id": newCustomerID,
        "name" : req.body.name,
        "contact" : req.body.contact,
        "gender" : req.body.gender
    }

    customers.push(newCustomer);
    if(newCustomer){
        res.send(
            {
                "success":true,
                "statusCode":201,
                "message":"your entered customer was added...!",
                "data": newCustomer
            }
        )
    }else{
        res.send(
            {
                "success":false,
                "statusCode":404,
                "message":"your entered customer was rejected...!"
            }
        )
    }
});

app.post("/api/create-new-order",(req,res)=>{
    const {error} = validateOrder(req.body);
    if(error){
        return res.send(
            {
                "success":false,
                "statusCode":400,
                "massage":"something went wrong !!!",
                "data": error.details[0].message
            }
        )
    }

    const customerID = parseInt(req.body.customer_id);
    const customer_find = customers.find((s)=>s.customer_id===customerID);
    const newOrderID = orders.sort((a,b)=>b.customer_id-a.customer_id)[0].customer_id+1;
    const newOrderqty = parseInt(req.body.quentity);
    const orderItemID = parseInt(req.body.cake_id);
    const orderItem = cupcakes.find((s)=>s.cake_id===orderItemID);
    const totalAmount = orderItem.price*newOrderqty;

    if(customer_find){
        const newOrder = {
            "order_id" : newOrderID,
            "customer_id" : req.body.customer_id,
            "cake_id" : req.body.cake_id,
            "date" : req.body.date,
            "quentity" : req.body.quentity,
            "total_amount" : totalAmount
        }
        orders.push(newOrder);
    
        if(newOrder){
            return res.send(
                {
                    "success":true,
                    "statusCode":201,
                    "message":"your your order is succesfull...!",
                    "data": newOrder
                }
            )
        }else{
            return res.send(
                {
                    "success":false,
                    "statusCode":404,
                    "message":"your order was rejected...!"
                }
            )
        }
    }else{
        return res.send(
            {
                "success":false,
                "statusCode":404,
                "message":"your order was rejected there is no customer to match this id:.."+customerID
            }
        )
    }


    
});

app.get("/api/all-orders-for-selected-customer/:customerID",(req,res)=>{
    const customerID = parseInt(req.params.customerID);
    const ordersOfCustomer = orders.filter((s)=>s.customer_id===customerID);
    if(ordersOfCustomer.length===0){
        return res.send(
            {
            "success":false,
            "statusCode":404,
            "massage":"This customer id: "+customerID+"_don't have any orders",
            }
        )
    }else{
        res.send(
            {
                "success":true,
                "statusCode":200,
                "massage":"requested all orders for id: "+customerID+"is found",
                "data": ordersOfCustomer
    
            }
        )
    }

});

app.get("/api/filter-order-by-qty",(req,res)=>{
    const quentity = parseInt(req.body.more_than);
    const filteredOrders = orders.filter((o)=>o.quentity>=quentity);

    if(filteredOrders.length===0){
        return res.send(
            {
            "success":false,
            "statusCode":404,
            "massage":"No any orders more than_"+quentity,
            }
        )
    }else{
        res.send(
            {
                "success":true,
                "statusCode":200,
                "massage":"here the orders more than "+quentity+"quentity",
                "data": filteredOrders
    
            }
        )
    }
});

app.get("/api/top-five-customers",(req,res)=>{

    const customerSales = orders.reduce((acc, order) => {
        if (!acc[order.customer_id]) {
            acc[order.customer_id] = {
                customer_id: order.customer_id,
                total_sales: 0
            };
        }
        acc[order.customer_id].total_sales += order.total_amount;
        return acc;
    }, {});

    const salesArray = Object.values(customerSales);
    const sortedArray = salesArray.sort((a,b)=>b.total_sales-a.total_sales);
    const topFive = sortedArray.slice(0,5);

    res.send({
        "success":true,
        "statusCode":200,
        "massage":"here are the top five costomers",
        "data": topFive
    })
});

app.get("/api/highest-value-order/:customerID",(req,res)=>{
    const customerId = parseInt(req.params.customerID);

    const orders_match_to_id = orders.filter((o) => o.customer_id === customerId);

    if (orders_match_to_id.length === 0) {
        return res.status(404).send({
            "success" : false,
            "statusCode" : 404,
            "message" : "No orders found for customer " + customerId
        });
    }

    const highestOrder = orders_match_to_id.reduce((acc, order) => {
        return acc.total_amount > order.total_amount ? acc : order;
    });

    return res.send({
        "success" : true,
        "statusCode" : 200,
        "message" : "Here is the highest order for customer " + customerId,
        "data" : highestOrder
    });
});

//-----------------------------------------------------------------


//---------------------------validation funtion -------------------
const validatecupcake = (cupcake)=>{
    const schema = Joi.object({
        item_name : Joi.string().min(3).required(),
        flavor : Joi.required(),
        price : Joi.required()
    });

    const validation = schema.validate(cupcake);

    return validation;
}

const validatecustomer = (customer)=>{
    const schema = Joi.object({
        name : Joi.string().min(3).required(),
        contact : Joi.string().required().min(9),
        gender : Joi.required()
    });

    const validation = schema.validate(customer);

    return validation;
}

const validateOrder = (order)=>{
    const schema = Joi.object({
        customer_id : Joi.required(),
        cake_id : Joi.required(),
        date : Joi.string().required().min(9),
        quentity : Joi.required()
    });

    const validation = schema.validate(order);

    return validation;
}

//===========================================================================================
const port = process.env.PORT || 3010;
app.listen(port,()=>{
    console.log(`listining to port: ${port}....`);
});