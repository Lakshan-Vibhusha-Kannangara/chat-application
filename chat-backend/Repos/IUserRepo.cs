using chatbackend.DTOs;

namespace chatbackend.Repos
{
    public interface IUserRepo
    {
        public Task<Dictionary<string, Dictionary<string, string>>> getAllUsers();
        public Task<Dictionary<string, Dictionary<string, string>>> GetAllUsersById(int userId);
        public Task<Dictionary<string, Dictionary<string, string>>> GetAllUsersByUserMorph(string morph);
        public  Task<ChatUserDTO> GetLogin(ChatUserDTO chatUserDTO);
        Task<ChatUserDTO> PostUser(ChatUserDTO chatUserDTO);
    }
}