using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using TestLab.DataAccess;
using TestLab.DataAccess.DbModels;
using TestLab.Models;
using TestLab.Models.DTOs;

namespace TestLab.Controllers;

[Route("api/[controller]")]
[ApiController]
public class RoomController : ControllerBase
{
    private readonly HotelDbContext _context;

    public RoomController(HotelDbContext context)
    {
        _context = context;
    }

    // GET: api/room
    // Gets rooms with advanced filtering
    [HttpGet]
    public async Task<ActionResult<IEnumerable<RoomDto>>> GetRooms(
        [FromQuery] Category? category,
        [FromQuery] int? minCapacity,
        [FromQuery] decimal? maxPrice)
    {
        // Start with a queryable object including amenities
        var query = _context.Rooms
            .Include(r => r.Amenities)
            .AsQueryable();

        // Apply filters conditionally
        if (category.HasValue)
        {
            query = query.Where(r => r.Category == category.Value);
        }

        if (minCapacity.HasValue)
        {
            query = query.Where(r => r.Capacity >= minCapacity.Value);
        }

        if (maxPrice.HasValue)
        {
            query = query.Where(r => r.PricePerNight <= maxPrice.Value);
        }

        // Project the final result to RoomDto to avoid sending database models to the client
        var rooms = await query.Select(r => new RoomDto
        {
            Id = r.Id,
            Category = r.Category,
            Description = r.Description,
            Capacity = r.Capacity,
            PricePerNight = r.PricePerNight,
            ImageUrl = r.ImageUrl,
            Amenities = r.Amenities.Select(a => new AmenityDto { Id = a.Id, Name = a.Name }).ToList()
        })
            .ToListAsync();

        return Ok(rooms);
    }

    // GET: api/room/5
    [HttpGet("{id}")]
    public async Task<ActionResult<RoomDto>> GetRoom(int id)
    {
        var room = await _context.Rooms
            .Include(r => r.Amenities)
            .Select(r => new RoomDto
            {
                Id = r.Id,
                Category = r.Category,
                Description = r.Description,
                Capacity = r.Capacity,
                PricePerNight = r.PricePerNight,
                ImageUrl = r.ImageUrl,
                Amenities = r.Amenities.Select(a => new AmenityDto { Id = a.Id, Name = a.Name }).ToList()
            })
            .FirstOrDefaultAsync(r => r.Id == id);

        if (room == null)
        {
            return NotFound(); // Returns a 404 Not Found response
        }

        return Ok(room);
    }

    // POST: api/room
    [HttpPost]
    public async Task<ActionResult<RoomDto>> CreateRoom(CreateRoomDto createRoomDto)
    {
        var room = new Room
        {
            Category = createRoomDto.Category,
            Description = createRoomDto.Description,
            Capacity = createRoomDto.Capacity,
            PricePerNight = createRoomDto.PricePerNight,
            ImageUrl = createRoomDto.ImageUrl
        };

        // Find amenities from the database based on the provided IDs
        if (createRoomDto.AmenityIds.Any())
        {
            var amenities = await _context.Amenities
                .Where(a => createRoomDto.AmenityIds.Contains(a.Id))
                .ToListAsync();
            room.Amenities = amenities;
        }

        _context.Rooms.Add(room);
        await _context.SaveChangesAsync();

        // Use the GetRoom action to return the newly created room, following RESTful principles
        return CreatedAtAction(nameof(GetRoom), new { id = room.Id }, room);
    }

    // PUT: api/room/5
    [HttpPut("{id}")]
    public async Task<IActionResult> UpdateRoom(int id, CreateRoomDto updateRoomDto)
    {
        var roomToUpdate = await _context.Rooms
            .Include(r => r.Amenities)
            .FirstOrDefaultAsync(r => r.Id == id);

        if (roomToUpdate == null)
        {
            return NotFound();
        }

        // Update properties
        roomToUpdate.Category = updateRoomDto.Category;
        roomToUpdate.Description = updateRoomDto.Description;
        roomToUpdate.Capacity = updateRoomDto.Capacity;
        roomToUpdate.PricePerNight = updateRoomDto.PricePerNight;
        roomToUpdate.ImageUrl = updateRoomDto.ImageUrl;

        // Update amenities
        roomToUpdate.Amenities.Clear();
        if (updateRoomDto.AmenityIds.Any())
        {
            var amenities = await _context.Amenities
                .Where(a => updateRoomDto.AmenityIds.Contains(a.Id))
                .ToListAsync();
            roomToUpdate.Amenities = amenities;
        }

        try
        {
            await _context.SaveChangesAsync();
        }
        catch (DbUpdateConcurrencyException)
        {
            // This exception occurs if the record was modified by another user
            // after you fetched it. Check if it still exists.
            if (!_context.Rooms.Any(e => e.Id == id))
            {
                return NotFound();
            }
            else
            {
                throw;
            }
        }

        return NoContent(); // Returns a 204 No Content response on successful update
    }


    // DELETE: api/room/5
    [HttpDelete("{id}")]
    public async Task<IActionResult> DeleteRoom(int id)
    {
        var room = await _context.Rooms.FindAsync(id);
        if (room == null)
        {
            return NotFound();
        }

        _context.Rooms.Remove(room);
        await _context.SaveChangesAsync();

        return NoContent();
    }
}