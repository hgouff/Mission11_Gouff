using Microsoft.EntityFrameworkCore;

namespace Mission11_Gouff.API.Data;

public class BookDbContext : DbContext
{
    public BookDbContext(DbContextOptions<BookDbContext> options) : base(options)
    {
    }
    public DbSet<Book> Books { get; set; }
}