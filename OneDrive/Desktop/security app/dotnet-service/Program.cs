using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Http;

var builder = WebApplication.CreateBuilder(args);
builder.Services.AddCors(options =>
{
    options.AddDefaultPolicy(policy => policy.AllowAnyOrigin().AllowAnyHeader().AllowAnyMethod());
});

var app = builder.Build();
app.UseCors();

app.MapGet("/", () => Results.Ok(new { application = "SG Securities .NET Core API", status = "healthy" }));

app.MapGet("/security-groups", () => Results.Ok(new[]
{
    new { id = 1, name = "SG-Default", description = "Default group for SG Securities" },
    new { id = 2, name = "SG-Admin", description = "Admin group with elevated permissions" }
}));

app.MapPost("/security-group", (SecurityGroupCreate request) =>
{
    var model = new { id = Random.Shared.Next(100, 999), name = request.Name, description = request.Description };
    return Results.Created($"/security-group/{model.id}", model);
});

app.MapGet("/health", () => Results.Ok(new { status = "healthy" }));

app.Run();

internal record SecurityGroupCreate(string Name, string Description);
