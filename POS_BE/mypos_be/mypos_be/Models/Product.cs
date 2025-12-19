using System.ComponentModel.DataAnnotations;

namespace mypos_be.Models
{
    public class Product
    {
        public int Id { get; set; }

        [Required]
        public string Image { get; set; } = string.Empty;

        [Required]
        public string Title { get; set; } = string.Empty;

        [Required]
        public string Subtitle { get; set; } = string.Empty;

        [Required]
        public decimal Price { get; set; }

        public ICollection<OrderItem> OrderItems { get; set; } = new List<OrderItem>();
    }
}
//dotnet ef migrations add InitialCreate
//dotnet ef database update