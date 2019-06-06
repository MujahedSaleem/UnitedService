using System; 
using Google.Cloud.Firestore;

namespace UnitedService.API.Model
{
    [FirestoreData]

    public class Post
    {

        public string id { get; set; }
        public DateTime date { get; set; }
        [FirestoreProperty]
        public string uid { get; set; }
        [FirestoreProperty]
        public string code { get; set; }
        [FirestoreProperty]
        public int rate { get; set; }
        [FirestoreProperty]
        public string name { get; set; }
        [FirestoreProperty]
        public bool closed { get; set; }
        [FirestoreProperty]
        public string price { get; set; }
        [FirestoreProperty]
        public string title { get; set; }
        [FirestoreProperty]
        public string[] photos { get; set; }
        [FirestoreProperty]
        public string location { get; set; }
        [FirestoreProperty]
        public string[] comment { get; set; }
    }
}
