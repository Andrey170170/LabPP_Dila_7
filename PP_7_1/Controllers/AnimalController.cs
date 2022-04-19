using PP_7_1.Models;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace PP_7_1.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AnimalController : ControllerBase
    {
        private AnimalContext? _db;

        public AnimalController(AnimalContext animalContext)
        {
            _db = animalContext;
        }

        // GET: api/<AnimalController>
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Animal>>> Get()
        {
            return await _db.Animals.ToListAsync();
        }

        // GET api/<AnimalController>/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Animal>> Get(int id)
        {
            Animal animal = await _db.Animals.FirstOrDefaultAsync(x => x.Id == id);
            if (animal == null)
                return NotFound();
            return new ObjectResult(animal);
        }

        // POST api/<AnimalController>
        [HttpPost]
        public async Task<ActionResult<Animal>> Post(Animal animal)
        {
            if (animal == null)
            {
                return BadRequest();
            }

            _db.Animals.Add(animal);
            await _db.SaveChangesAsync();
            return Ok(animal);
        }

        // PUT api/<AnimalController>/5
        [HttpPut("{id}")]
        public async Task<ActionResult<Animal>> Put(Animal animal)
        {
            if (animal == null)
            {
                return BadRequest();
            }

            if (!_db.Animals.Any(x => x.Id == animal.Id))
            {
                return NotFound();
            }

            _db.Update(animal);
            await _db.SaveChangesAsync();
            return Ok(animal);
        }

        // DELETE api/<TeacherController>/5
        [HttpDelete("{id}")]
        public async Task<ActionResult<Animal>> Delete(int id)
        {
            Animal animal = _db.Animals.FirstOrDefault(x => x.Id == id);
            if (animal == null)
            {
                return NotFound();
            }

            _db.Animals.Remove(animal);
            await _db.SaveChangesAsync();
            return Ok(animal);
            ;
        }
    }
}