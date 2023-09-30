namespace chatbackend.DTOs{
    public class ChatData
{
    public List<ChatConversation> conversations { get; set; }
}

public class ChatConversation
{
    public int id { get; set; }
    public List<ChatMessageDTO> messages { get; set; }
}

}