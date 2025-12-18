using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using TestLab.DataAccess;
using TestLab.DataAccess.DbModels;
using TestLab.Models;
using TestLab.Models.DTOs;

namespace TestLab.Controllers;

[Route("api/[controller]")]
[ApiController]
public class BookingController : ControllerBase
{
    private readonly HotelDbContext _context;

    public BookingController(HotelDbContext context)
    {
        _context = context;
    }

    // GET: api/booking/customer/5
    /// <summary>
    /// Gets the booking history for a specific customer.
    /// </summary>
    [HttpGet("customer/{customerId}")]
    public async Task<ActionResult<IEnumerable<BookingDetailsDto>>> GetCustomerBookings(int customerId)
    {
        var bookings = await _context.Bookings
            .Include(b => b.Room)
            .Include(b => b.AdditionalServices)
            .Include(b => b.Customer)
            .Where(b => b.CustomerId == customerId)
            .Select(b => new BookingDetailsDto
            {
                Id = b.Id,
                CheckInDate = b.CheckInDate,
                CheckOutDate = b.CheckOutDate,
                TotalPrice = b.TotalPrice,
                Status = b.Status.ToString(),
                Room = b.Room != null ? new BookingRoomDto { Id = b.Room.Id, Description = b.Room.Description, PricePerNight = b.Room.PricePerNight } : null,
                Customer = b.Customer != null ? new BookingCustomerDto { Id = b.Customer.Id, Name = b.Customer.Name } : null,
                AdditionalServices = b.AdditionalServices.Select(s => new AmenityDto { Id = s.Id, Name = s.Name }).ToList()
            })
            .ToListAsync();

        if (!bookings.Any())
        {
            return NotFound("No bookings found for this customer.");
        }

        return Ok(bookings);
    }


    // POST: api/booking
    /// <summary>
    /// Creates a new booking after checking for room availability.
    /// </summary>
    [HttpPost]
    public async Task<ActionResult<BookingDetailsDto>> CreateBooking(CreateBookingDto createBookingDto)
    {
        // 1. Find the requested room
        var room = await _context.Rooms.FindAsync(createBookingDto.RoomId);
        if (room == null)
        {
            return BadRequest("The selected room does not exist.");
        }

        // 2. Check for booking conflicts
        var isUnavailable = await _context.Bookings
            .AnyAsync(b =>
                b.RoomId == createBookingDto.RoomId &&
                b.Status != BookingStatus.Cancelled && // Ignore cancelled bookings
                createBookingDto.CheckInDate < b.CheckOutDate && // New booking starts before old one ends
                createBookingDto.CheckOutDate > b.CheckInDate);  // New booking ends after old one starts

        if (isUnavailable)
        {
            return Conflict("This room is unavailable for the selected dates."); // 409 Conflict
        }

        // 3. Calculate total price
        var numberOfNights = (createBookingDto.CheckOutDate - createBookingDto.CheckInDate).Days;
        var totalRoomPrice = numberOfNights * room.PricePerNight;
        decimal servicesPrice = 0;

        // Fetch additional services and add their prices
        var additionalServices = new List<AdditionalServices>();
        if (createBookingDto.AdditionalServiceIds.Any())
        {
            additionalServices = await _context.AdditionalServices
                .Where(s => createBookingDto.AdditionalServiceIds.Contains(s.Id))
                .ToListAsync();
            servicesPrice = additionalServices.Sum(s => s.Price);
        }

        // 4. Create the Booking entity
        var booking = new Booking
        {
            RoomId = createBookingDto.RoomId,
            CustomerId = createBookingDto.CustomerId,
            CheckInDate = createBookingDto.CheckInDate,
            CheckOutDate = createBookingDto.CheckOutDate,
            Status = BookingStatus.Confirmed,
            TotalPrice = totalRoomPrice + servicesPrice,
            AdditionalServices = additionalServices
        };

        _context.Bookings.Add(booking);
        await _context.SaveChangesAsync();

        // 5. Return the created booking details
        // You would typically map this to a DTO, but for brevity, we'll manually create it.
        var bookingDetails = new BookingDetailsDto
        {
            Id = booking.Id,
            CheckInDate = booking.CheckInDate,
            CheckOutDate = booking.CheckOutDate,
            TotalPrice = booking.TotalPrice,
            Status = booking.Status.ToString(),
            Room = new BookingRoomDto { Id = room.Id, Description = room.Description, PricePerNight = room.PricePerNight },
            AdditionalServices = additionalServices.Select(s => new AmenityDto { Id = s.Id, Name = s.Name }).ToList()
        };

        return CreatedAtAction(nameof(GetCustomerBookings), new { customerId = booking.CustomerId }, bookingDetails);
    }
}