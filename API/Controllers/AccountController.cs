using API.Data;
using API.DTO;
using API.Entities;
using API.Interface;
using API.utility;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace API.Controllers
{
    public class AuthResponse
    {
        public UserDTO User { get; set; }
        public string Token { get; set; }
    }
    public class AccountController : BaseApiController
    {
        private readonly DataContext _context;
        private readonly ITokenService _tokenService;
        public AccountController(DataContext context, ITokenService tokenService)
        {
            _tokenService = tokenService;
            _context = context;

        }


        [HttpPost("register")]
        public async Task<ActionResult<AuthResponse>> Register(RegisterDTO registerDto)
        {

            if (await UserExists(registerDto.Username)) return Conflict("Username already exists");
            string hashedPassword = SecurePasswordHasher.Hash(registerDto.Password);

            AppUser newUser = new AppUser()
            {
                Username = registerDto.Username.ToLower(),
                Password = hashedPassword,

            };

            _context.Users.Add(newUser);

            var token = _tokenService.CreateToken(newUser);

            AuthResponse response = new AuthResponse()
            {
                Token = token,
                User = new UserDTO()
                {
                    Username = newUser.Username
                }
            };

            await _context.SaveChangesAsync();
            return Ok(response);
        }

        [HttpPost("login")]
        public async Task<ActionResult<AuthResponse>> Login(LoginDTO loginDto)
        {
            var user = await _context.Users.SingleOrDefaultAsync(u => u.Username == loginDto.Username);
            if (user == null) return NotFound("User doesn't exist");

            if (!SecurePasswordHasher.Verify(loginDto.Password, user.Password)) return Unauthorized("Password invalid");

            var token = _tokenService.CreateToken(user);

            AuthResponse response = new AuthResponse()
            {
                Token = token,
                User = new UserDTO()
                {
                    Username = user.Username
                }
            };

            return Ok(response);

        }

        private async Task<bool> UserExists(string username)
        {
            return await _context.Users.AnyAsync(u => u.Username == username.ToLower());
        }
    }
}