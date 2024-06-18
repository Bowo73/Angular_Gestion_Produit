using System.Collections.Generic;
using System.Linq;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using ProductAPI.Models;

namespace ProductAPI.Controllers
{
  [Route("api/[controller]")]
  [ApiController]
  public class ProductsController : ControllerBase
  {
    private readonly ProductContext _context;

    public ProductsController(ProductContext context)
    {
      _context = context;
    }

    [HttpGet] [Authorize]
    public ActionResult<IEnumerable<Product>> GetProducts()
    {
      return _context.Products.ToList();
    }

    [HttpGet("{id}")]
    public ActionResult<Product> GetProductById(int id)
    {
      var product = _context.Products.Find(id);
      if (product == null)
      {
        return NotFound();
      }
      return product;
    }

    [HttpPost]
    public ActionResult<Product> CreateProduct(Product product)
    {
      _context.Products.Add(product);
      _context.SaveChanges();
      return CreatedAtAction(nameof(GetProductById), new { id = product.productId }, product);
    }

    [HttpPut("{id}")]
    public IActionResult UpdateProduct(int id, Product product)
    {
      if (id != product.productId)
      {
        return BadRequest();
      }
      _context.Entry(product).State = EntityState.Modified;
      _context.SaveChanges();
      return NoContent();
    }

    [HttpDelete("{id}")]
    public IActionResult DeleteProduct(int id)
    {
      var product = _context.Products.Find(id);
      if (product == null)
      {
        return NotFound();
      }
      _context.Products.Remove(product);
      _context.SaveChanges();
      return NoContent();
    }
  }


}
