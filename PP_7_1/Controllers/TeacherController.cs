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
    public class TeacherController : ControllerBase
    {
        private TeacherContext? _db;

        public TeacherController(TeacherContext teacherContext)
        {
            _db = teacherContext;
        }

        // GET: api/<TeacherController>
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Teacher>>> Get()
        {
            return await _db.Teacher.ToListAsync();
        }

        // GET api/<TeacherController>/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Teacher>> Get(int id)
        {
            Teacher teacher = await _db.Teacher.FirstOrDefaultAsync(x => x.TeacherID == id);
            if (teacher == null)
                return NotFound();
            return new ObjectResult(teacher);
        }

        // POST api/<TeacherController>
        [HttpPost]
        public async Task<ActionResult<Teacher>> Post(Teacher teacher)
        {
            if (teacher == null)
            {
                return BadRequest();
            }

            _db.Teacher.Add(teacher);
            await _db.SaveChangesAsync();
            return Ok(teacher);
        }

        // PUT api/<TeacherController>/5
        [HttpPut("{id}")]
        public async Task<ActionResult<Teacher>> Put(Teacher teacher)
        {
            if (teacher == null)
            {
                return BadRequest();
            }

            if (!_db.Teacher.Any(x => x.TeacherID == teacher.TeacherID))
            {
                return NotFound();
            }

            _db.Update(teacher);
            await _db.SaveChangesAsync();
            return Ok(teacher);
        }

        // DELETE api/<TeacherController>/5
        [HttpDelete("{id}")]
        public async Task<ActionResult<Teacher>> Delete(int id)
        {
            Teacher teacher = _db.Teacher.FirstOrDefault(x => x.TeacherID == id);
            if (teacher == null)
            {
                return NotFound();
            }

            _db.Teacher.Remove(teacher);
            await _db.SaveChangesAsync();
            return Ok(teacher);
            ;
        }
    }
}