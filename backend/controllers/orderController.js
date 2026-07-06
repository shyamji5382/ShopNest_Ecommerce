const Order = require('../model/Order');

const sendEmail = require('../utils/sendEmail');

// Create a new order
const createOrder = async (req, res) => {
    try {
        const { items, totalAmount, address, paymentId } = req.body;
        if (!items || items.length === 0 || !totalAmount || !address) {
            return res.status(400).json({ message: 'Invalid order data' });
        }
        else {
            const formattedItems = items.map(item => ({
            productId: item.productId || item._id,
            qty: item.qty,
            price: item.price
        }));
        const order = new Order({
        user: req.user._id,
        items: formattedItems,
        totalAmount,
        address,
        paymentId
        });
        await order.save();
        const message = `Dear ${req.user.name},

       Thank you for your order! We're happy to confirm that your order has been placed successfully with ShopNest.

       Order Summary:
      - Total Amount: ₹${totalAmount}
      - Shipping Address: ${address.street}, ${address.city}, ${address.postalCode}, ${address.country}
      - Payment ID: ${paymentId}

      We're preparing your order for shipment and will notify you once it's on its way. You can track your order status anytime by logging into your ShopNest account.

     If you have any questions, feel free to reach out to our support team.

     Thank you for shopping with us!

     Warm regards,
     Team ShopNest`;
       
        await sendEmail(req.user.email, 'Order Created', message);
        res.status(201).json({ message: 'Order created successfully', order });
    }
    } catch (error) {
    console.error("Create Order Error:", error);

    res.status(500).json({
        message: error.message,
        stack: error.stack
    });
}

};

const myOrders = async (req, res) => {
    try {
        const orders = await Order.find({ user: req.user._id }).populate('items.productId', 'name price');
        res.json(orders);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching orders', error });
    }
};
const getOrders = async (req, res) => {
    try {
        const orders = await Order.find({}).populate('user', 'id name').populate('items.productId', 'name price');
        res.json(orders);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching orders', error });
    }
};
const updateOrderStatus =async(req, res) => {
    try{
        const {status} =req.body;
        const order = await Order.findById(req.params.id);
        if(order){
            order.status =status;
            await order.save();
            res.json({message:'Order status updated', order});
        }
        else{
            res.status(404).json({message: 'Order not found'});
        }
    }catch(error){
        res.status(500).json({message: 'Error updating order status',error});
    }
};

module.exports = {
    createOrder,
    myOrders,
    getOrders,
    updateOrderStatus,


};
        