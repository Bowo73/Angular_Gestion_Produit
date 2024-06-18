using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Microsoft.OpenApi.Models;
using System;
using ProductAPI.Models;
using Microsoft.Extensions.Configuration;
using Microsoft.EntityFrameworkCore;
using Microsoft.AspNetCore.Authentication.JwtBearer;

namespace ProductAPI
{
  public class Startup
  {
    public Startup(IConfiguration configuration)
    {
      Configuration = configuration;
    }
    public IConfiguration Configuration { get; }
    public void ConfigureServices(IServiceCollection services)
    {
      /// Commentaire Thibaut : alors là, vous perdez immédiatement 5 points
      /// c'est con, il aurait suffit d'écouter en cours, la sécurité, c'est un sujet sur lequel j'insiste.
      /// Vous créez une faille de sécurité inacceptable pour un système professionnel
      /// et pourtant, pour trouver cette solution, je ne doute pas que vous avez du travailler, faire des recherches...
      services.AddCors(options =>
      {
        options.AddPolicy("AllowAll",
            builder =>
            {
              builder.AllowAnyOrigin()
                 .AllowAnyMethod()
                 .AllowAnyHeader();
            });
      });

      services.AddDbContext<ProductContext>(options =>
        options.UseMySql(Configuration["ConnectionString"],
                             new MySqlServerVersion(new Version(8, 0, 28))));


        // Ajouter les services nécessaires ici
        services.AddControllers();

      // Ajouter la configuration de Swagger
      services.AddSwaggerGen(c =>
      {
        c.SwaggerDoc("v1", new OpenApiInfo { Title = "Product API", Version = "v1" });
      });

      services.AddAuthentication(options => {
        options.DefaultScheme = JwtBearerDefaults.AuthenticationScheme;
        options.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;
        options.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;
        }).AddJwtBearer(options => {
            options.Authority = Environment.GetEnvironmentVariable("App_Authority");
            options.Audience = Environment.GetEnvironmentVariable("App_ClientId");
            options.RequireHttpsMetadata = false;
            options.TokenValidationParameters = new Microsoft.IdentityModel.Tokens.TokenValidationParameters()
            {
                ValidateIssuer = false,
                ValidateAudience = false,
            };
        });
            services.AddAuthorization();
    services.AddSwaggerGen(options => {
        var scheme = new OpenApiSecurityScheme
        {
            In = ParameterLocation.Header,
            Name = "Authorization",
            Flows = new OpenApiOAuthFlows
            {
                AuthorizationCode = new OpenApiOAuthFlow
                {
                    AuthorizationUrl = new Uri($"{Environment.GetEnvironmentVariable("App_SwaggerAuthority")}/protocol/openid-connect/auth"),
                    TokenUrl = new Uri($"{Environment.GetEnvironmentVariable("App_SwaggerAuthority")}/protocol/openid-connect/token")
                }
            },
            Type = SecuritySchemeType.OAuth2
        };
        options.AddSecurityDefinition("OAuth", scheme);
        options.AddSecurityRequirement(new OpenApiSecurityRequirement {
            {
                new OpenApiSecurityScheme {
                    Reference = new OpenApiReference {Id = "OAuth", Type = ReferenceType.SecurityScheme }
                },
                new List<string>()
            }
        });
        options.CustomSchemaIds(type => type.ToString());
    });
    }

    public void Configure(IApplicationBuilder app, IWebHostEnvironment env)
    {
      app.UseCors("AllowAll");

      if (env.IsDevelopment())
      {
        app.UseDeveloperExceptionPage();
      }
      else
      {
        // Gérer les erreurs en production
        app.UseExceptionHandler("/Error");
        app.UseHsts();
      }

      // Activer Swagger
      app.UseSwagger();
      app.UseSwaggerUI(c =>
      {
        c.SwaggerEndpoint("/swagger/v1/swagger.json", "Product API V1");
      });

      // Middleware pour gérer les requêtes HTTP
      app.UseHttpsRedirection();
      app.UseRouting();
    app.UseAuthentication(); // Add authentication middleware
    app.UseAuthorization(); // Add authorization middleware

            app.UseEndpoints(endpoints =>
      {
        endpoints.MapControllers();
      });
    }
  }
}
