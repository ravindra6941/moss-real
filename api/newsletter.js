const { getCollection } = require('./lib/mongodb');

module.exports = async function handler(req, res) {
  // CORS headers
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  try {
    const collection = await getCollection('newsletter_subscribers');

    if (req.method === 'POST') {
      const { email, source } = req.body;

      if (!email) {
        return res.status(400).json({
          success: false,
          detail: 'Email is required',
        });
      }

      // Check if email already exists
      const existing = await collection.findOne({ email });
      if (existing) {
        return res.status(200).json({
          success: true,
          data: existing,
          detail: 'Already subscribed',
        });
      }

      const subscriber = {
        email,
        source: source || 'footer',
        isActive: true,
        createdAt: new Date().toISOString(),
      };

      await collection.insertOne(subscriber);

      return res.status(201).json({
        success: true,
        data: subscriber,
      });
    }

    if (req.method === 'GET') {
      const subscribers = await collection.find({}).sort({ createdAt: -1 }).toArray();

      return res.status(200).json({
        success: true,
        data: subscribers,
      });
    }

    return res.status(405).json({ success: false, detail: 'Method not allowed' });
  } catch (error) {
    console.error('Newsletter API error:', error);
    return res.status(500).json({
      success: false,
      detail: 'Internal server error',
    });
  }
};
