const axios = require('axios');

class MessagesService {
  constructor() {
    this.apiKey = process.env.AIRTABLE_API_KEY;
    this.baseId = process.env.AIRTABLE_BASE_ID;
    this.baseUrl = 'https://api.airtable.com/v0';
  }

  async getMessagesByChatId(chatId) {
    try {
      if (!this.apiKey || !this.baseId) {
        console.log('Airtable credentials not found, using mock data');
        return this.getMockMessages(chatId);
      }

      const response = await axios.get(`${this.baseUrl}/${this.baseId}/Messages`, {
        headers: {
          'Authorization': `Bearer ${this.apiKey}`,
          'Content-Type': 'application/json'
        },
        params: {
          filterByFormula: `{ChatId} = '${chatId}'`
        }
      });

      return response.data.records.map(record => ({
        id: record.id,
        chatId: record.fields.ChatId,
        sender: record.fields.Sender || 'other',
        message: record.fields.Message || '',
        timestamp: record.fields.Timestamp || new Date().toISOString()
      }));

    } catch (error) {
      console.error('Error fetching messages from Airtable:', error.message);
      console.log('Falling back to mock data');
      return this.getMockMessages(chatId);
    }
  }

  getMockMessages(chatId) {
    return [
      {
        id: '1',
        chatId: chatId,
        sender: 'other',
        message: 'Hey! How can I help you today?',
        timestamp: '2024-01-15T10:30:00Z'
      },
      {
        id: '2',
        chatId: chatId,
        sender: 'me',
        message: 'Hi! I\'m looking for some wireless headphones. Do you have any recommendations?',
        timestamp: '2024-01-15T10:32:00Z'
      },
      {
        id: '3',
        chatId: chatId,
        sender: 'other',
        message: 'Absolutely! We have several great options. What\'s your budget range?',
        timestamp: '2024-01-15T10:33:00Z'
      },
      {
        id: '4',
        chatId: chatId,
        sender: 'me',
        message: 'I\'m looking to spend around $100-150. Something with good sound quality and noise cancellation.',
        timestamp: '2024-01-15T10:35:00Z'
      },
      {
        id: '5',
        chatId: chatId,
        sender: 'other',
        message: 'Perfect! I\'d recommend our Wireless Headphones for $99.99. They have excellent noise cancellation and premium sound quality. Would you like me to show you more details?',
        timestamp: '2024-01-15T10:37:00Z'
      },
      {
        id: '6',
        chatId: chatId,
        sender: 'me',
        message: 'That sounds great! Can you tell me more about the battery life?',
        timestamp: '2024-01-15T10:40:00Z'
      },
      {
        id: '7',
        chatId: chatId,
        sender: 'other',
        message: 'The battery life is up to 20 hours on a single charge, and they come with a quick charge feature that gives you 5 hours of playback in just 10 minutes!',
        timestamp: '2024-01-15T10:42:00Z'
      }
    ];
  }
}

module.exports = new MessagesService(); 