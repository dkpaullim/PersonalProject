using Microsoft.AspNetCore.Mvc;
using my_new_app.Models;
using my_new_app.Requests;
using my_new_app.Responses;
using my_new_app.Services;
using System;
using System.Collections.Generic;

namespace my_new_app.Controllers
{
    [Route("api/items")]
    [ApiController]
    public class ItemsAPIController : ControllerBase
    {
        [HttpGet]
        public ActionResult<List<Item>> GetItems()
        {
            try
            {
                List<Item> items = null;
                ItemsService service = new ItemsService();
                items = service.GetAll();
                return Ok(items);

            }
            catch (Exception ex)
            {
                return StatusCode(500, ex.Message.ToString());
            }
        }

        [HttpGet("{id:int}")]
        public ActionResult<Item> GetItemsById(int id)
        {
            try
            {
                Item item = null;
                ItemsService service = new ItemsService();
                item = service.GetById(id);
                return Ok(item);
            }
            catch (Exception ex)
            {
                return StatusCode(500, ex.Message.ToString());
            }
        }

        [HttpPost]
        public ActionResult<int> Add(ItemsAddRequest model)
        {
            try
            {
                ItemsService service = new ItemsService();
                int id = service.Add(model);
                return Ok(id);
            }
            catch (Exception ex)
            {
                return StatusCode(500, ex.Message.ToString());
            }
        }

        [HttpPut("{id:int}")]
        public ActionResult<SuccessResponse> Update(int id, ItemsUpdateRequest model)
        {
            try
            {
                if (id == model.Id)
                {
                    ItemsService service = new ItemsService();
                    service.Update(model);
                    SuccessResponse resp = new SuccessResponse();
                    return Ok(resp);
                }
                else
                {
                    return StatusCode(404, ("Bad Request: Body Id does not match entity"));
                }
            }
            catch (Exception ex)
            {
                return StatusCode(500, ex.Message.ToString());
            }
        }

        [HttpDelete("{id:int}")]
        public ActionResult<SuccessResponse> Delete(int id)
        {
            try
            {
                    ItemsService service = new ItemsService();
                    service.Delete(id);
                    SuccessResponse resp = new SuccessResponse();
                    return Ok(resp);
            }
            catch (Exception ex)
            {
                return StatusCode(500, ex.Message.ToString());
            }
        }
    }
}