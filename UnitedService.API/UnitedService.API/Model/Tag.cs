
using System; 
using Google.Cloud.Firestore;

namespace UnitedService.API.Model
{
       [FirestoreData]  
        public class Tag
        {  
            public string tagId { get; set; }  
            
            [FirestoreProperty]  
            public string content { get; set; }  
           
         
        }  
}