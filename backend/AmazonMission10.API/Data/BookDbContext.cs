using Microsoft.EntityFrameworkCore;

namespace AmazonMission11.API.Data
{
    public class BookDbContext : DbContext
    {
        public BookDbContext(DbContextOptions<BookDbContext> options) : base(options)
        {
        }
        public DbSet<Book> Books { get; set; }

    }
}
