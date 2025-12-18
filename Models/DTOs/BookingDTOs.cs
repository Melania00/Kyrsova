using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace TestLab.Models.DTOs;

// A simplified DTO for displaying room info within a booking
public class BookingRoomDto
{
    public int Id { get; set; }
    public string Description { get; set; } = string.Empty;
    public decimal PricePerNight { get; set; }
    public string ImageUrl { get; set; } = string.Empty;
}

// A simplified DTO for customer info
public class BookingCustomerDto
{
    public int Id { get; set; }
    public string Name { get; set; } = string.Empty;
}

public class BookingDetailsDto
{
    public int Id { get; set; }
    public DateTime CheckInDate { get; set; }
    public DateTime CheckOutDate { get; set; }
    public decimal TotalPrice { get; set; }
    public string Status { get; set; } = string.Empty;
    public BookingRoomDto? Room { get; set; }
    public BookingCustomerDto? Customer { get; set; }
    public List<AmenityDto> AdditionalServices { get; set; } = []; // Re-using AmenityDto for simplicity
}

public class CreateBookingDto
{
    [Required]
    public int RoomId { get; set; }

    [Required]
    public int CustomerId { get; set; }

    [Required]
    public DateTime CheckInDate { get; set; }

    [Required]
    public DateTime CheckOutDate { get; set; }

    public List<int> AdditionalServiceIds { get; set; } = [];

    // Custom validation to ensure check-out is after check-in
    public IEnumerable<ValidationResult> Validate(ValidationContext validationContext)
    {
        if (CheckOutDate <= CheckInDate)
        {
            yield return new ValidationResult(
                "Check-out date must be after the check-in date.",
                new[] { nameof(CheckOutDate) });
        }
    }
}