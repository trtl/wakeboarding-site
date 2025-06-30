require('dotenv').config({ path: '.env.server' });
const express = require('express');
const axios = require('axios');
const cors = require('cors');
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
const app = express();
const PORT = 4000;

app.use(cors());
app.use(express.json());

app.get('/api/air-temperature', async (req, res) => {
  try {
    const response = await axios.get('https://api.meteo.lt/v1/places/uzusaliai/forecasts/long-term');
    res.json(response.data);
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ error: error.message });
  }
});

app.get('/api/water-temperature', async (req, res) => {
  try {
    const response = await axios.get('https://api.meteo.lt/v1/hydro-stations/lampedziu-vms/observations/measured/latest');
    res.json(response.data);
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ error: error.message });
  }
});

// 🟢 Move the route **before** the `app.listen()`
app.post('/create-checkout-session', async (req, res) => {
  try {
    const { amount, bookingDetails, locale } = req.body;

    if (!amount || !bookingDetails) {
      return res.status(400).json({ 
        error: 'Missing required fields' 
      });
    }

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: [
        {
          price_data: {
            currency: 'eur',
            product_data: {
              name: 'Wakeboarding Reservation',
              description: `Date: ${bookingDetails.date}, Slots: ${bookingDetails.timeInterval.join(', ')}`,
            },
            unit_amount: Math.round(amount * 100),
          },
          quantity: 1,
        },
      ],
      mode: 'payment',
      success_url: 'http://localhost:8080/success',
      cancel_url: 'http://localhost:8080/cancel',
      locale: locale || 'en',
    });

    console.log("✅ Session created:", session.url);
    return res.status(200).json({ url: session.url });

  } catch (error) {
    console.error('Stripe error:', error);
    return res.status(500).json({ 
      error: error.message || 'Internal server error' 
    });
  }
});

app.listen(PORT, () => {
  console.log(`Proxy server running at http://localhost:${PORT}`);
});
