using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;
using API.Entities;
using API.Interfaces;
using Microsoft.IdentityModel.Tokens;

namespace API.Services
{
    public class TokenService : ITokenService
    {
        private readonly SymmetricSecurityKey _key;
        public TokenService(IConfiguration config)
        {
            _key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(config["secret_key"]));
            
        }
        public string CreateToken(HashedUser user)
        {
            //Information that is in the token for now only nameid 
            var claims = new  List<Claim> {
                new Claim(JwtRegisteredClaimNames.NameId, user.UserName)
            };
            var credentials = new SigningCredentials(_key, SecurityAlgorithms.HmacSha512Signature);
            //Description of the properties, characteristic, and attributes of the token
            var tokenDescriptor = new SecurityTokenDescriptor {
                Subject = new ClaimsIdentity(claims),
                Expires = DateTime.Now.AddHours(10),
                SigningCredentials = credentials
            };
            //Creating the JWT Token
            var tokenHandler = new JwtSecurityTokenHandler();
            var token = tokenHandler.CreateToken(tokenDescriptor);
            //Returning token as string
            return tokenHandler.WriteToken(token);
        }
        
    }
}