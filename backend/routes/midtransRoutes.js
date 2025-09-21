import express from 'express';
import midtransClient from 'midtrans-client';
import dotenv from 'dotenv';

dotenv.config();

const router = express.Router();

// Inisialisasi Midtrans Snap API client
let snap = new midtransClient.Snap({
    isProduction : false, // Set to true for production
    serverKey : process.env.MIDTRANS_SERVER_KEY,
    clientKey : process.env.MIDTRANS_CLIENT_KEY
});

// Endpoint untuk membuat transaksi Snap
router.post('/create-transaction', async (req, res) => {
    const { order_id, gross_amount, item_details, customer_details } = req.body;

    let parameter = {
        "transaction_details": {
            "order_id": order_id,
            "gross_amount": gross_amount
        },
        "item_details": item_details,
        "customer_details": customer_details,
        "credit_card":{
            "secure": true
        }
    };

    try {
        const transaction = await snap.createTransaction(parameter);
        res.status(200).json({ token: transaction.token });
    } catch (error) {
        console.error("Error creating Midtrans transaction:", error.message);
        res.status(500).json({ message: "Failed to create Midtrans transaction", error: error.message });
    }
});

// Endpoint untuk notifikasi Midtrans (webhook)
router.post('/notification', async (req, res) => {
    try {
        const statusResponse = await snap.transactions.notification(req.body);
        let orderId = statusResponse.order_id;
        let transactionStatus = statusResponse.transaction_status;
        let fraudStatus = statusResponse.fraud_status;

        console.log(`Transaction notification received. Order ID: ${orderId}. Transaction status: ${transactionStatus}. Fraud status: ${fraudStatus}`);

        // TODO: Update order status in your database based on transactionStatus
        // Example:
        // if (transactionStatus == 'capture') {
        //     if (fraudStatus == 'challenge') {
        //         // TODO set transaction status on your database to 'challenge'
        //     } else if (fraudStatus == 'accept') {
        //         // TODO set transaction status on your database to 'success'
        //     }
        // } else if (transactionStatus == 'settlement') {
        //     // TODO set transaction status on your database to 'success'
        // } else if (transactionStatus == 'cancel' || transactionStatus == 'deny' || transactionStatus == 'expire') {
        //     // TODO set transaction status on your database to 'failure'
        // } else if (transactionStatus == 'pending') {
        //     // TODO set transaction status on your database to 'pending' / waiting payment
        // }

        res.status(200).send('OK');
    } catch (error) {
        console.error("Error processing Midtrans notification:", error.message);
        res.status(500).json({ message: "Failed to process Midtrans notification", error: error.message });
    }
});

export default router;