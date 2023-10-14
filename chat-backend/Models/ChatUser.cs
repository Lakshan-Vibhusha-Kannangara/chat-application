using System.ComponentModel.DataAnnotations;

namespace chatbackend.Models
{
    public class ChatUser
    {
        [Key]
        public int UserId { get; set; }

        [Required]
        [MaxLength(255)]
        public string? Name { get; set; }
          [Required]
         public string Email { get; set; }

        public string? Avatar { get; set; }
        public DateTime? CreatedDate { get; set; }
        public string? Password { get; set; }
        public string? Token { get; set; }
    }
}