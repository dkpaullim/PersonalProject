using Amazon;
using Amazon.Runtime;
using Amazon.S3;
using Amazon.S3.Transfer;
using Microsoft.AspNetCore.Http;
using my_new_app.Requests;
using System;
using System.Data;
using System.Data.SqlClient;
using System.IO;
using System.Threading.Tasks;

namespace my_new_app.Services
{
    public class FilesService
    {
        private string connectionString = "Server=localhost;Database=PersonalProject;Trusted_Connection=true";
        private string ConnectionString { get; set; }
        private static IAmazonS3 s3Client;
        
        public async Task<string> UploadFile(IFormFile file) 
        {
            TransferUtility fileTransferUtility = null;
            BasicAWSCredentials credentials = null;
            string bucketName = "personalproject-items";
            string filePath = Path.GetTempFileName();
            string keyName = bucketName + Guid.NewGuid() + "_" + file.FileName;
            using (FileStream stream = new FileStream(filePath, FileMode.Create))
            {
                credentials = new BasicAWSCredentials("someKey", "someKey");
                s3Client = new AmazonS3Client(credentials, RegionEndpoint.USWest1);
                file.CopyTo(stream);
                fileTransferUtility = new TransferUtility(s3Client);
                await fileTransferUtility.UploadAsync(stream, bucketName, keyName);
            }
            string url = "https://personalproject-items.s3-us-west-1.amazonaws.com/" + keyName;
            return url;
        }


        public int Add(FilesAddRequest model)
        {
            using (SqlConnection conn = new SqlConnection(ConnectionString))
            {
                conn.Open();
                SqlCommand cmd = conn.CreateCommand();
                cmd.CommandText = "dbo.Files_Insert";
                cmd.CommandType = CommandType.StoredProcedure;
                cmd.Parameters.AddWithValue("@Name", model.Name);
                cmd.Parameters.AddWithValue("@Url", model.Url);
                cmd.Parameters.AddWithValue("@FileType", model.FileType);
                SqlParameter idParam = cmd.Parameters.Add("@Id", SqlDbType.Int);
                idParam.Direction = ParameterDirection.Output;
                cmd.ExecuteNonQuery();
                return (int)idParam.Value;
            }
        }
    }
}




