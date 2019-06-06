namespace UnitedService.API.Data
{
  using Google.Cloud.Firestore;
  using Newtonsoft.Json;
  using System;
  using System.Collections.Generic;
  using System.Threading.Tasks;
  using UnitedService.API.Model;

  /// <summary>
  /// Defines the <see cref="FreeWorkDataAccessLayer" />
  /// </summary>
  public class FreeWorkDataAccessLayer
  {
    /// <summary>
    /// Defines the projectId
    /// </summary>
    internal string projectId;

    /// <summary>
    /// Defines the fireStoreDb
    /// </summary>
    internal FirestoreDb fireStoreDb;

    /// <summary>
    /// Initializes a new instance of the <see cref="FreeWorkDataAccessLayer"/> class.
    /// </summary>
    public FreeWorkDataAccessLayer()
    {
      string filepath = "freework.json";
      Environment.SetEnvironmentVariable("GOOGLE_APPLICATION_CREDENTIALS", filepath);
      projectId = "freeworker-5517f";
      fireStoreDb = FirestoreDb.Create(projectId);
    }

    /// <summary>
    /// The GetAllPosts
    /// </summary>
    /// <param name="uid">The uid<see cref="string"/></param>
    /// <returns>The <see cref="Task{List{Post}}"/></returns>
    public async Task<LinkedList<Post>> GetAllPosts(string uid)
    {
      try
      {
        LinkedList<Post> lstPosts = new LinkedList<Post>();

        var users = await fireStoreDb.Document("users/" + uid).GetSnapshotAsync();
        if (users.Exists)
        {
          Dictionary<string, object> userd = users.ToDictionary();
          object userIntrest;
          if (userd.TryGetValue("intrest", out userIntrest))
          {
            Query allPosts = fireStoreDb.Collection("posts");
            QuerySnapshot AllPost = await allPosts.GetSnapshotAsync();
            // QuerySnapshot TagsQuerySnapshot = await AllTags.GetSnapshotAsync();
            foreach (DocumentSnapshot documentSnapshot in AllPost.Documents)
            {
              if (documentSnapshot.Exists)
              {
                bool flag = false;
                Dictionary<string, object> post = documentSnapshot.ToDictionary();
                string jsonpost = JsonConvert.SerializeObject(post);
                Post mpost = JsonConvert.DeserializeObject<Post>(jsonpost);
                mpost.id = documentSnapshot.Id;
                var allTags = await fireStoreDb.Collection("posts/" + documentSnapshot.Id + "/tags").GetSnapshotAsync();
                foreach (DocumentSnapshot tag in allTags.Documents)
                {

                  Dictionary<string, object> onetag = tag.ToDictionary();
                  string json = JsonConvert.SerializeObject(onetag);
                  Tag newTag = JsonConvert.DeserializeObject<Tag>(json);
                   if (userIntrest.ToString().Contains(newTag.content) && mpost.uid !=uid &&mpost.closed ==false)
                  {
                    lstPosts.AddFirst(mpost);
                    flag = true;
                    break;
                  }
                  else if(mpost.closed == false)
                  {
                    lstPosts.AddLast(mpost);
                    flag = true;
                    break;
                  }



                }
                if (!flag && mpost.closed == false)
                {
                  lstPosts.AddLast(mpost);
                  flag = false;
                }
              }
            }

          }

        }
        return lstPosts;

      }
      catch (Exception ex)
      {
        throw new Exception(ex.Message);
      }
    }

    /// <summary>
    /// The getUsers
    /// </summary>
    /// <param name="name">The name<see cref="string"/></param>
    /// <returns>The <see cref="Task{List{User}}"/></returns>
    public async Task<List<User>> getUsers(string name)
    {
      List<User> AllUser = new List<User>();

      try
      {
        var users = await fireStoreDb.Collection("users").GetSnapshotAsync();
        List<User> filterUser = new List<User>();
        foreach (var item in users)
        {
          if (item.Exists)
          {
            Dictionary<string, object> user = item.ToDictionary();
            string JsonUser = JsonConvert.SerializeObject(user);
            User mUser = JsonConvert.DeserializeObject<User>(JsonUser);
            mUser.uid = item.Id;
            if (name !=null && mUser.displayName.ToLower().Contains(name.ToLower()))
            {
              filterUser.Add(mUser);
            }
            else
            {
              AllUser.Add(mUser);
            }

          }

        }
        return filterUser.Count >0?filterUser:AllUser;

      }
      catch (Exception)
      {

        return AllUser;
      }
    }
  }
}
