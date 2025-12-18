namespace TestLab.DTOs
{
    public record RegisterDto(
        string Name,
        string Email,
        string Password,
        string PhoneNumber
    );

    public record LoginDto(
        string Email,
        string Password
    );

    public record AuthResponseDto(
        string Token,
        CustomerSessionDto User
    );

    public record CustomerSessionDto(
        int Id,
        string Name,
        string Email,
        string Role,
        int BonusPoints
    );
}