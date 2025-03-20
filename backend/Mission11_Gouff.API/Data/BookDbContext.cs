using Microsoft.EntityFrameworkCore;

namespace Mission11_Gouff.API.Data;

public class BookDbContext : DbContext //BookDbContext inherits from DbContext
{
    public BookDbContext(DbContextOptions<BookDbContext> options) : base(options) //This is the connection string from the database
    {
    }
    public DbSet<Book> Books { get; set; } 
}