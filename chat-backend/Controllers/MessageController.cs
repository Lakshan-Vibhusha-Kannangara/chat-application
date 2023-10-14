using chatbackend.DTOs;
using chatbackend.Repos;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Threading.Tasks;

namespace chatbackend.Controllers
{ 
    [Route("api/messages")]
    [ApiController]
    public class MessageController : ControllerBase
    {
        private readonly IMessageRepo _messageRepo;

        public MessageController(IMessageRepo messageRepo)
        {
            _messageRepo = messageRepo ?? throw new ArgumentNullException(nameof(messageRepo));
        }

        [HttpGet]
              [Authorize]

        public async Task<IActionResult> GetAllMessages()
        {
            var messages = await _messageRepo.GetChatMessages();
            return Ok(messages);
        }
        [HttpGet("{userId}")]
              [Authorize]

        public IActionResult GetMessagesByUserId(int userId)
        {
            var messages = _messageRepo.GetChatData(userId);
            return Ok(messages);
        }
        [HttpPost]
              [Authorize]

        public IActionResult addMessage(ChatMessageDTO chatMessage)
        {
            var messages = _messageRepo.AddChatMessage(chatMessage);
            return Ok(messages);
        }
    }
}
