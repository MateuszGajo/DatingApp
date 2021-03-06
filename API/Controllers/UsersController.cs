using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using API.Data;
using API.DTO;
using API.Entities;
using API.Interface;
using AutoMapper;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace API.Controllers
{
    [Authorize]
    public class UsersController : BaseApiController
    {
        private readonly IUserRepository _userRepository;
        private readonly IMapper _autoMapper;
        public UsersController(IUserRepository userRepository, IMapper autoMapper)
        {
            _autoMapper = autoMapper;
            _userRepository = userRepository;

        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<MemberDTO>>> GetUsers()
        {
            return Ok(await _userRepository.GetMembersAsync());

        }



        [HttpGet("{username}")]
        public async Task<ActionResult<MemberDTO>> GetUser(string username)
        {
            return await _userRepository.GetMemberAsync(username);
        }
    }
}