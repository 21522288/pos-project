using Microsoft.AspNetCore.SignalR;
using Microsoft.EntityFrameworkCore;
using mypos_be.Data;
using mypos_be.Models;
using mypos_be.Hubs;
public class OrderService
{
    private readonly AppDbContext _context;
    private readonly IHubContext<OrderHub> _hubContext;

    public OrderService(AppDbContext context, IHubContext<OrderHub> hubContext)
    {
        _context = context;
        _hubContext = hubContext;
    }
    public async Task<List<object>> GetAllAsync()
    {
        var orders = await _context.Orders
            .Include(o => o.OrderItems)
            .OrderByDescending(o => o.OrderDate)
            .ToListAsync();

        return orders.Select(o => new
        {
            id = o.Id,
            date = o.OrderDate,
            items = o.OrderItems.Select(i => new
            {
                productId = i.ProductId,
                name = i.Name,
                qty = i.Qty,
                price = i.Price
            })
        }).ToList<object>();
    }

    public async Task<Order> CreateAsync(Order order)
    {
        if (order == null || !order.OrderItems.Any())
        {
            throw new Exception("Order items cannot be empty");
        }

        var lastOrder = _context.Orders
               .OrderByDescending(o => o.Id)
               .FirstOrDefault();

        int nextNumber = 1;

        if (lastOrder != null)
        {
            var numberPart = lastOrder.Id.Replace("ORD-", "");
            nextNumber = int.Parse(numberPart) + 1;
        }
        order.Id = Order.GenerateOrderId(nextNumber);
        order.OrderDate = DateTime.Now;

        // Gắn OrderId cho OrderItem
        foreach (var item in order.OrderItems)
        {
            item.OrderId = order.Id;
        }

        _context.Orders.Add(order);
        await _context.SaveChangesAsync();

        // 🔔 Gửi thông báo realtime
        var data = new
        {
            id = order.Id,
            date = order.OrderDate,
            items = order.OrderItems.Select(i => new
            {
                productId = i.ProductId,
                name = i.Name,
                qty = i.Qty,
                price = i.Price
            }).ToList()
        };
        await _hubContext.Clients.All
            .SendAsync("OrderCreated", data);

        return order;
    }
}
