using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Cryptography;
using System.Text;
using System.Text.Json;
using System.Threading.Tasks;
using API.Entities;
using Microsoft.AspNetCore.Http.Json;
using Microsoft.EntityFrameworkCore.Metadata.Internal;

namespace API.Data
{
    public class SeedData
    {
        public async static Task SetSeedData(DataContext context)
        {
            if (context.Users.Any())
            {
                return;
            }
            var jsonString = await File.ReadAllTextAsync("Data/UserSeedData.json");
            // For if there is a mismatch in casing from UserSeedData file 
            var jsonSeedDataOption = new JsonSerializerOptions { PropertyNameCaseInsensitive = true };
            var users = JsonSerializer.Deserialize<List<AppUser>>(jsonString, jsonSeedDataOption);

            foreach (var user in users)
            {
                using var hmac = new HMACSHA512();
                //Make userName lowercase to be applied in db 
                user.UserName = user.UserName.ToLower();
                user.PasswordHash = hmac.ComputeHash(Encoding.UTF8.GetBytes("Password1"));
                user.PasswordSalt = hmac.Key;
                context.Users.Add(user);
            }

            await context.SaveChangesAsync();
        }
    }
}