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
    const collection = await getCollection('demo_requests');

    if (req.method === 'POST') {
      const { firstName, lastName, email, phone, company, companySize, jobTitle, useCase } = req.body;

      if (!firstName || !lastName || !email || !company || !companySize) {
        return res.status(400).json({
          success: false,
          detail: 'Missing required fields: firstName, lastName, email, company, companySize',
        });
      }

      const demoRequest = {
        firstName,
        lastName,
        email,
        phone: phone || '',
        company,
        companySize,
        jobTitle: jobTitle || '',
        useCase: useCase || '',
        createdAt: new Date().toISOString(),
      };

      await collection.insertOne(demoRequest);

      return res.status(201).json({
        success: true,
        data: demoRequest,
      });
    }

    if (req.method === 'GET') {
      const demoRequests = await collection.find({}).sort({ createdAt: -1 }).toArray();

      return res.status(200).json({
        success: true,
        data: demoRequests,
      });
    }

    return res.status(405).json({ success: false, detail: 'Method not allowed' });
  } catch (error) {
    console.error('Demo requests API error:', error);
    return res.status(500).json({
      success: false,
      detail: 'Internal server error',
    });
  }
};
