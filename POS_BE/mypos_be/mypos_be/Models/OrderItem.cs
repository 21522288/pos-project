using System.ComponentModel.DataAnnotations;
using System.Text.Json.Serialization;

namespace mypos_be.Models
{
    public class OrderItem
    {
        public int ProductId { get; set; }
        
        public Product? Product { get; set; } = null!;

        public string OrderId { get; set; } = string.Empty;
   
        public Order? Order { get; set; } = null!;

        [Required]
        public string Name { get; set; } = string.Empty;

        [Required]
        public int Qty { get; set; }

        [Required]
        public decimal Price { get; set; }

    }
}
