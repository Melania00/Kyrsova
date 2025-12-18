using TestLab.Models;

namespace TestLab.DataAccess.DbModels;

public class Room
{
    public int Id { get; set; }
    public Category Category { get; set; }
    public string Description { get; set; } = string.Empty;
    public int Capacity { get; set; }
    public decimal PricePerNight { get; set; }
    public string ImageUrl { get; set; } = string.Empty;

    // Navigation properties
    public List<Amenities> Amenities { get; set; } = [];
    public ICollection<Booking> Bookings { get; set; } = [];
}
