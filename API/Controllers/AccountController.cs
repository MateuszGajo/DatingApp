using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using API.Data;
using API.DTO;
using API.Entities;
using API.utility;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace API.Controllers
{
    public class AccountController : BaseApiController
    {
        private readonly DataContext _context;
        public AccountController(DataContext context)
        {
            _context = context;

        }


        [HttpPost("register")]
        public async Task<ActionResult<AppUser>> Register(RegisterDTO registerDto)
        {
            if (await UserExists(registerDto.Username)) return Conflict("Username already exists");
            string hashedPassword = SecurePasswordHasher.Hash(registerDto.Password);

            AppUser newUser = new AppUser()
            {
                Username = registerDto.Username.ToLower(),
                Password = hashedPassword,
            };

            _context.Users.Add(newUser);
            await _context.SaveChangesAsync();
            return Ok(newUser);
        }

        private async Task<bool> UserExists(string username)
        {
            return await _context.Users.AnyAsync(u => u.Username == username.ToLower());
        }
    }
}