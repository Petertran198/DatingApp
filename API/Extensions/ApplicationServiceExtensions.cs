using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Configuration;
using API.Services;
using API.Data;
using Microsoft.EntityFrameworkCore;

namespace API.Extensions
{
    //Extensions must be static
    public static class ApplicationServiceExtensions
    {
        public static IServiceCollection AddApplicationServices(this IServiceCollection services, IConfiguration configuration){
            //Add the service to dependency injection to use in API
            services.AddScoped<TokenService>();

            //Add the db context u created and connect it to db provider to be used
            services.AddDbContext<DataContext>(options=>{
                //Set up sql provider to connect to this db using the connection we added in appsettings
                options.UseSqlite(configuration.GetConnectionString("DefaultConnection"));
            });

            return services;
        }
    }
}