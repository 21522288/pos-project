using mypos_be.Models;

namespace mypos_be.Data
{
    public class SeedData
    {
        public static List<Product> Products = new()
        {
            new Product
            {
                Id = 1,
                Image = "https://png.pngtree.com/thumb_back/fw800/background/20230527/pngtree-pizza-with-vegetables-image_2681799.jpg",
                Title = "Pizza rau củ",
                Subtitle = "Large",
                Price = 230000
            },
            new Product
            {
                Id = 2,
                Image = "https://img.dominos.vn/pizza-size-s-m-bao-nhieu-cm-2.jpg",
                Title = "Pizza phô mai",
                Subtitle = "Large",
                Price = 250000
            },
            new Product
            {
                Id = 3,
                Image = "https://img.dominos.vn/pizza-size-s-m-bao-nhieu-cm-4.jpg",
                Title = "Pizza thập cẩm",
                Subtitle = "Small",
                Price = 180000
            },
            new Product
            {
                Id = 4,
                Image = "https://img.dominos.vn/pizza-size-s-m-bao-nhieu-cm-4.jpg",
                Title = "Pizza xúc xích",
                Subtitle = "Small",
                Price = 180000
            },
            new Product
            {
                Id = 5,
                Image = "https://mia.vn/media/uploads/blog-du-lich/loai-pizza-ngon-nhat-the-gioi-01-1731546200.jpg",
                Title = "Lamacun",
                Subtitle = "Large",
                Price = 200000
            },
            new Product
            {
                Id = 6,
                Image = "https://mia.vn/media/uploads/blog-du-lich/loai-pizza-ngon-nhat-the-gioi-02-1731546200.jpg",
                Title = "pizza pepperoni",
                Subtitle = "Medium",
                Price = 230000
            },
            new Product
            {
                Id = 7,
                Image = "https://mia.vn/media/uploads/blog-du-lich/loai-pizza-ngon-nhat-the-gioi-03-1731546201.jpg",
                Title = "Pizza Deep-Dish",
                Subtitle = "Small",
                Price = 180000
            },
            new Product
            {
                Id = 8,
                Image = "https://mia.vn/media/uploads/blog-du-lich/loai-pizza-ngon-nhat-the-gioi-04-1731546201.jpg",
                Title = "Pizza Bulgogi",
                Subtitle = "Small",
                Price = 170000
            },
            new Product
            {
                Id = 9,
                Image = "https://mia.vn/media/uploads/blog-du-lich/loai-pizza-ngon-nhat-the-gioi-06-1731546201.jpg",
                Title = "Pizza Marinara",
                Subtitle = "Medium",
                Price = 280000
            }
        };
    }
}
