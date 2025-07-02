const express = require('express');
const cors = require('cors');
const axios = require('axios');

const app = express();
const PORT = 4000;

app.use(cors());
 
app.use(express.json());

const users = {}; // { phone: { name, email, phone } }
const otpStore = {}; // { phone: otp }

function generateOTP() {
  return Math.floor(100000 + Math.random() * 900000).toString();
}

app.post('/register', (req, res) => {
  const { name, email, phone } = req.body;
  if (!name || !email || !phone) {
    return res.status(400).json({ success: false, message: "All fields are required" });
  }

  if (users[phone]) {
    return res.status(409).json({ success: false, message: "User already exists" });
  }

  users[phone] = { name, email, phone };
  console.log("Registered Users:", users);

  return res.status(201).json({ success: true, message: "User registered" });
});

app.post("/send-otp", (req, res) => {
  const { phone } = req.body;
  if (!phone) {
    return res.status(400).json({ success: false, message: "Phone number is required" });
  }

  if (!users[phone]) {
    return res.status(404).json({ success: false, message: "User not registered" });
  }

  const otp = generateOTP();
  otpStore[phone] = otp;
  console.log(`Generated OTP for ${phone}: ${otp}`);

  res.status(200).json({ success: true, message: "OTP sent" });
});

app.post("/verify-otp", (req, res) => {
  const { phone, otp } = req.body;
  const storedOtp = otpStore[phone];

  if (!storedOtp || storedOtp !== otp) {
    return res.status(401).json({ success: false, message: "Invalid OTP" });
  }

  delete otpStore[phone];
  const user = users[phone];

  if (!user) {
    return res.status(404).json({ success: false, message: "User not found" });
  }

  res.status(200).json({ success: true, message: "OTP verified", user });
});

app.get('/api/swiggy', async (req, res) => {
  const { lat, lng } = req.query;

  if (!lat || !lng) {
    return res.status(400).json({ error: 'Missing lat or lng query parameter' });
  }

  try {
    const swiggyUrl = `https://www.swiggy.com/dapi/restaurants/list/v5?lat=${lat}&lng=${lng}&is-seo-homepage-enabled=true&page_type=DESKTOP_WEB_LISTING`;

    const response = await axios.get(swiggyUrl, {
      headers: {
        'User-Agent': 'Mozilla/5.0',
      },
    });

    res.json(response.data);
  } catch (error) {
    console.error('Fetch Error:', error.message);
    res.status(500).json({ error: 'Failed to fetch Swiggy data' });
  }
});

app.get('/api/swiggy/autocomplete', async (req, res) => {
  const { input } = req.query;

  if (!input) {
    return res.status(400).json({ error: 'Missing input query parameter' });
  }

  try {
    const swiggySearchUrl = `https://www.swiggy.com/dapi/misc/place-autocomplete?input=${encodeURIComponent(
      input
    )}&types=`;

    const response = await axios.get(swiggySearchUrl, {
      headers: {
        'User-Agent': 'Mozilla/5.0',
      },
    });
    console.error('Autocomplete Fetch data:', response.data);

    res.json(response.data);
  } catch (error) {
    console.error('Autocomplete Fetch Error:', error.message);
    res.status(500).json({ error: 'Failed to fetch autocomplete results' });
  }
});

app.get("/api/search-suggest",async(req,res)=>{
  const {str="",lat,lng}=req.query;
  if(!lat || !lng){
    return res.status(400).json({error:"lat and lng are required"})
  }

  const swiggyUrl =  "https://www.swiggy.com/dapi/restaurants/search/suggest";

  try{
    const response = await axios.get(swiggyUrl,{
      params:{
        lat,
        lng,
        str,
        trackingId: "undefined",
        includeIMItem: true,
      },
       headers: {
        "User-Agent":
          "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 Chrome/114.0.0.0 Safari/537.36",
        Accept: "application/json",
      },
    });
    res.json(response.data)
    console.log("foodsearch:",response.data)
  }catch(error){
    console.error("Swiggy API error:", error.message);
      res.status(500).json({ error: "Failed to fetch data from Swiggy" });
    }
})

app.get('/api/menu', async (req, res) => {
  const { restaurantId, lat, lng } = req.query

  if (!restaurantId || !lat || !lng) {
    return res.status(400).json({ error: 'Missing required params' })
  }

  const url = `https://www.swiggy.com/dapi/menu/pl?page-type=REGULAR_MENU&complete-menu=true&lat=${lat}&lng=${lng}&restaurantId=${restaurantId}&catalog_qa=undefined&submitAction=ENTER`

  try {
    const response = await axios.get(url, {
      headers: { 'User-Agent': 'Mozilla/5.0' },
    })
    res.json(response.data)
  } catch (err) {
    console.error('Swiggy Menu Fetch Error:', err.message)
    res.status(500).json({ error: 'Failed to fetch menu' })
  }
})


app.get('/api/restaurants', async (req, res) => {
  const { lat, lng, collection, tags } = req.query;

  if (!lat || !lng || !collection || !tags) {
    return res.status(400).json({
      error: 'Missing required query parameters: lat, lng, collection, tags',
    });
  }

  const swiggyUrl = `https://www.swiggy.com/dapi/restaurants/list/v5?lat=${lat}&lng=${lng}&collection=${collection}&tags=${tags}&sortBy=&filters=&type=rcv2&offset=0&page_type=null`;

  try {
    const response = await axios.get(swiggyUrl, {
      headers: {
        'User-Agent': 'Mozilla/5.0',
      },
    });

    res.json(response.data);
  } catch (error) {
    console.error('Error fetching Swiggy data:', error.message);
    res.status(500).json({ error: 'Failed to fetch data from Swiggy' });
  }
});



app.listen(PORT, () => {
  console.log(`✅ Express server running on http://localhost:${PORT}`);
});
