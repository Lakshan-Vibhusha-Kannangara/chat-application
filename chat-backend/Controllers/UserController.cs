using chatbackend.DTOs;
using chatbackend.Repos;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using Microsoft.IdentityModel.Tokens;
using System;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;

namespace chatbackend.Controllers
{   [EnableCors("AnyOrigin")]
    [Route("api/users")]
    [ApiController]
    public class UserController : ControllerBase
    {
        private readonly IUserRepo _userRepo;
        private readonly IConfiguration _configuration;

        public UserController(IUserRepo userRepo, IConfiguration configuration)
        {
            _userRepo = userRepo;
            _configuration = configuration;
        }

        [HttpGet]
        [Authorize] 
        public async Task<IActionResult> GetAllUsers()
        {
            var messages = await _userRepo.getAllUsers();
            return Ok(messages);
        }

  
        [Authorize]
         [HttpPost("getAll")] 
        public async Task<IActionResult> GetAllUsersById(SearchDataDTO searchDataDTO)
        {
            var messages = await _userRepo.GetAllUsersById(searchDataDTO.userId);
            return Ok(messages);
        }
        
        [HttpPost("search")]
        [Authorize] // Requires authentication for this endpoint
        public async Task<IActionResult> GetAllUsersByUserMorph(SearchDataDTO searchDataDTO)
        {
            var messages = await _userRepo.GetAllUsersByUserMorph(searchDataDTO);
            return Ok(messages);
        }

        [HttpPost]
        
        public async Task<IActionResult> PostUser(ChatUserDTO chatUserDTO)
        {
            var users = await _userRepo.PostUser(chatUserDTO);
            return Ok(users);
        }

        [HttpPost("login")]

        public async Task<IActionResult> Login(ChatUserDTO chatUserDTO)
        {
            var user = await _userRepo.GetLogin(chatUserDTO);

            if (user == null)
            {
                return NotFound();
            }

            // Generate a JWT token for the authenticated user
            var claims = new[]
            {
                new Claim(JwtRegisteredClaimNames.Sub, user.userId.ToString()),
                new Claim(JwtRegisteredClaimNames.Jti, Guid.NewGuid().ToString()),
                new Claim(JwtRegisteredClaimNames.Iat, DateTime.UtcNow.ToString()),
                new Claim("Username", user.name), // Add other claims as needed
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

            return Ok(new { Token = tokenString, User = user });
        }
    }
}
