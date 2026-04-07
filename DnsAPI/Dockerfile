# Используем SDK для сборки
FROM mcr.microsoft.com/dotnet/sdk:10.0 AS build
WORKDIR /src

# Копируем файлы проекта и восстанавливаем зависимости
COPY . .
RUN dotnet restore

# Собираем проект в режиме Release
RUN dotnet publish -c Release -o /app

# Используем легкий образ рантайма для запуска
FROM mcr.microsoft.com/dotnet/aspnet10.0
WORKDIR /app
COPY --from=build /app .

# Важно: ASP.NET внутри контейнера по умолчанию слушает порт 8080 или 80
ENV ASPNETCORE_URLS=http://+:80
EXPOSE 80

ENTRYPOINT ["dotnet", "DnsAPI.dll"]