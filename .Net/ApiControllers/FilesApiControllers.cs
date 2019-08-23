using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using my_new_app.Services;
using System;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace my_new_app.Controllers
{
    [Route("api/files")]
    [ApiController]
    public class FilesApiController : ControllerBase
    {
        [HttpPost("upload")]
        public async Task<ActionResult<ActionResult<List<string>>>> AddFile(IFormFile[] file)
        {

            try
            {
                List<string> urls = null;
                if (file[0] == null)
                {
                    return NotFound(("Bad Request"));
                }
                else
                {
                    foreach (var item in file)
                    {
                        if (urls == null)
                        {
                            urls = new List<string>();
                        }
                        FilesService service = new FilesService();
                        string url = await service.UploadFile(item);
                        urls.Add(url);
                    }
                    return Ok(urls);
                }
            }
            catch (Exception ex)
            {
                return StatusCode(500, ex.Message.ToString());
            }
        }
    }
}
