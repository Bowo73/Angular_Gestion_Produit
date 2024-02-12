using Microsoft.AspNetCore.Mvc;

namespace Product.API.Controllers
{
    [ApiController]
    [Route("api/papers")]
    public class ProdcutController : ControllerBase
    {
        private static List<Product> _papers = new List<Product>();

        // Méthode pour créer un nouveau papier
        [HttpPost]
        public ActionResult<Product> CreatePaper(Product paper)
        {
            paper.Id = GenerateNewId();
            _papers.Add(paper);
            return CreatedAtAction(nameof(GetPaper), new { id = paper.Id }, paper);
        }

        // Méthode pour mettre à jour un papier existant
        [HttpPut("{id}")]
        public IActionResult UpdatePaper(int id, Product paper)
        {
            var existingPaper = _papers.FirstOrDefault(p => p.Id == id);

            if (existingPaper == null)
            {
                return NotFound();
            }

            existingPaper.Name = paper.Name;
            // Mettez à jour d'autres propriétés selon vos besoins

            return NoContent();
        }

        // Méthode pour supprimer un papier
        [HttpDelete("{id}")]
        public IActionResult DeletePaper(int id)
        {
            var paperToRemove = _papers.FirstOrDefault(p => p.Id == id);

            if (paperToRemove == null)
            {
                return NotFound();
            }

            _papers.Remove(paperToRemove);
            return NoContent();
        }

        // Méthode pour récupérer tous les papiers
        [HttpGet]
        public ActionResult<IEnumerable<Product>> GetAllPapers()
        {
            return _papers;
        }

        // Méthode pour récupérer un papier spécifique
        [HttpGet("{id}")]
        public ActionResult<Product> GetPaper(int id)
        {
            var paper = _papers.FirstOrDefault(p => p.Id == id);

            if (paper == null)
            {
                return NotFound();
            }

            return paper;
        }

        private int GenerateNewId()
        {
            return _papers.Count > 0 ? _papers.Max(p => p.Id) + 1 : 1;
        }
    }


}
