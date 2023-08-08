using API.Data;
using API.Entities;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace API.Controllers;


public class UsersController : BaseApiController
{
    private readonly DataContext _context;

    public UsersController(DataContext context)
    {
        _context = context;
    }

    [HttpGet]
    public async Task<IActionResult> GetUsers()
    {

        IActionResult result = null;
            try
            {
                var q = await _context.Users.ToListAsync();
                result = Ok(q);
            }
            catch (System.Exception ex)
            {
                result = BadRequest(ex.Message);
            }
            
            return result;
    }
    

    [HttpGet("{id}")]
    public async Task<IActionResult> GetUser(int id)
    {
        IActionResult result = null; 
        try {
         var q = await _context.Users.FindAsync(id);
         result = Ok(q);

        }catch(System.Exception ex){

            result = BadRequest(ex.Message);
        }
        return result;
    }
}
