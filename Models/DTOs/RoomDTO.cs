namespace TestLab.Models.DTOs;

public class RoomDto
{
    public int Id { get; set; }
    public Category Category { get; set; }
    public string Description { get; set; } = string.Empty;
    public int Capacity { get; set; }
    public decimal PricePerNight { get; set; }
    public string ImageUrl { get; set; } = string.Empty;
    public List<AmenityDto> Amenities { get; set; } = [];
}
