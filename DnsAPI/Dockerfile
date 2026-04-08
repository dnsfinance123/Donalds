# Только одна строка FROM в самом начале
FROM mcr.microsoft.com/dotnet/sdk:10.0
WORKDIR /app

# Копируем файлы
COPY . .

# Собираем
RUN dotnet restore
RUN dotnet publish -c Release -o out

# Настройки запуска прямо здесь
ENV ASPNETCORE_URLS=http://+:80
ENV ASPNETCORE_ENVIRONMENT=Production
EXPOSE 80

# Запуск из папки out
ENTRYPOINT ["dotnet", "out/DnsAPI.dll"]