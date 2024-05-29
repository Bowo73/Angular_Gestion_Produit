FROM mcr.microsoft.com/dotnet/sdk:8.0 AS build
WORKDIR /app

# Copy csproj and restore as distinct layers
COPY ["ProductApi.csproj", "./"]
RUN dotnet restore "ProductApi.csproj"

# Copy everything else and build
COPY . .
RUN dotnet build "ProductApi.csproj" -c Release -o /app/build

# Stage 2: Publish the application
FROM build AS publish
RUN dotnet publish "ProductApi.csproj" -c Release -o /app/publish

# Stage 3: Create final image
FROM mcr.microsoft.com/dotnet/aspnet:8.0 AS final
WORKDIR /app
EXPOSE 8090
EXPOSE 8081
COPY --from=publish /app/publish .
ENTRYPOINT ["dotnet", "ProductApi.dll"]
