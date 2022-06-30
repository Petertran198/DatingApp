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
using API.Services;

namespace API.Controllers
{
    public class AccountController:BaseApiController
    {
        private readonly DataContext _context;
        private readonly TokenService _tokenService;
        public AccountController(DataContext  context, TokenService tokenService)
        {
            this._tokenService = tokenService;
            this._context = context;
        }


        [HttpPost("register")]
        //Task is a class that handle Async request U got to cast ur return value to a Task if u use async code   
        public async Task<ActionResult<UserDto>> Register(RegisterDto registerDto){
        
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

           return new UserDto {
                UserName = user.UserName,
                Token = _tokenService.CreateToken(user)
           };
        }

        [HttpPost("login")]
        public async Task<ActionResult<UserDto>> Login(LoginDto loginDto){
            var user = await _context.Users.SingleOrDefaultAsync((user)=> user.UserName == loginDto.UserName );

            if(user == null){
                return Unauthorized("Invalid Username");
            }
            //use the Password Salt we created when registering a user
            //This salt will be use to decrypt the hash as a secondary layer of protection if the Hash is ever compromised  
            //After that the hash will be decrypted 
            using var hmac = new HMACSHA512(user.PasswordSalt);

            //If the Password using the same Password Salt(aka key) returns the same Hash as the database password 
            //the password matches
            var computedHash = hmac.ComputeHash(Encoding.UTF8.GetBytes(loginDto.Password));

            for(int i = 0; i <  computedHash.Length;  i++){
                if(computedHash[i] != user.PasswordHash[i]) {
                    return Unauthorized("Invalid Password");
                }
            }
            return new UserDto {
                UserName = user.UserName,
                Token = _tokenService.CreateToken(user)
            };
        }

        private async Task<bool> isUserNameExist(string username){
            return await _context.Users.AnyAsync((user)=> user.UserName == username.ToLower());
        }
    }
}