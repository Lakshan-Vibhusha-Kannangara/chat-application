using AutoMapper;
using chatbackend.DTOs;
using chatbackend.Models;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;

namespace chatbackend.Repos
{
    public class UserRepo : IUserRepo
    {
        private readonly IMapper _mapper;
        private readonly ChatDbContext _context;
              private readonly IConfiguration _configuration;

        public UserRepo(IMapper mapper, ChatDbContext context,IConfiguration configuration)
        {
            _mapper = mapper;
            _context = context;
             _configuration = configuration;
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
    // Map the DTO to the ChatUser entity
    var user = _mapper.Map<ChatUser>(chatUserDTO);

    // Save the user to the database
    _context.ChatUsers.Add(user);
    _context.SaveChanges();

    // Generate a JWT token for the newly created user
    var claims = new[]
    {
        new Claim(JwtRegisteredClaimNames.Sub, user.UserId.ToString()), // User ID as subject
        new Claim(JwtRegisteredClaimNames.Jti, Guid.NewGuid().ToString()), // Unique identifier
        new Claim(JwtRegisteredClaimNames.Iat, DateTime.UtcNow.ToString()), // Issued at
        // Add other claims as needed (e.g., user roles, etc.)
    };

    var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_configuration["Jwt:Key"]));
    var signIn = new SigningCredentials(key, SecurityAlgorithms.HmacSha256);
    var token = new JwtSecurityToken(
        _configuration["Jwt:Issuer"],
        _configuration["Jwt:Audience"],
        claims,
        expires: DateTime.UtcNow.AddMinutes(10), // Set the token expiration time as needed
        signingCredentials: signIn);

    var tokenString = new JwtSecurityTokenHandler().WriteToken(token);

    // Update the user's Token property in the database
    user.Token = tokenString;
    _context.SaveChanges();

    // Return the newly created user DTO along with the token
    return new ChatUserDTO
    {
        userId = user.UserId,
        name = user.Name,
        // Include other properties as needed
        token = tokenString
    };
}
    }

}
