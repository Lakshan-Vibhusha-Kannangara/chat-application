using System;
using System.Text;
using chatbackend.DTOs;
using chatbackend.Models;
using chatbackend.Repos;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.IdentityModel.Tokens;

var builder = WebApplication.CreateBuilder(args);

// Configure app settings
builder.Configuration.AddJsonFile("appsettings.json", optional: false);

builder.Services.AddControllers();
builder.Services.AddAuthentication(JwtBearerDefaults.AuthenticationScheme)
        .AddJwtBearer(options =>
        {
            options.TokenValidationParameters = new TokenValidationParameters
            {
                ValidateIssuer = true,
                ValidateAudience = true,
                ValidateLifetime = true,
                ValidateIssuerSigningKey = true,
                ValidIssuer = builder.Configuration["Jwt:Issuer"],
                ValidAudience = builder.Configuration["Jwt:Audience"],
                IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(builder.Configuration["Jwt:Key"]))
            };
        });

builder.Services.AddAutoMapper(cfg =>
{
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
app.UseAuthentication(); // Use authentication before authorization
app.UseAuthorization();

app.MapControllers();

app.Run();
