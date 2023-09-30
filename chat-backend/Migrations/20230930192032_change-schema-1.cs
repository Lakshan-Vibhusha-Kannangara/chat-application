using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace chat_backend.Migrations
{
    /// <inheritdoc />
    public partial class changeschema1 : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<DateTime>(
                name: "CreatedDate",
                table: "ChatUsers",
                type: "datetime(6)",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "Password",
                table: "ChatUsers",
                type: "longtext",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "Token",
                table: "ChatUsers",
                type: "longtext",
                nullable: true);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "CreatedDate",
                table: "ChatUsers");

            migrationBuilder.DropColumn(
                name: "Password",
                table: "ChatUsers");

            migrationBuilder.DropColumn(
                name: "Token",
                table: "ChatUsers");
        }
    }
}
