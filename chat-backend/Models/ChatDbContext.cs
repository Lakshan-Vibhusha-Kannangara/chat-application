
using Microsoft.EntityFrameworkCore;
using MySql.EntityFrameworkCore.Extensions;

namespace chatbackend.Models
{
public class ChatDbContext : DbContext
{
    public ChatDbContext(DbContextOptions<ChatDbContext> options) : base(options)
    {
        ChatMessages = Set<ChatMessage>();
        ChatUsers = Set<ChatUser>();
    }

    public DbSet<ChatMessage> ChatMessages { get; set; }
    public DbSet<ChatUser> ChatUsers { get; set; }

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder.HasCharSet(null, DelegationModes.ApplyToDatabases);
        base.OnModelCreating(modelBuilder);

        modelBuilder.Entity<ChatMessage>()
            .HasIndex(s => s.MessageId)
            .IsUnique();
        modelBuilder.Entity<ChatUser>()
            .HasIndex(s => s.UserId)
            .IsUnique();
    }
}

}
