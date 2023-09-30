
using chatbackend.DTOs;
using chatbackend.Models;

namespace chatbackend.Repos
{
    public interface IMessageRepo
    {
        Task<IEnumerable<ChatMessageDTO>> GetChatMessages();

      ChatData  GetChatData(int userId);
        ChatMessageDTO AddChatMessage(ChatMessageDTO chatMessage);
    }


}