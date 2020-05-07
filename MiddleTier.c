  //Update service in .NET using SQL UDT / Formik FieldArray
            public void UpdatePhoneAll(List<UserOrganizationUpdatePhoneRequest> model, int userId)
            {

                DataTable userOrgPhone = new DataTable();
                userOrgPhone.Columns.Add("OrganizationId", typeof(int));
                userOrgPhone.Columns.Add("PhoneNumber", typeof(string));

                foreach (var item in model)
                {

                    var dr = userOrgPhone.NewRow();

                    dr[0] = item.OrganizationId;
                    dr[1] = item.PhoneNumber;

                    userOrgPhone.Rows.Add(dr);
                }

            }

//update password in .NET using hash/salt.
        public void UpdatePw(UserUpdatePwRequest model, int userId)
        {
            string password = model.Password;
            string salt = BCrypt.BCryptHelper.GenerateSalt();
            string hashedPassword = BCrypt.BCryptHelper.HashPassword(password, salt);
            _dataProvider.ExecuteNonQuery("[dbo].[Users_UpdatePw]",
                inputParamMapper: delegate (SqlParameterCollection col)
                {
                    col.AddWithValue("@Id", userId);
                    col.AddWithValue("@Password", hashedPassword);
                });
        }
//Get Service in Paginated with decrypting data.
           public Paged<PaymentAccount> GetByCreatedByPagination(int userId, int pageIndex, int pageSize)
        {
            Paged<PaymentAccount> pagedResult = null;

            List<PaymentAccount> result = null;

            int totalCount = 0;

            string procName = "[dbo].[PaymentAccounts_SelectByCreatedByPaginated]";

                _data.ExecuteCmd(procName, delegate (SqlParameterCollection paramCol)
            {
                paramCol.AddWithValue("@CreatedBy", userId);
                paramCol.AddWithValue("@PageIndex", pageIndex);
                paramCol.AddWithValue("@PageSize", pageSize);
            },
            singleRecordMapper: delegate (IDataReader reader, short set)
            {
                PaymentAccount model = AccountMapper(reader);
                var key = EncryptProvider.CreateDecryptionKey(10);
         
     
                var decrypted = EncryptProvider.AESDecrypt(model.AccountNumber, key);
                //var account = $"{decrypted}{model.AccountNumber.Substring(model.AccountNumber.Length - 4)}";
                model.AccountNumber = decrypted;

                if (totalCount == 0)
                {
                    totalCount = reader.GetSafeInt32(15);
                }

                if (result == null)
                {
                    result = new List<PaymentAccount>();
                }
                result.Add(model);
            });
            if (result != null)
            {
                pagedResult = new Paged<PaymentAccount>(result, pageIndex, pageSize, totalCount);
            }
            return pagedResult;
        }
//mapper
        private static PaymentAccount AccountMapper(IDataReader reader)
        {
            PaymentAccount account = new PaymentAccount();
            int index = 0;
            account.Id = reader.GetSafeInt32(index++);
            account.PaymentTypeId = reader.GetSafeInt32(index++);
            account.AccountNumber = reader.GetSafeString(index++);
            account.NameHolder = reader.GetSafeString(index++);
            account.CVV = reader.GetSafeString(index++);
            account.ExpirationMonth = reader.GetSafeByte(index++);
            account.ExpirationYear = reader.GetSafeInt32(index++);
            account.LocationId = reader.GetSafeInt32(index++);
            account.DateCreated = reader.GetSafeDateTime(index++);
            account.DateModified = reader.GetSafeDateTime(index++);
            account.CreatedBy = reader.GetSafeInt32(index++);
            account.IsPrimary = reader.GetSafeBool(index++);
            account.CardImage = reader.GetSafeString(index++);
            account.CardType = reader.GetSafeString(index++);
            account.IsActive = reader.GetSafeBool(index++);


       

            return account;
        }

 ////Create Service using encrypt for secure data.       

              public int Create(PaymentAccountAddRequest model, int userId)
        {
            int Id = 0;
      
            var aesKey = EncryptProvider.CreateAesKey();
            var key = aesKey.Key;

            var srcString = model.AccountNumber.Substring(0,model.AccountNumber.Length -4);
            var encryptedCvv = EncryptProvider.AESEncrypt(model.CVV, key);
            var encryptedNumber = EncryptProvider.AESEncrypt(srcString, key);
            string procName = "[dbo].[PaymentAccounts_Insert_V2]";

            _data.ExecuteNonQuery(procName,
                inputParamMapper: delegate (SqlParameterCollection col)
                {
                    InputMapper(model, col);
                    col.AddWithValue("@CreatedBy", userId);
                    col.AddWithValue("@AccountNumber", encryptedNumber);
                    col.AddWithValue("@CVV", encryptedCvv);
                    



                    SqlParameter idOut = new SqlParameter("@Id", SqlDbType.Int);
                    idOut.Direction = ParameterDirection.Output;
                   

                    col.Add(idOut);
                    


                }, returnParameters: delegate (SqlParameterCollection returnCol)
           {
               object oId = returnCol["@Id"].Value;

               int.TryParse(oId.ToString(), out Id);

  
           });

            return Id;
        }
//mapper
            private static void InputMapper(PaymentAccountAddRequest model, SqlParameterCollection col)
        {
            col.AddWithValue("@PaymentTypeId", model.PaymentTypeId);
            //col.AddWithValue("@AccountNumber", model.AccountNumber);
            col.AddWithValue("@NameHolder", model.NameHolder);
            //col.AddWithValue("@CVV", model.CVV);
            col.AddWithValue("@ExpirationMonth", model.ExpirationMonth);
            col.AddWithValue("@ExpirationYear", model.ExpirationYear);
            col.AddWithValue("@LocationId", model.LocationId);
            col.AddWithValue("@IsPrimary", model.IsPrimary);
            col.AddWithValue("@IsActive", model.IsActive);
       
                
        }