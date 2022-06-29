using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Security.Cryptography;
using System.Threading.Tasks;
using API.Data;
using API.DTOs;
using API.Entities;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace API.Controllers
{
    public class AccountController:BaseApiController
    {
        private readonly DataContext _context;
        public AccountController(DataContext  context)
        {
            _context = context;
        }


        [HttpPost("register")]
        //Task is a class that handle Async request U got to cast ur return value to a Task if u use async code   
        public async Task<ActionResult<AppUser>> Register(RegisterDto registerDto){
        
            if(await isUserNameExist(registerDto.UserName)){
                return BadRequest("Username is already taken");
            }

            //Used to hash password
            using var hmac = new HMACSHA512();

            //password salt is added secruity if somehow password hash is found then our password would still not get compromise due to having the addtional layer of masking made by  password salt.
            var user = new AppUser {
                UserName = registerDto.UserName,
                PasswordHash = hmac.ComputeHash(Encoding.UTF8.GetBytes(registerDto.Password)),
                PasswordSalt = hmac.Key

            };
            //notify entity that we are tracking this object 
            _context.Users.Add(user);
            //save the object to db 
           await  _context.SaveChangesAsync();
           return user;
        }

        private async Task<bool> isUserNameExist(string username){
            return await _context.Users.AnyAsync((user)=> user.UserName == username.ToLower());
        }
    }
}