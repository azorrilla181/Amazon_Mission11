using AmazonMission11.API.Data;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace AmazonMission11.API.Controllers
{
    [Route("[controller]")]
    [ApiController]
    public class BookController : ControllerBase
    {
        private BookDbContext _bookContext;
        public BookController(BookDbContext temp) => _bookContext = temp;

        [HttpGet("AllBooks")]
        public IActionResult GetBooks(int pageSize = 10, int pageNum = 1, string sortOrder = "asc")
        {

            var bookOrder = _bookContext.Books.AsQueryable();

            bookOrder = sortOrder == "desc"
                ? bookOrder.OrderByDescending(b => b.Title)
                : bookOrder.OrderBy(b => b.Title);

            var pagedBooks = bookOrder
                .Skip((pageNum - 1) * pageSize)
                .Take(pageSize)
                .ToList();

            var totalNumBooks = _bookContext.Books.Count();

            var someObject = new
            {
                Books = pagedBooks,
                TotalNumBooks = totalNumBooks,
                SortOrder = sortOrder
            };

            return Ok(someObject);
        }

        [HttpGet("FictionalBooks")]
        public IEnumerable<Book> GetFictionalBooks()
        {
            return _bookContext.Books.Where(b => b.Classification == "Fiction").ToList();
        }
    }
}

