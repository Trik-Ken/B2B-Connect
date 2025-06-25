const express = require('express');
const messagesService = require('../services/messagesService');

const router = express.Router();

// GET /api/chat/:chatId/messages - Get messages for a specific chat
router.get('/:chatId/messages', async (req, res) => {
  try {
    const { chatId } = req.params;
    const messages = await messagesService.getMessagesByChatId(chatId);
    
    res.json({
      success: true,
      data: messages,
      chatId: chatId,
      count: messages.length
    });
  } catch (error) {
    console.error('Error in messages route:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to fetch messages'
    });
  }
});

module.exports = router; 