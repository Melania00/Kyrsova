namespace TestLab.DataAccess.DbModels;

public class Customer
{
    public int Id { get; set; }
    public string Name { get; set; } = string.Empty;
    public string Email { get; set; } = string.Empty;
    public string PhoneNumber { get; set; } = string.Empty;
    public int BonusPoints { get; set; } = 0;

    // Navigation property
    public ICollection<Booking> Bookings { get; set; } = [];
}
