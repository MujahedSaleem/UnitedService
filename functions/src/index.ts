import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';
import * as algoliasearch from 'algoliasearch';
admin.initializeApp(functions.config().firebase);
const env = functions.config();
const client = algoliasearch(env.algolia.appid, env.algolia.adminkey);
const index = client.initIndex('posts');

exports.indexPosts = functions.firestore.document('posts/{postsId}')
    .onCreate((snap, context) => {
        const data = snap.data();
        const objId= snap.id;
        return index.addObject({
            objId,...data
        })
    });
exports.unindexPosts = functions.firestore.document('posts/{id}')
.onDelete((snap, context) => {
    const objId= snap.id;
    return index.deleteObject(objId);
})