namespace DnsAPI.Models
{
    public class AuthData
    {
        public string? Email { get; set; }
        public string? Password { get; set; }
        public string? Code { get; set; }
        public string Step { get; set; } = "login";
    }
}
