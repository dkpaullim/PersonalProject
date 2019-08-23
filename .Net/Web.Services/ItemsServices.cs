using my_new_app.Models;
using my_new_app.Requests;
using System;
using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;

namespace my_new_app.Services
{
    public class ItemsService
    {
        private string connectionString = "Server=DESKTOP-J6JKB96;Database=PersonalProject;Trusted_Connection=true";
        private string ConnectionString { get; set; }
        public ItemsService()
        {
            this.ConnectionString = connectionString;
        }
        public List<Item> GetAll()
        {
            List<Item> items = null;

            using (SqlConnection conn = new SqlConnection(ConnectionString))
            {
                conn.Open();

                SqlCommand cmd = conn.CreateCommand();

                cmd.CommandText = "dbo.Items_SelectAll";
                cmd.CommandType = CommandType.StoredProcedure;

                using (IDataReader reader = cmd.ExecuteReader())
                {
                    while (reader.Read())
                    {
                        Item model = new Item();
                        int startingIndex = 0;

                        model.Id = reader.GetInt32(startingIndex++);
                        model.Color = reader.GetString(startingIndex++);
                        model.SizeId = reader.GetInt32(startingIndex++);
                        model.ItemName = reader.GetString(startingIndex++);
                        model.ItemDetails = reader.GetString(startingIndex++);
                        model.ItemTypeId = reader.GetInt32(startingIndex++);
                        model.ImageUrl = reader.GetString(startingIndex++);
                        model.Gender = reader.GetString(startingIndex++);
                        model.Price = reader.GetDouble(startingIndex++);
                        model.ItemBrand = reader.GetString(startingIndex++);

                        if (items == null)
                        {
                            items = new List<Item>();
                        }
                        items.Add(model);
                    }
                }
            }
            return items;
        }

        public Item GetById(int id)
        {
            using (SqlConnection conn = new SqlConnection(ConnectionString))
            {
                conn.Open();

                SqlCommand cmd = conn.CreateCommand();

                cmd.CommandText = "dbo.Items_SelectById";
                cmd.CommandType = CommandType.StoredProcedure;
                cmd.Parameters.AddWithValue("@Id", id);

                using (IDataReader reader = cmd.ExecuteReader())
                {
                        if (reader.Read()) ;
                        Item model = new Item();
                        int startingIndex = 0;

                        model.Id = reader.GetInt32(startingIndex++);
                        model.Color = reader.GetString(startingIndex++);
                        model.SizeId = reader.GetInt32(startingIndex++);
                        model.ItemName = reader.GetString(startingIndex++);
                        model.ItemDetails = reader.GetString(startingIndex++);
                        model.ItemTypeId = reader.GetInt32(startingIndex++);
                        model.ImageUrl = reader.GetString(startingIndex++);
                        model.Gender = reader.GetString(startingIndex++);
                        model.Price = reader.GetDouble(startingIndex++);
                        model.ItemBrand = reader.GetString(startingIndex++);

                        return model; 
                }
            }
        }

        public int Add(ItemsAddRequest model)
        {
            using (SqlConnection conn = new SqlConnection(ConnectionString))
            {
                conn.Open();

                SqlCommand cmd = conn.CreateCommand();

                cmd.CommandText = "dbo.Items_Insert";
                cmd.CommandType = CommandType.StoredProcedure;

              
                cmd.Parameters.AddWithValue("@Color", model.Color);
                cmd.Parameters.AddWithValue("@SizeId", model.SizeId);
                cmd.Parameters.AddWithValue("@ReviewStarsId", model.ReviewStarsId);
                cmd.Parameters.AddWithValue("@ItemName", model.ItemName);
                cmd.Parameters.AddWithValue("@ItemDetails", model.ItemDetails);
                cmd.Parameters.AddWithValue("@ItemTypeId", model.ItemTypeId);
                cmd.Parameters.AddWithValue("@ImageUrl", model.ImageUrl);
                cmd.Parameters.AddWithValue("@Gender", model.Gender);
                cmd.Parameters.AddWithValue("@Price", model.Price);
                cmd.Parameters.AddWithValue("@ItemBrand", model.ItemBrand);

                SqlParameter idParam = cmd.Parameters.Add("@Id", SqlDbType.Int);
                idParam.Direction = ParameterDirection.Output;

                cmd.ExecuteNonQuery();

                return (int)idParam.Value;
            }
        }

        public void Update(ItemsUpdateRequest model)
        {
            using (SqlConnection conn = new SqlConnection(connectionString))
            {
                conn.Open();

                SqlCommand cmd = conn.CreateCommand();

                cmd.CommandText = "dbo.Items_Update";
                cmd.CommandType = CommandType.StoredProcedure;

                cmd.Parameters.AddWithValue("@Id", model.Id);
                cmd.Parameters.AddWithValue("@Color", model.Color);
                cmd.Parameters.AddWithValue("@SizeId", model.SizeId);
                cmd.Parameters.AddWithValue("@ReviewStarsId", model.ReviewStarsId);
                cmd.Parameters.AddWithValue("@ItemName", model.ItemName);
                cmd.Parameters.AddWithValue("@ItemDetails", model.ItemDetails);
                cmd.Parameters.AddWithValue("@ItemTypeId", model.ItemTypeId);
                cmd.Parameters.AddWithValue("@ImageUrl", model.ImageUrl);
                cmd.Parameters.AddWithValue("@Gender", model.Gender);
                cmd.Parameters.AddWithValue("@Price", model.Price);
                cmd.Parameters.AddWithValue("@ItemBrand", model.ItemBrand);

                cmd.ExecuteNonQuery();
            }
        }
        public void Delete(int id)
        {
            using (SqlConnection conn = new SqlConnection(connectionString))
            {
                conn.Open();

                SqlCommand cmd = conn.CreateCommand();

      
                cmd.CommandText = "dbo.Items_Delete";
                cmd.CommandType = CommandType.StoredProcedure;

                cmd.Parameters.AddWithValue("@Id", id);

                cmd.ExecuteNonQuery();
            }
        }
    }
}
