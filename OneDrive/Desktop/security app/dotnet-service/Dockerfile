FROM mcr.microsoft.com/dotnet/sdk:8.0 AS build
WORKDIR /src
COPY ["SGSecurities.Api.csproj", "./"]
RUN dotnet restore "SGSecurities.Api.csproj"
COPY . .
RUN dotnet publish "SGSecurities.Api.csproj" -c Release -o /app/publish

FROM mcr.microsoft.com/dotnet/aspnet:8.0 AS runtime
WORKDIR /app
COPY --from=build /app/publish ./
EXPOSE 80
ENTRYPOINT ["dotnet", "SGSecurities.Api.dll"]
