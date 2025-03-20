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
        public IEnumerable<Book> GetBooks()
        {
            return _bookContext.Books.ToList();
        }
        [HttpGet("FictionalBooks")]
        public IEnumerable<Book> GetFictionalBooks()
        {
            return _bookContext.Books.Where(b => b.Classification == "Fiction").ToList();
        }
    }        
}
