// // routes/payment.js
// const express = require('express');
// const router = express.Router();
// const crypto = require('crypto');
// const { authenticateToken } = require('../middleware/auth');

// // Lemon Squeezy API configuration
// const LEMON_SQUEEZY_API_KEY = process.env.LEMON_SQUEEZY_API_KEY;
// const LEMON_SQUEEZY_STORE_ID = process.env.LEMON_SQUEEZY_STORE_ID;
// const LEMON_SQUEEZY_PRODUCT_ID = process.env.LEMON_SQUEEZY_PRODUCT_ID;
// const LEMON_SQUEEZY_WEBHOOK_SECRET = process.env.LEMON_SQUEEZY_WEBHOOK_SECRET;

// // Create checkout session
// router.post('/create-checkout', authenticateToken, async (req, res) => {
//   try {
//     const { userId, email, name, productId, storeId } = req.body;

//     const checkoutData = {
//       data: {
//         type: 'checkouts',
//         attributes: {
//           checkout_data: {
//             email: email,
//             name: name,
//             custom: {
//               user_id: userId.toString()
//             }
//           },
//           product_options: {
//             enabled_variants: [],
//             redirect_url: `${process.env.FRONTEND_URL}/resume?payment=success`,
//             receipt_button_text: 'Go to Resume Builder',
//             receipt_link_url: `${process.env.FRONTEND_URL}/resume`
//           },
//           checkout_options: {
//             embed: false,
//             media: true,
//             logo: true,
//             desc: true,
//             discount: true,
//             dark: false,
//             subscription_preview: true,
//             button_color: '#f97316'
//           },
//           expires_at: new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString() // 24 hours
//         },
//         relationships: {
//           store: {
//             data: {
//               type: 'stores',
//               id: storeId.toString()
//             }
//           },
//           variant: {
//             data: {
//               type: 'variants',
//               id: productId.toString()
//             }
//           }
//         }
//       }
//     };

//     const response = await fetch('https://api.lemonsqueezy.com/v1/checkouts', {
//       method: 'POST',
//       headers: {
//         'Accept': 'application/vnd.api+json',
//         'Content-Type': 'application/vnd.api+json',
//         'Authorization': `Bearer ${LEMON_SQUEEZY_API_KEY}`
//       },
//       body: JSON.stringify(checkoutData)
//     });

//     if (!response.ok) {
//       const errorData = await response.text();
//       console.error('Lemon Squeezy API Error:', errorData);
//       throw new Error('Failed to create checkout session');
//     }

//     const data = await response.json();
    
//     res.json({
//       checkoutUrl: data.data.attributes.url,
//       checkoutId: data.data.id
//     });

//   } catch (error) {
//     console.error('Create checkout error:', error);
//     res.status(500).json({ error: 'Failed to create checkout session' });
//   }
// });

// // Lemon Squeezy webhook handler
// router.post('/webhook', express.raw({ type: 'application/json' }), async (req, res) => {
//   try {
//     const signature = req.headers['x-signature'];
//     const body = req.body;

//     // Verify webhook signature
//     const expectedSignature = crypto
//       .createHmac('sha256', LEMON_SQUEEZY_WEBHOOK_SECRET)
//       .update(body)
//       .digest('hex');

//     if (signature !== expectedSignature) {
//       console.error('Invalid webhook signature');
//       return res.status(400).json({ error: 'Invalid signature' });
//     }

//     const event = JSON.parse(body.toString());
    
//     console.log('Webhook Event:', event.meta.event_name);

//     // Handle different webhook events
//     switch (event.meta.event_name) {
//       case 'order_created':
//         await handleOrderCreated(event);
//         break;
//       case 'subscription_created':
//         await handleSubscriptionCreated(event);
//         break;
//       case 'subscription_updated':
//         await handleSubscriptionUpdated(event);
//         break;
//       default:
//         console.log('Unhandled webhook event:', event.meta.event_name);
//     }

//     res.status(200).json({ received: true });

//   } catch (error) {
//     console.error('Webhook error:', error);
//     res.status(500).json({ error: 'Webhook processing failed' });
//   }
// });

// // Handle order created (one-time payment)
// async function handleOrderCreated(event) {
//   try {
//     const order = event.data;
//     const userId = order.attributes.first_order_item?.product_id ? 
//       order.attributes.user_email : // fallback to email if no custom data
//       order.attributes.checkout_data?.custom?.user_id;

//     if (!userId) {
//       console.error('No user ID found in order data');
//       return;
//     }

//     // Update user's payment status in database
//     await updateUserPaymentStatus(userId, {
//       hasUnlimitedDownloads: true,
//       paymentProvider: 'lemonsqueezy',
//       orderId: order.id,
//       amount: order.attributes.total,
//       currency: order.attributes.currency,
//       status: order.attributes.status,
//       paidAt: new Date(order.attributes.created_at)
//     });

//     console.log(`Payment successful for user ${userId}, order ${order.id}`);

//   } catch (error) {
//     console.error('Error handling order created:', error);
//   }
// }

// // Handle subscription created
// async function handleSubscriptionCreated(event) {
//   // Similar to order created but for subscription-based payments
//   // Implement if you want to offer subscription options
// }

// // Handle subscription updated
// async function handleSubscriptionUpdated(event) {
//   // Handle subscription updates (renewals, cancellations, etc.)
//   // Implement if you want to offer subscription options
// }

// // Database helper function
// async function updateUserPaymentStatus(userId, paymentData) {
//   // This depends on your database setup
//   // Example for MongoDB/Mongoose:
//   /*
//   const User = require('../models/User');
//   await User.findByIdAndUpdate(userId, {
//     hasUnlimitedDownloads: paymentData.hasUnlimitedDownloads,
//     paymentHistory: {
//       $push: paymentData
//     }
//   });
//   */

//   // Example for SQL databases:
//   /*
//   const db = require('../config/database');
//   await db.query(
//     'UPDATE users SET has_unlimited_downloads = ?, payment_data = ? WHERE id = ?',
//     [paymentData.hasUnlimitedDownloads, JSON.stringify(paymentData), userId]
//   );
//   */

//   // You'll need to implement this based on your database structure
//   console.log('Update user payment status:', userId, paymentData);
// }

// module.exports = router;
