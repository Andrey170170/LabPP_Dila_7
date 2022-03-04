using Microsoft.EntityFrameworkCore;
namespace PP_7_1.Models
{
    public class TeacherContext : DbContext
    {
        public DbSet<Teacher> Teacher { get; set; }

        public TeacherContext(DbContextOptions<TeacherContext> options) : base(options)
        {
            Database.EnsureCreated();
        }
    }
}