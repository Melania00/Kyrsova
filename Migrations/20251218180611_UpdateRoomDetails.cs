using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace TestLab.Migrations
{
    /// <inheritdoc />
    public partial class UpdateRoomDetails : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.UpdateData(
                table: "Rooms",
                keyColumn: "Id",
                keyValue: 1,
                column: "ImageUrl",
                value: "https://thumbs.dreamstime.com/b/hotel-room-one-21956245.jpg");

            migrationBuilder.UpdateData(
                table: "Rooms",
                keyColumn: "Id",
                keyValue: 2,
                column: "ImageUrl",
                value: "https://s7d9.scene7.com/is/image/kohlerhospitality/aag27393_rgb?wid=1440&wid=1440");

            migrationBuilder.UpdateData(
                table: "Rooms",
                keyColumn: "Id",
                keyValue: 3,
                columns: new[] { "Description", "ImageUrl" },
                values: new object[] { "Presidential Suite. One master bedroom and one with 2 single beds.", "https://images.unsplash.com/photo-1578683010236-d716f9a3f461?fm=jpg&q=60&w=3000&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8bHV4dXJ5JTIwaG90ZWwlMjByb29tfGVufDB8fDB8fHww" });

            migrationBuilder.UpdateData(
                table: "Rooms",
                keyColumn: "Id",
                keyValue: 4,
                column: "ImageUrl",
                value: "https://thumbs.dreamstime.com/b/hotel-standard-room-dual-bed-31076780.jpg");

            migrationBuilder.UpdateData(
                table: "Rooms",
                keyColumn: "Id",
                keyValue: 5,
                column: "ImageUrl",
                value: "https://images.trvl-media.com/lodging/3000000/2250000/2240600/2240552/c6baf43f.jpg?impolicy=resizecrop&rw=575&rh=575&ra=fill");

            migrationBuilder.UpdateData(
                table: "Rooms",
                keyColumn: "Id",
                keyValue: 6,
                column: "ImageUrl",
                value: "https://media-cdn.tripadvisor.com/media/photo-s/06/0e/94/47/family-room-4-single.jpg");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.UpdateData(
                table: "Rooms",
                keyColumn: "Id",
                keyValue: 1,
                column: "ImageUrl",
                value: "room_standard_1.jpg");

            migrationBuilder.UpdateData(
                table: "Rooms",
                keyColumn: "Id",
                keyValue: 2,
                column: "ImageUrl",
                value: "room_deluxe_2.jpg");

            migrationBuilder.UpdateData(
                table: "Rooms",
                keyColumn: "Id",
                keyValue: 3,
                columns: new[] { "Description", "ImageUrl" },
                values: new object[] { "Presidential Suite", "room_suite_3.jpg" });

            migrationBuilder.UpdateData(
                table: "Rooms",
                keyColumn: "Id",
                keyValue: 4,
                column: "ImageUrl",
                value: "room_suite_4.jpg");

            migrationBuilder.UpdateData(
                table: "Rooms",
                keyColumn: "Id",
                keyValue: 5,
                column: "ImageUrl",
                value: "room_suite_5.jpg");

            migrationBuilder.UpdateData(
                table: "Rooms",
                keyColumn: "Id",
                keyValue: 6,
                column: "ImageUrl",
                value: "room_suite_6.jpg");
        }
    }
}
