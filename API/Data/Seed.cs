using System;
using System.Collections.Generic;
using System.Linq;
using System.Text.Json;
using System.Threading.Tasks;
using API.Entities;
using API.utility;
using Microsoft.EntityFrameworkCore;

namespace API.Data
{
    public class Seed
    {
        public async static Task SeedUsers(DataContext context)
        {
            if (await context.Users.AnyAsync()) return;

            var userData = await File.ReadAllTextAsync("Data/UserSeedData.json");
            List<AppUser> users = JsonSerializer.Deserialize<List<AppUser>>(userData);
            foreach (var user in users)
            {
                string password = SecurePasswordHasher.Hash("Pa$$w0rd");
                user.Username = user.Username.ToLower();
                user.Password = password;

                context.Users.Add(user);
            }
            await context.SaveChangesAsync();
        }
    }
}