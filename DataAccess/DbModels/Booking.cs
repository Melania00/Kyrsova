using TestLab.Models;

namespace TestLab.DataAccess.DbModels;

public class Booking
{
    public int Id { get; set; }
    public int RoomId { get; set; }
    public int CustomerId { get; set; }
    public DateTime CheckInDate { get; set; }
    public DateTime CheckOutDate { get; set; }
    public decimal TotalPrice { get; set; }

    public BookingStatus Status { get; set; } = BookingStatus.Pending;

    // Navigation property
    public Room? Room { get; set; }
    public Customer? Customer { get; set; }
    public List<AdditionalServices> AdditionalServices { get; set; } = [];
}
