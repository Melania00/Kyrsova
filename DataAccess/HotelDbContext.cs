using Microsoft.EntityFrameworkCore;
using TestLab.DataAccess.DbModels;

namespace TestLab.DataAccess;

public class HotelDbContext : DbContext
{
    public HotelDbContext(DbContextOptions<HotelDbContext> options) : base(options)
    {
    }

    public DbSet<Room> Rooms { get; set; }
    public DbSet<Booking> Bookings { get; set; }
    public DbSet<Customer> Customers { get; set; }
    public DbSet<Amenities> Amenities { get; set; }
    public DbSet<AdditionalServices> AdditionalServices { get; set; }

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        base.OnModelCreating(modelBuilder);

        // --- Configure Relationships ---

        // One-to-Many: A Room can have many Bookings
        modelBuilder.Entity<Booking>()
            .HasOne(b => b.Room)
            .WithMany(r => r.Bookings)
            .HasForeignKey(b => b.RoomId);

        // One-to-Many: A Customer can have many Bookings
        modelBuilder.Entity<Booking>()
            .HasOne(b => b.Customer)
            .WithMany(c => c.Bookings)
            .HasForeignKey(b => b.CustomerId);

        // Many-to-Many: A Booking can have many AdditionalServices
        modelBuilder.Entity<Booking>()
            .HasMany(b => b.AdditionalServices)
            .WithMany(s => s.Bookings);

        // Many-to-Many: A Room can have many Amenities
        modelBuilder.Entity<Room>()
            .HasMany(r => r.Amenities)
            .WithMany(a => a.Rooms);


        // --- Configure Data Types ---

        modelBuilder.Entity<Room>().Property(r => r.PricePerNight).HasPrecision(10, 2);
        modelBuilder.Entity<Booking>().Property(b => b.TotalPrice).HasPrecision(10, 2);
        modelBuilder.Entity<AdditionalServices>().Property(s => s.Price).HasPrecision(10, 2);

        // --- DATA SEEDING (The script to fill tables) ---

        // 1. Seed Amenities
        modelBuilder.Entity<Amenities>().HasData(
            new Amenities { Id = 1, Name = "High-Speed Wi-Fi", Description = "Available in all rooms" },
            new Amenities { Id = 2, Name = "Mini Bar", Description = "Fully stocked with snacks and drinks" },
            new Amenities { Id = 3, Name = "Smart TV", Description = "Includes Netflix and local channels" },
            new Amenities { Id = 4, Name = "Coffee Machine", Description = "Premium espresso machine" }
        );

        // 2. Seed Additional Services
        modelBuilder.Entity<AdditionalServices>().HasData(
            new AdditionalServices { Id = 1, Name = "Airport Shuttle", Description = "One-way transfer to airport", Price = 30.00m },
            new AdditionalServices { Id = 2, Name = "Laundry Service", Description = "Same-day wash and fold", Price = 15.00m },
            new AdditionalServices { Id = 3, Name = "Breakfast in Bed", Description = "Full continental breakfast delivered", Price = 25.00m }
        );

        // 3. Seed Rooms 
        modelBuilder.Entity<Room>().HasData(
            new Room
            {
                Id = 1,
                // Cast the int to your Enum type
                Category = (TestLab.Models.Category)0,
                Description = "Standard Single Room",
                Capacity = 1,
                PricePerNight = 85.00m,
                ImageUrl = "https://thumbs.dreamstime.com/b/hotel-room-one-21956245.jpg"
            },
            new Room
            {
                Id = 2,
                Category = (TestLab.Models.Category)1,
                Description = "Deluxe Double Room",
                Capacity = 2,
                PricePerNight = 150.00m,
                ImageUrl = "https://s7d9.scene7.com/is/image/kohlerhospitality/aag27393_rgb?wid=1440&wid=1440"
            },
            new Room
            {
                Id = 3,
                Category = (TestLab.Models.Category)2,
                Description = "Presidential Suite. One master bedroom and one with 2 single beds.",
                Capacity = 4,
                PricePerNight = 500.00m,
                ImageUrl = "https://images.unsplash.com/photo-1578683010236-d716f9a3f461?fm=jpg&q=60&w=3000&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8bHV4dXJ5JTIwaG90ZWwlMjByb29tfGVufDB8fDB8fHww"
            },
            new Room
            {
                Id = 4,
                Category = (TestLab.Models.Category)0,
                Description = "Standart Double Room",
                Capacity = 2,
                PricePerNight = 130m,
                ImageUrl = "https://thumbs.dreamstime.com/b/hotel-standard-room-dual-bed-31076780.jpg"
            },
            new Room
            {
                Id = 5,
                Category = (TestLab.Models.Category)1,
                Description = "Deluxe Family Room",
                Capacity = 4,
                PricePerNight = 250m,
                ImageUrl = "https://images.trvl-media.com/lodging/3000000/2250000/2240600/2240552/c6baf43f.jpg?impolicy=resizecrop&rw=575&rh=575&ra=fill"
            },
            new Room
            {
                Id = 6,
                Category = (TestLab.Models.Category)0,
                Description = "Standart Family Room",
                Capacity = 4,
                PricePerNight = 200m,
                ImageUrl = "https://media-cdn.tripadvisor.com/media/photo-s/06/0e/94/47/family-room-4-single.jpg"
            }
        );

        // Seed the Join Table (AmenitiesRoom)
        modelBuilder.Entity("AmenitiesRoom").HasData(
            // Standard Room (Room Id 1) - Only Wi-Fi (Id 1)
            new { AmenitiesId = 1, RoomsId = 1 },

            // Deluxe Room (Room Id 2) - Wi-Fi (1) and Mini Bar (2)
            new { AmenitiesId = 1, RoomsId = 2 },
            new { AmenitiesId = 2, RoomsId = 2 },

            // Presidential Room (Room Id 3) - All Amenities (1, 2, 3, 4)
            new { AmenitiesId = 1, RoomsId = 3 },
            new { AmenitiesId = 2, RoomsId = 3 },
            new { AmenitiesId = 3, RoomsId = 3 },
            new { AmenitiesId = 4, RoomsId = 3 }
        );
    }
}