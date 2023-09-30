using chatbackend.DTOs;
using chatbackend.Models;
using chatbackend.Repos;
using Microsoft.AspNetCore.Cors;
using Microsoft.EntityFrameworkCore;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddControllers();
builder.Services.AddAutoMapper(cfg =>
{
    cfg.CreateMap<ChatDbContext, ChatDbContext>();
    cfg.CreateMap<ChatMessage, ChatMessageDTO>();
        cfg.CreateMap<ChatMessageDTO, ChatMessage>();
    cfg.CreateMap<ChatUser, ChatUserDTO>();
     cfg.CreateMap<ChatUserDTO, ChatUser>();
});

builder.Services.AddDbContext<ChatDbContext>(options =>
{
    options.UseMySql(builder.Configuration.GetConnectionString("ChatConnection"), new MySqlServerVersion(new Version(8, 0, 25)));
});

builder.Services.AddCors(options =>
{
    options.AddPolicy("AnyOrigin", policy =>
    {
        policy.AllowAnyOrigin();
        policy.AllowAnyMethod();
        policy.AllowAnyHeader();
    });
});

builder.Services.AddTransient<IMessageRepo, MessageRepo>();
builder.Services.AddTransient<IUserRepo, UserRepo>();
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

var app = builder.Build();

if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();
app.UseCors("AnyOrigin");
app.UseAuthorization();

app.MapControllers();

app.Run();