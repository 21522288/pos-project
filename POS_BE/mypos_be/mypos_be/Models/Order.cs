using System.ComponentModel.DataAnnotations;

namespace mypos_be.Models
{
    public class Order
    {
        [Key]
        public string? Id { get; set; } = string.Empty;

        public DateTime? OrderDate { get; set; }

        [Required]
        public ICollection<OrderItem> OrderItems { get; set; } = new List<OrderItem>();

        public static string GenerateOrderId(int nextNumber)
        {
            return $"ORD-{nextNumber}";
        }
    }
}
