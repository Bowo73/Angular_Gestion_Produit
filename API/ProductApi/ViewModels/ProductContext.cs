using Microsoft.EntityFrameworkCore;
using static ProductAPI.Models.Product;

namespace ProductAPI.Models
{
  public class ProductContext : DbContext
  {
    public DbSet<Product> Products { get; set; }

    public ProductContext(DbContextOptions<ProductContext> options) : base(options)
    {
    }

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
      base.OnModelCreating(modelBuilder);

      // Configure the entity
      modelBuilder.Entity<Product>().ToTable("products");

      // Configure primary key
      modelBuilder.Entity<Product>().HasKey(p => p.productId);

      // Configure other properties
      modelBuilder.Entity<Product>().Property(p => p.productName).IsRequired();
      modelBuilder.Entity<Product>().Property(p => p.productTexture).IsRequired();
      modelBuilder.Entity<Product>().Property(p => p.productGrammage).IsRequired();
      modelBuilder.Entity<Product>().Property(p => p.productColor).IsRequired();
    }
  }
}
