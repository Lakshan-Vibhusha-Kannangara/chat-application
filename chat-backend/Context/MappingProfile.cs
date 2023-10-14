using AutoMapper;
using chatbackend.Models;
using chatbackend.DTOs;

public class MappingProfile : Profile
{
    public MappingProfile()
    {
        CreateMap<ChatMessage, ChatMessageDTO>()
            .ForMember(dest => dest.messageId, opt => opt.MapFrom(src => src.MessageId))
            .ForMember(dest => dest.senderId, opt => opt.MapFrom(src => src.SenderId))
            .ForMember(dest => dest.recipientId, opt => opt.MapFrom(src => src.RecipientId))
            .ForMember(dest => dest.text, opt => opt.MapFrom(src => src.Text))
            .ForMember(dest => dest.timestamp, opt => opt.MapFrom(src => src.Timestamp))
              .ForMember(dest => dest.attachment, opt => opt.MapFrom(src => src.Attachment));
        CreateMap<ChatMessageDTO, ChatMessage>()
            .ForMember(dest => dest.MessageId, opt => opt.Ignore())
            .ForMember(dest => dest.SenderId, opt => opt.MapFrom(src => src.senderId))
            .ForMember(dest => dest.RecipientId, opt => opt.MapFrom(src => src.recipientId))
            .ForMember(dest => dest.Text, opt => opt.MapFrom(src => src.text))

            .ForMember(dest => dest.Attachment, opt => opt.MapFrom(src => src.attachment));


        CreateMap<ChatUser, ChatUserDTO>()
            .ForMember(dest => dest.userId, opt => opt.MapFrom(src => src.UserId))
            .ForMember(dest => dest.name, opt => opt.MapFrom(src => src.Name))
               .ForMember(dest => dest.email, opt => opt.MapFrom(src => src.Email))
            .ForMember(dest => dest.avatar, opt => opt.MapFrom(src => src.Avatar))
                .ForMember(dest => dest.password, opt => opt.MapFrom(src => src.Password))
                 .ForMember(dest => dest.token, opt => opt.MapFrom(src => src.Token))
                  .ForMember(dest => dest.createdDate, opt => opt.MapFrom(src => src.CreatedDate));


        CreateMap<ChatUserDTO, ChatUser>()

            .ForMember(dest => dest.Name, opt => opt.MapFrom(src => src.name))
            .ForMember(dest => dest.Avatar, opt => opt.MapFrom(src => src.avatar))
              .ForMember(dest => dest.Email, opt => opt.MapFrom(src => src.email))
   .ForMember(dest => dest.CreatedDate, opt => opt.MapFrom(src => src.createdDate))
      .ForMember(dest => dest.Password, opt => opt.MapFrom(src => src.password));


    }

}
