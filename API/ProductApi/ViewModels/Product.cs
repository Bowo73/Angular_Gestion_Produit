using System.ComponentModel.DataAnnotations;

namespace ProductAPI.Models
{
  public class Product
  {
    public int productId { get; set; }

    [Required]
    [MaxLength(100)]
    public string productName { get; set; }

    [Required]
    [MaxLength(50)]
    public string productTexture { get; set; }

    [Required]
    [Range(10, 1000)]
    public int productGrammage { get; set; }

    [MaxLength(25)]
    public string productColor { get; set; }
  }
}
