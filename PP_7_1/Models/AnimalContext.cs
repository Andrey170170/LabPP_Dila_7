using Microsoft.EntityFrameworkCore;
namespace PP_7_1.Models
{
    public class AnimalContext : DbContext
    {
        public DbSet<Animal> Animals { get; set; }

        public AnimalContext(DbContextOptions<AnimalContext> options) : base(options)
        {
            Database.EnsureCreated();
        }
    }
}