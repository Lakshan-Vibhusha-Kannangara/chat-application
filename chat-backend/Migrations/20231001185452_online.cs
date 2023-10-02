using System;
using Microsoft.EntityFrameworkCore.Metadata;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace chat_backend.Migrations
{
    /// <inheritdoc />
    public partial class online : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
        name: "ChatUsers",
        columns: table => new
        {
            UserId = table.Column<int>(type: "int", nullable: false)
                .Annotation("MySql:ValueGenerationStrategy", MySqlValueGenerationStrategy.IdentityColumn),
            Name = table.Column<string>(type: "varchar(255)", maxLength: 255, nullable: false),
            Email = table.Column<string>(type: "longtext", nullable: true),
            Avatar = table.Column<string>(type: "longtext", nullable: true),
            CreatedDate = table.Column<DateTime>(type: "datetime", nullable: true),
            Password = table.Column<string>(type: "longtext", nullable: true),
            Token = table.Column<string>(type: "longtext", nullable: true)
        },
        constraints: table =>
        {
            table.PrimaryKey("PK_ChatUsers", x => x.UserId);
        });

       migrationBuilder.CreateTable(
    name: "ChatMessages",
    columns: table => new
    {
        MessageId = table.Column<int>(type: "int", nullable: false)
            .Annotation("MySql:ValueGenerationStrategy", MySqlValueGenerationStrategy.IdentityColumn),
        SenderId = table.Column<int>(type: "int", nullable: false),
        RecipientId = table.Column<int>(type: "int", nullable: false),
        Text = table.Column<string>(type: "varchar(255)", maxLength: 255, nullable: false),
        Attachment = table.Column<string>(type: "longtext", nullable: true),
        Timestamp = table.Column<DateTime>(type: "datetime", nullable: false) // Change data type to "datetime"
    },
    constraints: table =>
    {
        table.PrimaryKey("PK_ChatMessages", x => x.MessageId);
        table.ForeignKey(
            name: "FK_ChatMessages_ChatUsers_RecipientId",
            column: x => x.RecipientId,
            principalTable: "ChatUsers",
            principalColumn: "UserId",
            onDelete: ReferentialAction.Cascade);
        table.ForeignKey(
            name: "FK_ChatMessages_ChatUsers_SenderId",
            column: x => x.SenderId,
            principalTable: "ChatUsers",
            principalColumn: "UserId",
            onDelete: ReferentialAction.Cascade);
    });


            migrationBuilder.CreateIndex(
                name: "IX_ChatMessages_MessageId",
                table: "ChatMessages",
                column: "MessageId",
                unique: true);

            migrationBuilder.CreateIndex(
                name: "IX_ChatMessages_RecipientId",
                table: "ChatMessages",
                column: "RecipientId");

            migrationBuilder.CreateIndex(
                name: "IX_ChatMessages_SenderId",
                table: "ChatMessages",
                column: "SenderId");

            migrationBuilder.CreateIndex(
                name: "IX_ChatUsers_UserId",
                table: "ChatUsers",
                column: "UserId",
                unique: true);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "ChatMessages");

            migrationBuilder.DropTable(
                name: "ChatUsers");
        }
    }
}
