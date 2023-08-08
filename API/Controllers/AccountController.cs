using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Cryptography;
using System.Text;
using System.Threading.Tasks;
using API.Data;
using API.DTO;
using API.Entities;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace API.Controllers
{
    public class AccountController: BaseApiController
    {
        private readonly DataContext _context;
        public AccountController(DataContext context)
        {
            this._context = context;

        }

        [HttpPost("register")]
        public async Task<IActionResult> RegisterUser([FromBody] RegisterUserDTO registerUser){
            IActionResult result = null; 
            try {

            if(await DoesUserExists(registerUser.Username)){
                return BadRequest("User already exists in db");
            }

            //Got to use using because HMACSHA512 is part of the IDisposable interface 
            using var hmac = new HMACSHA512();

            var user = new AppUser
            {
                UserName = registerUser.Username.ToLower(),
                PasswordHash = hmac.ComputeHash(Encoding.UTF8.GetBytes(registerUser.Password)),
                PasswordSalt = hmac.Key
            };

            this._context.Users.Add(user);
            await this._context.SaveChangesAsync();

            result= Ok(registerUser);

            } catch(System.Exception ex){

                result = BadRequest(ex.Message);
            }
            return result;
        }


        public async Task<bool> DoesUserExists(string username){
         return   await this._context.Users.AnyAsync(u => u.UserName == username.ToLower());
        }

    }
}