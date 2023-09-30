using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace chatbackend.Models
{
    public class ChatMessage
    {
        [Key]
        public int MessageId { get; set; }

        [Required]
        [ForeignKey("Sender")]
        public int SenderId { get; set; }

        [Required]
        [ForeignKey("Recipient")]
        public int RecipientId { get; set; }

        [Required]
        [MaxLength(255)]
        public string? Text { get; set; }
        public string? Attachment{get;set;}

        [Required]
        public DateTime Timestamp { get; set; }


        public ChatUser? Sender { get; set; }


        public ChatUser? Recipient { get; set; }
    }
}
