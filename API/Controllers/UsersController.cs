﻿using System.ComponentModel;
using API.Data;
using API.Entities;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace API.Controllers;

[Authorize]
public class UsersController : BaseApiController
{
    private readonly DataContext _context;

    public UsersController(DataContext context)
    {
        _context = context;
    }

    [AllowAnonymous]
    [HttpGet]
    public async Task<IActionResult> GetUsers()
    {

        IActionResult result = null;
        try
        {
            var q = await _context.Users.ToListAsync();
            result = Ok(q);
        }
        catch (System.Exception ex)
        {
            result = BadRequest(ex.Message);
        }

        return result;
    }


    [HttpGet("{id}")]
    public async Task<IActionResult> GetUser(int id)
    {
        IActionResult result = null;
        try
        {
            var q = await _context.Users.FindAsync(id);
            result = Ok(q);

        }
        catch (System.Exception ex)
        {

            result = BadRequest(ex.Message);
        }
        return result;
    }
}
