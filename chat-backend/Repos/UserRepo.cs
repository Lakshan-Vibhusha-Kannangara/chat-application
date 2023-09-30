using AutoMapper;
using chatbackend.DTOs;
using chatbackend.Models;
using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace chatbackend.Repos
{
    public class UserRepo : IUserRepo
    {
        private readonly IMapper _mapper;
        private readonly ChatDbContext _context;

        public UserRepo(IMapper mapper, ChatDbContext context)
        {
            _mapper = mapper;
            _context = context;
        }

        public async Task<Dictionary<string, Dictionary<string, string>>> getAllUsers()
        {
            var users = await _context.ChatUsers.ToListAsync();
            List<ChatUserDTO> chatUserDTOs = _mapper.Map<List<ChatUserDTO>>(users);

            // Transform the DTOs into the desired format
            var result = new Dictionary<string, Dictionary<string, string>>();

            foreach (var dto in chatUserDTOs)
            {
                var userDict = new Dictionary<string, string>
                {
                    { "name", dto.name },
                    { "avatar", dto.avatar }
                };

                result[dto.userId.ToString()] = userDict;
            }

            return result;
        }
        public async Task<Dictionary<string, Dictionary<string, string>>> GetAllUsersById(int userId)
        {
            // Retrieve users who have chatted with the specified user
            var chatUsers = await _context.ChatUsers
                .Where(u => _context.ChatMessages
                    .Any(c => (c.SenderId == userId || c.RecipientId == userId) && (c.SenderId == u.UserId || c.RecipientId == u.UserId))
                )
                .Where(u => u.UserId != userId) // Exclude the specified user
                .ToListAsync();

            // Transform the retrieved data into the desired format
            var result = new Dictionary<string, Dictionary<string, string>>();

            foreach (var user in chatUsers)
            {
                var userDict = new Dictionary<string, string>
        {
            { "name", user.Name },
            { "avatar", user.Avatar }
        };

                result[user.UserId.ToString()] = userDict;
            }

            return result;
        }
        public async Task<Dictionary<string, Dictionary<string, string>>> GetAllUsersByUserMorph(string morph)
        {
            // Retrieve users whose names match the partial string
            var chatUsers = await _context.ChatUsers
                .Where(u => u.Name.Contains(morph))
                .ToListAsync();

            // Transform the retrieved data into the desired format
            var result = new Dictionary<string, Dictionary<string, string>>();

            foreach (var user in chatUsers)
            {
                var userDict = new Dictionary<string, string>
        {
            { "name", user.Name },
            { "avatar", user.Avatar }
        };

                result[user.UserId.ToString()] = userDict;
            }

            return result;
        }

public async Task<ChatUserDTO> GetLogin(ChatUserDTO chatUserDTO)
{
    var user = await _context.ChatUsers
        .FirstOrDefaultAsync(c => c.Email == chatUserDTO.emailId && c.Password == chatUserDTO.password);

    if (user != null)
    {
        return _mapper.Map<ChatUserDTO>(user);
    }

    return null;
}

        public async Task<ChatUserDTO> PostUser(ChatUserDTO chatUserDTO)
        {
            var usr = _mapper.Map<ChatUser>(chatUserDTO);
            _context.ChatUsers.Add(usr);
            _context.SaveChanges();

            return chatUserDTO;
        }

     
    }
}
