namespace TestLab.DataAccess.DbModels;

public class Amenities
{
    public int Id { get; set; }
    public string Name { get; set; } = string.Empty;
    public string Description { get; set; } = string.Empty;
    public List<Room> Rooms { get; set; } = [];
}
