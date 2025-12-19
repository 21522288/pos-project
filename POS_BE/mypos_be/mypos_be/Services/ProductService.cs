using Microsoft.EntityFrameworkCore;
using mypos_be.Data;
using mypos_be.Models;

namespace mypos_be.Services
{
    public class ProductService
    {
        private readonly AppDbContext _context;

        public ProductService(AppDbContext context)
        {
            _context = context;
        }

        public async Task<List<Product>> GetAllAsync()
        {
            return await _context.Products.ToListAsync();
        }
    }
}
