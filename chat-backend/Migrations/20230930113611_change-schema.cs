using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace chat_backend.Migrations
{
    /// <inheritdoc />
    public partial class changeschema : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "Attachment",
                table: "ChatMessages",
                type: "longtext",
                nullable: true);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Attachment",
                table: "ChatMessages");
        }
    }
}
