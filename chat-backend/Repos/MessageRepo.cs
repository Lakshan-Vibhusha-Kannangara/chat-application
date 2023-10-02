using AutoMapper;
using chatbackend.DTOs;
using chatbackend.Models;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Threading.Tasks; // Add this using directive
using System.Linq;
namespace chatbackend.Repos
{
    public class MessageRepo : IMessageRepo
    {
        private readonly ChatDbContext _context;
        private readonly IMapper _mapper;

        public MessageRepo(ChatDbContext context, IMapper mapper)
        {
            _context = context;
            _mapper = mapper;
        }

        public async Task<IEnumerable<ChatMessageDTO>> GetChatMessages()
        {
            var messages = await _context.ChatMessages.ToListAsync();
            List<ChatMessageDTO> chatMessageDTOs = _mapper.Map<List<ChatMessageDTO>>(messages);
            return chatMessageDTOs;
        }



        public ChatData GetChatData(int userId)
        {
            var messages = _context.ChatMessages
                .Where(cm => cm.SenderId == userId || cm.RecipientId == userId)
                .OrderBy(cm => cm.Timestamp)
                .ToList();

            var conversations = new List<ChatConversation>();
            var conversationIds = new HashSet<int>();

            foreach (var message in messages)
            {
                int otherUserId = message.SenderId == userId ? message.RecipientId : message.SenderId;

                if (!conversationIds.Contains(otherUserId))
                {
                    conversationIds.Add(otherUserId);

                    var conversation = new ChatConversation
                    {
                        id = otherUserId, // Set the id to the otherUserId
                        messages = new List<ChatMessageDTO>()
                    };

                    conversations.Add(conversation);
                }

                var chatMessageDTO = new ChatMessageDTO
                {
                    messageId = message.MessageId,
                    timestamp = message.Timestamp,
                    senderId = message.SenderId,
                    recipientId = message.RecipientId,
                    text = message.Text,
                    attachment = message.Attachment
                };

                var conversationToUpdate = conversations.FirstOrDefault(c => c.id == otherUserId);
                conversationToUpdate?.messages.Add(chatMessageDTO);
            }

            var initialChats = new ChatData
            {
                conversations = conversations
            };

            return initialChats;
        }
      public ChatMessageDTO AddChatMessage(ChatMessageDTO chatMessage)
{
    var msg = _mapper.Map<ChatMessage>(chatMessage);
    
  
    var sriLankaTimeZone = TimeZoneInfo.FindSystemTimeZoneById("Asia/Colombo");
    

    msg.Timestamp = TimeZoneInfo.ConvertTimeFromUtc(DateTime.UtcNow, sriLankaTimeZone);
    
    _context.ChatMessages.Add(msg);
    _context.SaveChanges();
    
    var savedMessage = _mapper.Map<ChatMessageDTO>(msg);
    return savedMessage;
}
    }


}
