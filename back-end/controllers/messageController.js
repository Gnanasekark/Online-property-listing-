import Message from '../models/Message.js';

// Create new message
export const createMessage = async (req, res) => {
  try {
    const { name, email, phone, message, propertyId, propertyTitle, ownerId, userId } = req.body;

    const newMessage = new Message({
      senderName: name,
      senderEmail: email,
      senderPhone: phone,
      message,
      propertyId,
      propertyTitle,
      ownerId,
      userId,
      status: 'unread',
      date: new Date(),
    });

    await newMessage.save();

    res.status(201).json({
      success: true,
      message: 'Message sent successfully',
      data: newMessage,
    });
  } catch (error) {
    console.error('❌ Error creating message:', error);
    res.status(500).json({ success: false, error: error.message });
  }
};

// Get messages for owner
export const getOwnerMessages = async (req, res) => {
  try {
    const ownerId = req.user.id;
    const messages = await Message.find({ ownerId });
    console.log("💬 Messages fetched:", messages);
    res.status(200).json(messages);
  } catch (err) {
    console.error("❌ Failed to fetch messages:", err);
    res.status(500).json({ success: false, message: "Server error fetching messages" });
  }
};

// Mark as read
export const markAsRead = async (req, res) => {
  try {
    const message = await Message.findByIdAndUpdate(
      req.params.id,
      { status: 'read' },
      { new: true }
    );
    res.status(200).json(message);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
