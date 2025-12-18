using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

#pragma warning disable CA1814 // Prefer jagged arrays over multidimensional

namespace TestLab.Migrations
{
    /// <inheritdoc />
    public partial class SeedAmenitiesToRooms : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.InsertData(
                table: "AmenitiesRoom",
                columns: new[] { "AmenitiesId", "RoomsId" },
                values: new object[,]
                {
                    { 1, 1 },
                    { 1, 2 },
                    { 1, 3 },
                    { 2, 2 },
                    { 2, 3 },
                    { 3, 3 },
                    { 4, 3 }
                });
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DeleteData(
                table: "AmenitiesRoom",
                keyColumns: new[] { "AmenitiesId", "RoomsId" },
                keyValues: new object[] { 1, 1 });

            migrationBuilder.DeleteData(
                table: "AmenitiesRoom",
                keyColumns: new[] { "AmenitiesId", "RoomsId" },
                keyValues: new object[] { 1, 2 });

            migrationBuilder.DeleteData(
                table: "AmenitiesRoom",
                keyColumns: new[] { "AmenitiesId", "RoomsId" },
                keyValues: new object[] { 1, 3 });

            migrationBuilder.DeleteData(
                table: "AmenitiesRoom",
                keyColumns: new[] { "AmenitiesId", "RoomsId" },
                keyValues: new object[] { 2, 2 });

            migrationBuilder.DeleteData(
                table: "AmenitiesRoom",
                keyColumns: new[] { "AmenitiesId", "RoomsId" },
                keyValues: new object[] { 2, 3 });

            migrationBuilder.DeleteData(
                table: "AmenitiesRoom",
                keyColumns: new[] { "AmenitiesId", "RoomsId" },
                keyValues: new object[] { 3, 3 });

            migrationBuilder.DeleteData(
                table: "AmenitiesRoom",
                keyColumns: new[] { "AmenitiesId", "RoomsId" },
                keyValues: new object[] { 4, 3 });
        }
    }
}
