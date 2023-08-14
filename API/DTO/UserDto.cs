using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace API.DTO
{
    //User with the JWT Token of HashedUser
    public class UserDto
    {
        public string Username { get; set; }
        public string Token { get; set; }
    }
}