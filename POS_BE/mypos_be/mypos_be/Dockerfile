# ====== BUILD STAGE ======
FROM mcr.microsoft.com/dotnet/sdk:6.0 AS build
WORKDIR /src

# Copy csproj và restore
COPY *.csproj .
RUN dotnet restore

# Copy toàn bộ source
COPY . .
RUN dotnet publish -c Release -o /app/publish

# ====== RUNTIME STAGE ======
FROM mcr.microsoft.com/dotnet/aspnet:6.0
WORKDIR /app

COPY --from=build /app/publish .

EXPOSE 80
ENTRYPOINT ["dotnet", "mypos_be.dll"]
