using chatbackend.DTOs;
using chatbackend.Repos;
using Microsoft.AspNetCore.Mvc;
using System.Threading.Tasks;

namespace chatbackend.Controllers
{
    [Route("api/users")]
    [ApiController]
    public class UserController : ControllerBase
    {
        private readonly IUserRepo _userRepo;

        public UserController(IUserRepo userRepo)
        {
            _userRepo = userRepo;
        }

        [HttpGet]
        public async Task<IActionResult> GetAllUsers()
        {
            var messages = await _userRepo.getAllUsers();
            return Ok(messages);
        }

        [HttpGet("{userId}")]
        public async Task<IActionResult> GetAllUsersById(int userId)
        {
            var messages = await _userRepo.GetAllUsersById(userId);
            return Ok(messages);
        }
        [HttpGet("search/{morph}")]
        public async Task<IActionResult> GetAllUsersByUserMorph(string morph)
        {
            var messages = await _userRepo.GetAllUsersByUserMorph(morph);
            return Ok(messages);
        }

        [HttpPost]
        public async Task<IActionResult> PostUser(ChatUserDTO chatUserDTO)
        {
            var users = await _userRepo.PostUser(chatUserDTO);
            return Ok(users);
        }
    }
}
