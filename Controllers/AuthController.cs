using BCrypt.Net;
using Microsoft.AspNetCore.Mvc;
using Microsoft.IdentityModel.Tokens; 
using System.IdentityModel.Tokens.Jwt; 
using System.Security.Claims;
using System.Text;
using TestLab.DataAccess;
using TestLab.DataAccess.DbModels;
using TestLab.DTOs;

namespace TestLab.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AuthController : ControllerBase
    {
        // Replace 'AppDbContext' with the actual name of your DbContext class
        private readonly HotelDbContext _context;
        private readonly IConfiguration _config;

        public AuthController(HotelDbContext context, IConfiguration config)
        {
            _context = context;
            _config = config;
        }

        [HttpPost("register")]
        public IActionResult Register([FromBody] RegisterDto model)
        {
            if (_context.Customers.Any(c => c.Email == model.Email))
                return BadRequest(new { message = "Email is already taken" });

            // Logic: Specific email domain gets Admin rights
            string assignedRole = model.Email.EndsWith("@hotel.com") ? "Admin" : "Client";

            var customer = new Customer
            {
                Name = model.Name,
                Email = model.Email,
                PhoneNumber = model.PhoneNumber,
                PasswordHash = BCrypt.Net.BCrypt.HashPassword(model.Password),
                Role = assignedRole,
                BonusPoints = 0
            };

            _context.Customers.Add(customer);
            _context.SaveChanges();

            return Ok(new { message = "Registration successful" });
        }

        [HttpPost("login")]
        public IActionResult Login([FromBody] LoginDto model)
        {
            var customer = _context.Customers.FirstOrDefault(c => c.Email == model.Email);

            if (customer == null || !BCrypt.Net.BCrypt.Verify(model.Password, customer.PasswordHash))
            {
                return Unauthorized(new { message = "Invalid email or password" });
            }

            var token = GenerateJwtToken(customer);

            var session = new CustomerSessionDto(
                customer.Id,
                customer.Name,
                customer.Email,
                customer.Role,
                customer.BonusPoints
            );

            return Ok(new AuthResponseDto(token, session));
        }

        private string GenerateJwtToken(Customer customer)
        {
            var securityKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_config["Jwt:Key"]!));
            var credentials = new SigningCredentials(securityKey, SecurityAlgorithms.HmacSha256);

            var claims = new[]
            {
                new Claim(ClaimTypes.NameIdentifier, customer.Id.ToString()),
                new Claim(ClaimTypes.Email, customer.Email),
                new Claim(ClaimTypes.Role, customer.Role),
                new Claim("Name", customer.Name)
            };

            var token = new JwtSecurityToken(
                issuer: _config["Jwt:Issuer"],
                audience: _config["Jwt:Audience"],
                claims: claims,
                expires: DateTime.Now.AddDays(1),
                signingCredentials: credentials);

            return new JwtSecurityTokenHandler().WriteToken(token);
        }
    }
}