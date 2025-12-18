using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using TestLab.DataAccess;
using TestLab.DataAccess.DbModels;


namespace TestLab.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class CustomersController : ControllerBase
    {
        private readonly HotelDbContext _context;

        public CustomersController(HotelDbContext context)
        {
            _context = context;
        }

        // POST: api/customers
        [HttpPost]
        public async Task<ActionResult<Customer>> RegisterCustomer(Customer customer)
        {
            // 1. Add the new customer object to the Change Tracker
            _context.Customers.Add(customer);

            // 2. This is the "magic" command that generates the SQL INSERT 
            // and sends it to MySQL Workbench
            await _context.SaveChangesAsync();

            return CreatedAtAction(nameof(GetCustomer), new { id = customer.Id }, customer);
        }

        // GET: api/customers/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Customer>> GetCustomer(int id)
        {
            var customer = await _context.Customers.FindAsync(id);

            if (customer == null) return NotFound();

            return customer;
        }
    }
}