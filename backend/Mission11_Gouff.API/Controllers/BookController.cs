using Microsoft.AspNetCore.Mvc;
using Mission11_Gouff.API.Data;

namespace Mission11_Gouff.API.Controllers;

//set the controller
[ApiController]
[Route("api/[controller]")]
public class BookController : ControllerBase
{
    //variable to be accessed in the whole method
    private BookDbContext _context;
    
    //instance from the controller 
    public BookController(BookDbContext context)
    {
        _context = context;
    }
    
    //get method
    [HttpGet("AllBooks")]
    public IActionResult GetBooks(int pageHowMany = 10, int pageNum = 1, bool sortByTitleAsc= false)
    
    //uses Queryable for sorting functionality
    {
        var query = _context.Books.AsQueryable();
        if (sortByTitleAsc)
        {
            query = query.OrderBy(b => b.Title);
        }
        
        //lets user go from page to page
        var books =query
            .Skip((pageNum - 1) * pageHowMany)
            .Take(pageHowMany)
            .ToList();
        
        var totalNumBooks = _context.Books.Count();
        
        return Ok(new
        {
            Books = books,
            TotalNumBooks = totalNumBooks
        });
    }
}
