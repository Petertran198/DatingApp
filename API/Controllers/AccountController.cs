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

        [HttpPost("login")]
        public async Task<IActionResult> Login(LoginDto loginDto){
            var user = await this._context.Users.FirstOrDefaultAsync(x => x.UserName == loginDto.UserName);

            if(user == null) return Unauthorized("No users found");

            // The passwordSalt is the secret key to decode 
            using var hmac = new HMACSHA512(user.PasswordSalt);
            // Used the algorithm from the secret key of RegisterUserDTO.password to make a hash for the logingDto.password 
            var computeHash = hmac.ComputeHash(Encoding.UTF8.GetBytes(loginDto.Password));

            for(var i = 0; i < computeHash.Length; i++) {
                if(computeHash[i] != user.PasswordHash[i]){
                    return Unauthorized("Invalid Password");
                }
            }
            return Ok(user);
        }

        public async Task<bool> DoesUserExists(string username){
         return   await this._context.Users.AnyAsync(u => u.UserName == username.ToLower());
        }

    }
}