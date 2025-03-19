using Microsoft.AspNetCore.Mvc;
using Mission11_Gouff.API.Data;

namespace Mission11_Gouff.API.Controllers;

[ApiController]
[Route("api/[controller]")]
public class BookController : ControllerBase
{
    private BookDbContext _context;
    
    public BookController(BookDbContext context)
    {
        _context = context;
    }
    
    [HttpGet("AllBooks")]
    public IEnumerable<Book> GetBooks()
    {
        return _context.Books.ToList();
    }
}
