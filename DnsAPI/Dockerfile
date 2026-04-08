# Используем SDK для сборки (он у тебя уже есть)
FROM mcr.microsoft.com/dotnet/sdk:8.0 AS build
WORKDIR /src

# Копируем всё и собираем
COPY . .
RUN dotnet restore
RUN dotnet publish -c Release -o /app

# Используем тот образ, который УСПЕШНО скачался
FROM mcr.microsoft.com/dotnet/aspnet:8.0.0-jammy
WORKDIR /app
COPY --from=build /app .

# Настройки портов
ENV ASPNETCORE_URLS=http://+:80
EXPOSE 80

ENTRYPOINT ["dotnet", "DnsAPI.dll"]
