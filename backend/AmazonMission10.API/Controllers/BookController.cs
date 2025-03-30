﻿using AmazonMission11.API.Data;
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
        public IActionResult GetBooks(int pageSize = 10, int pageNum = 1, string sortOrder = "asc", [FromQuery] List<string>? bookCategories = null)
        {
            var query = _bookContext.Books.AsQueryable();

            if (bookCategories != null && bookCategories.Any())
            {
                query = query.Where(b => bookCategories.Contains(b.Category));
            }

            var totalNumBooks = query.Count();

            //use the filtered query as the base for ordering
            var bookOrder = query;

            bookOrder = sortOrder == "desc"
                ? bookOrder.OrderByDescending(b => b.Title)
                : bookOrder.OrderBy(b => b.Title);

            //paging
            var pagedBooks = bookOrder
                .Skip((pageNum - 1) * pageSize)
                .Take(pageSize)
                .ToList();



            var someObject = new
            {
                Books = pagedBooks,
                TotalNumBooks = totalNumBooks,
                SortOrder = sortOrder
            };

            return Ok(someObject);
        }

        [HttpGet("GetBookCategories")]
        public IActionResult GetBookCategories()
        {
            var bookTypes = _bookContext.Books
                .Select(b => b.Category)
                .Distinct()
                .ToList();

            return Ok(bookTypes);
        }
  
    }
}

