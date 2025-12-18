using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

#pragma warning disable CA1814 // Prefer jagged arrays over multidimensional

namespace TestLab.Migrations
{
    /// <inheritdoc />
    public partial class AddMoreRooms : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.InsertData(
                table: "Rooms",
                columns: new[] { "Id", "Capacity", "Category", "Description", "ImageUrl", "PricePerNight" },
                values: new object[,]
                {
                    { 4, 2, 0, "Standart Double Room", "room_suite_4.jpg", 130m },
                    { 5, 4, 1, "Deluxe Family Room", "room_suite_5.jpg", 250m },
                    { 6, 4, 0, "Standart Family Room", "room_suite_6.jpg", 200m }
                });
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DeleteData(
                table: "Rooms",
                keyColumn: "Id",
                keyValue: 4);

            migrationBuilder.DeleteData(
                table: "Rooms",
                keyColumn: "Id",
                keyValue: 5);

            migrationBuilder.DeleteData(
                table: "Rooms",
                keyColumn: "Id",
                keyValue: 6);
        }
    }
}
