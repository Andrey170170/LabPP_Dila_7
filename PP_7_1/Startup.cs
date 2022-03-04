using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.Data.SqlClient;
using Microsoft.AspNetCore.Builder;
using Microsoft.EntityFrameworkCore;
using PP_7_1.Models;

//Data Source=tcp:lab-pp-7-2.database.windows.net,1433;Initial Catalog=Teachers;User Id=Andrey@lab-pp-7-2;Password=13qeadSW2
//tcp:lab-pp-7-2.database.windows.net,1433    
namespace PP_7_1
{
    public class Startup
    {
        public void ConfigureServices(IServiceCollection services)
        {
            services.AddDbContext<TeacherContext>(options =>
                options.UseSqlServer(SqlConnectionIntegratedSecurity));
            services.AddControllers();
        }

        public static string SqlConnectionIntegratedSecurity
        {
            get
            {
                var sb = new SqlConnectionStringBuilder
                {
                    DataSource = "tcp:lab-pp-7-2.database.windows.net,1433;",
                    IntegratedSecurity = false,
                    InitialCatalog = "Teachers",
                    UserID = "Andrey",
                    Password = "13qeadSW2",
                };
                return sb.ConnectionString;
            }
        }

        public void Configure(IApplicationBuilder app)
        {
            app.UseDeveloperExceptionPage();
            app.UseRouting();
            app.UseDefaultFiles();
            app.UseStaticFiles();
            app.UseEndpoints(endpoints =>
            {
                endpoints.MapControllers(); 
            });
        }
    }
}