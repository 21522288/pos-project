using Microsoft.AspNetCore.Mvc;
using mypos_be.Data;
using mypos_be.Models;

namespace mypos_be.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class OrdersController : ControllerBase
    {
        private readonly OrderService _orderService;

        public OrdersController(OrderService orderService)
        {
            _orderService = orderService;
        }

        [HttpPost]
        public async Task<IActionResult> Create([FromBody] Order order)
        {
            try
            {
                var result = await _orderService.CreateAsync(order);
                return Ok(new
                {
                    orderId = result.Id,
                });
            }
            catch (Exception ex)
            {
                return StatusCode(500, new
                {
                    message = "An error occurred while creating order",
                    detail = ex.Message
                });
            }
        }

        [HttpGet]
        public async Task<IActionResult> GetAll()
        {
            try
            {
                var orders = await _orderService.GetAllAsync();
                return Ok(orders);
            }
            catch (Exception ex)
            {
                return StatusCode(500, new
                {
                    message = "An error occurred while fetching orders",
                    detail = ex.Message
                });
            }
        }
    }
}
