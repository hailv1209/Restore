using System;
using System.Collections.Generic;
using System.Linq;
using System.Runtime.CompilerServices;
using System.Threading.Tasks;
using API.Data;
using API.DTOs;
using API.Entities;
using API.Extensions;
using API.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace API.Controllers
{
    public class AccountController : BaseApiController
    {
        private readonly UserManager<User> _userManager;
        private readonly TokenService _tokenService;
        private readonly StoreContext _context;
        public AccountController(UserManager<User> userManager, TokenService tokenService, StoreContext context)
        {
            _context = context;
            _tokenService = tokenService;
            _userManager = userManager;
        }

        [HttpPost("login")]
        public async Task<ActionResult<UserDTO>> Login(LoginDTO loginDTO)
        {
            var user = await _userManager.FindByNameAsync(loginDTO.UserName);

            if(user == null || !await _userManager.CheckPasswordAsync(user,loginDTO.Password)) {
                return Unauthorized();
            }

            var userBasket = await RetrieveBasket(loginDTO.UserName);
            var anonbasket = await RetrieveBasket(Request.Cookies["buyerID"]);

            if(anonbasket != null)
            {
                if(userBasket != null) _context.Baskets.Remove(userBasket);
                anonbasket.BuyerId = user.UserName;
                Response.Cookies.Delete("buyerID");
                await _context.SaveChangesAsync();
            }

            return new UserDTO
            {
                 Email = user.Email,
                 Token = await _tokenService.Generatetoken(user),
                 Basket = anonbasket != null ? anonbasket.MapBasketToDto() : userBasket?.MapBasketToDto() 
               } ;
        }

        [HttpPost("register")]
        public async Task<ActionResult> Register (RegisterDTO registerDTO)
        {
            var user = new User{UserName = registerDTO.UserName, Email = registerDTO.Email};

            var result = await _userManager.CreateAsync(user, registerDTO.Password);

            if(!result.Succeeded)
            {
                foreach (var error in result.Errors)
                {
                    ModelState.AddModelError(error.Code, error.Description);
                }
                return ValidationProblem();
            }

            await _userManager.AddToRoleAsync(user, "Member");

            return StatusCode(201);
        }

        [Authorize]
        [HttpGet("currentUser")]
        public async Task<ActionResult<UserDTO>> GetCurrentUser ()
        {
            var user = await _userManager.FindByNameAsync(User.Identity.Name);


            var userBasket = await RetrieveBasket(User.Identity.Name);

            return new UserDTO{
                Email = user.Email ,
                Token = await _tokenService.Generatetoken(user),
                Basket = userBasket?.MapBasketToDto()
            };
        }

         private async Task<Basket?> RetrieveBasket(string buyerID)
        {
            if(string.IsNullOrEmpty(buyerID)) 
            {
                Response.Cookies.Delete("buyerID");
                return null ;
            }
           return await _context.Baskets
                .Include(i => i.Items)
                .ThenInclude(p => p.Product)
                .FirstOrDefaultAsync(x => x.BuyerId == buyerID);
        }

    }
}