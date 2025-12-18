namespace TestLab.DataAccess.DbModels;

public class AdditionalServices
{
    public int Id { get; set; }
    public string Name { get; set; } = string.Empty;
    public string Description { get; set; } = string.Empty;
    public decimal Price { get; set; }

    public List<Booking> Bookings { get; set; } = [];
}
