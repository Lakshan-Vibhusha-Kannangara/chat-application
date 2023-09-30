namespace  chatbackend.DTOs{
public class ChatMessageDTO
{
    public int? messageId { get; set; } // Make sure this property matches the type of MessageId in your ChatMessage model
    public DateTime timestamp { get; set; }
    public int senderId { get; set; }
    public int recipientId { get; set; }
    public string? text { get; set; }
    public string? attachment{get;set;}
        public string? password { get; set; }
        public string? token { get; set; }
}
}