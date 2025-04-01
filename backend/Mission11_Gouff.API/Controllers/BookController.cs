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
    public IActionResult GetBooks(int pageHowMany = 10, int pageNum = 1, bool sortByTitleAsc = false, [FromQuery] List<string>? bookTypes = null)
    {
        var query = _context.Books.AsQueryable();

        if (bookTypes != null && bookTypes.Any())
        {
            query = query.Where(b => bookTypes.Contains(b.Category)); 
        }

        if (sortByTitleAsc)
        {
            query = query.OrderBy(b => b.Title);
        }

        // Pagination
        var books = query
            .Skip((pageNum - 1) * pageHowMany)
            .Take(pageHowMany)
            .ToList();

        var totalNumBooks = query.Count();

        string? favBook = Request.Cookies["FavoriteBook"];

        HttpContext.Response.Cookies.Append("FavoriteBook", "Les Miserables", new CookieOptions
        {
            HttpOnly = true,
            Secure = true,
            SameSite = SameSiteMode.Strict,
            Expires = DateTime.Now.AddMinutes(1)
        });

        return Ok(new
        {
            Books = books,
            TotalNumBooks = totalNumBooks,
            FavoriteBook = favBook // Include the cookie value in the response
        });
    }

    [HttpGet("GetBookCategory")]
    public IActionResult GetBookCategory()
    {
        var bookCategory = _context.Books
            .Select(b => b.Category)
            .Distinct()
            .ToList();
        
        return Ok(bookCategory);
    }
    
}
