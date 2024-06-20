using Microsoft.EntityFrameworkCore;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.OpenApi.Models;
using System.Text.RegularExpressions;
using ProductAPI.Models;
using MySql.EntityFrameworkCore.Extensions;


var builder = WebApplication.CreateBuilder(args);
var confBuilder = new ConfigurationBuilder();
confBuilder.AddJsonFile("appsettings.json");
confBuilder.AddEnvironmentVariables();
var configuration = confBuilder.Build();
builder.Services.AddHttpClient();

string connectionString = configuration["ConnectionString"];

// Add services to the container.
builder.Services.AddControllers();
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddHttpContextAccessor();
builder.Services.AddSwaggerGen(options => {
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

builder.Services.AddAuthentication(options => {
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

builder.Services.AddDbContext<ProductContext>(options =>
{
    options.UseMySQL(connectionString);
});

var app = builder.Build();

// Configure the HTTP request pipeline.
app.UseSwagger();
app.UseSwaggerUI(options =>
{
    options.EnableTryItOutByDefault();
});

//app.UseHttpsRedirection();
app.UseAuthentication();
app.UseAuthorization();
app.MapControllers();
Console.WriteLine("Application prete a demarrer");
app.Run();