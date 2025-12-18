using System.ComponentModel.DataAnnotations;

namespace TestLab.Models.DTOs;

public class CreateRoomDto
{
    [Required]
    public Category Category { get; set; }

    public string Description { get; set; } = string.Empty;

    [Required]
    [Range(1, 10)]
    public int Capacity { get; set; }

    [Required]
    [Range(1, 10000)]
    public decimal PricePerNight { get; set; }

    public string ImageUrl { get; set; } = string.Empty;

    // We'll pass a list of IDs for existing amenities to associate
    public List<int> AmenityIds { get; set; } = [];
}
