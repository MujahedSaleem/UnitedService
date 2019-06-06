import * as admin from 'firebase-admin'
import * as functions from 'firebase-functions'
admin.initializeApp(functions.config().firebase);

import { COMMENT_EVENT, LIKE_EVENT } from "./constants";
import * as notificationFunctions from './notification'

export const firestoreInstance = admin.firestore();
export const sorting = functions.https.onRequest(async (req, resp) => {
    //  const uid = req.header('uid');
    const posts: string[] = [];
    try {
        const post = await firestoreInstance.collection('posts').listDocuments()
         // tslint:disable-next-line: no-floating-promises
          //  const user_intrest = await firestoreInstance.doc(`users/${uid}`).get();
          // const intrest = user_intrest.data()!.intrest;
          resp.status(200).send(JSON.stringify( post));
          console.log('post is ',post)
          console.log('post len ',post.length)

         post.forEach(async doc => {
            // tslint:disable-next-line: no-floating-promises
            const post_tags = await firestoreInstance.doc(`posts/${doc.id}`).
                collection('tags').listDocuments();
    
            post_tags.forEach(async tag => {
                // tslint:disable-next-line: no-floating-promises
                const tag_content = await firestoreInstance.
                    doc(`posts/${doc.id}/tags/${tag.id}`).get();
    
                const tag_contetn: string = tag_content.data().content;
                resp.status(200).send(JSON.stringify(tag_contetn));
                posts.push(doc.id);
    
    
    
            });
    
        });
    } catch (error) {
        resp.status(200).send(error)
    }

});

export const newFollowerNotification = functions.firestore
    .document('PublicUserData/{followerId}/Followers/{followedId}')
    .onCreate(event => {
        return notificationFunctions.sendNewFollowerNotification(event);
    });

export const newMessagesNotification = functions.firestore
    .document('PublicUserData/{followerId}/Followers/{followedId}')
    .onCreate(event => {
        return notificationFunctions.sendNewFollowerNotification(event);
    });

export const newLikeNotification = functions.firestore
    .document('Posts/{postId}/Likes/{likeId}')
    .onCreate(async event => {
        return notificationFunctions.sendPostNotication(event, LIKE_EVENT)
    });

export const newCommentNotification = functions.firestore
    .document('posts/{postid}/Comments/{commentId}')
    .onCreate(async event => {
        return notificationFunctions.sendPostNotication(event, COMMENT_EVENT)
    });

// export const updateFeedAfterFollow = functions.firestore
//     .document('PublicUserData/{followerId}/Following/{followedId}')
//     .onCreate(event => {
//         return atomicFunctions.updateFeedAfterUserAction(event, true);
//     });

// export const updateFeedAfterUserNewWorkout = functions.firestore
//     .document('Posts/{postId}')
//     .onCreate(event => {
//         return atomicFunctions.updateFollowersFeed(event, false)
//     });

// export const updateFeedAfterUnFollow = functions.firestore
//     .document('PublicUserData/{followerId}/Following/{followedId}')
//     .onDelete(event => {
//         return atomicFunctions.updateFeedAfterUserAction(event, false);
// });