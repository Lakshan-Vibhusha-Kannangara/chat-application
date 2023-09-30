using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace chat_backend.Migrations
{
    /// <inheritdoc />
    public partial class changeschema3 : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "Email",
                table: "ChatUsers",
                type: "longtext",
                nullable: true);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Email",
                table: "ChatUsers");
        }
    }
}
