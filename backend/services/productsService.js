const axios = require('axios');

class ProductsService {
  constructor() {
    this.apiKey = process.env.AIRTABLE_API_KEY;
    this.baseId = process.env.AIRTABLE_BASE_ID;
    this.baseUrl = 'https://api.airtable.com/v0';
  }

  async getAllProducts() {
    try {
      if (!this.apiKey || !this.baseId) {
        console.log('Airtable credentials not found, using mock data');
        return this.getMockProducts();
      }

      const response = await axios.get(`${this.baseUrl}/${this.baseId}/Products`, {
        headers: {
          'Authorization': `Bearer ${this.apiKey}`,
          'Content-Type': 'application/json'
        }
      });

      return response.data.records.map(record => ({
        id: record.id,
        title: record.fields.Title || 'Product Title',
        price: record.fields.Price || 0,
        image: record.fields.Image?.[0]?.url || 'https://via.placeholder.com/300x200?text=Product+Image',
        description: record.fields.Description || 'Product description'
      }));

    } catch (error) {
      console.error('Error fetching products from Airtable:', error.message);
      console.log('Falling back to mock data');
      return this.getMockProducts();
    }
  }

  getMockProducts() {
    return [
      {
        id: '1',
        title: 'Wireless Headphones',
        price: 99.99,
        image: 'https://via.placeholder.com/300x200?text=Wireless+Headphones',
        description: 'High-quality wireless headphones with noise cancellation'
      },
      {
        id: '2',
        title: 'Smart Watch',
        price: 299.99,
        image: 'https://via.placeholder.com/300x200?text=Smart+Watch',
        description: 'Feature-rich smartwatch with health tracking'
      },
      {
        id: '3',
        title: 'Laptop Stand',
        price: 49.99,
        image: 'https://via.placeholder.com/300x200?text=Laptop+Stand',
        description: 'Ergonomic laptop stand for better posture'
      },
      {
        id: '4',
        title: 'Wireless Mouse',
        price: 29.99,
        image: 'https://via.placeholder.com/300x200?text=Wireless+Mouse',
        description: 'Precision wireless mouse for productivity'
      },
      {
        id: '5',
        title: 'USB-C Hub',
        price: 39.99,
        image: 'https://via.placeholder.com/300x200?text=USB-C+Hub',
        description: 'Multi-port USB-C hub for connectivity'
      },
      {
        id: '6',
        title: 'Bluetooth Speaker',
        price: 79.99,
        image: 'https://via.placeholder.com/300x200?text=Bluetooth+Speaker',
        description: 'Portable Bluetooth speaker with great sound'
      }
    ];
  }
}

module.exports = new ProductsService(); 