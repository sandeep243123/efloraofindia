import React, { useEffect, useState } from 'react'
import { useQuery, useLazyQuery, gql, useMutation } from "@apollo/client";
import CommentsSection from "./CommentsSection"
import style from './Comment.module.css';
import useNode from '../hooks/useNode';
import Action from "./Action"


// const commentList= [
//   {
//     "commentID": "65ec52a589e64a665a0079cc",
//     "commentText": "Color green",
//     "postedBy": "Anjali",
//     "repliedTo": null
//   },
//   {
//     "commentID": "65f0b47f4ea91f9d5a9f32ca",
//     "commentText": "Hello Everyone",
//     "postedBy": "ar2",
//     "repliedTo": null
//   },
//   {
//     "commentID": "65f0b48e4ea91f9d5a9f32cd",
//     "commentText": "Bye Bye",
//     "postedBy": "ar2",
//     "repliedTo": null},
// {
//   "commentID": "65f0b4a54ea91f9d5a9f32d0",
//   "commentText": "Hello are you",
//   "postedBy": "ar2",
//   "repliedTo": "65f0b48e4ea91f9d5a9f32cd"
// },
// {
//   "commentID": "65f0b4b34ea91f9d5a9f32d3",
//   "commentText": "Color of flower is pink",
//   "postedBy": "ar2",
//   "repliedTo": "65f0b48e4ea91f9d5a9f32cd"
// }
// ]

function Comments(props){

  const postID=props.postID;
  console.log("postID",postID)
  
  const [input, setInput] = useState("");


  const [commentList,setCommentList]=useState(null)

  const { data } = useQuery(gql`
  query GetComments($details: getComment!) {
    getComments(details: $details) {
      commentID
      commentText
      postedBy
      repliedTo
    }
  }
`, {
      onCompleted: (data) => {
        console.log("Comment",data)
          setCommentList(data["getComments"])
      },
      variables: {details:{"postID":props.postID}}
      ,
      onError: (error) => {
          console.error('Error signing up:', error.message);

      }
  });




  const addCommentMutation = gql`
  mutation PostComment($details: postComment!) {
    postComment(details: $details)
  }
  `
  const [addComments] =
      useMutation(addCommentMutation, {
          onCompleted: (data) => {
             //console.log(data,"Success")
             setInput("")
             getComments({
              variables: {
                  details: {
                    "postID":props.postID
                  }
              }});
          },
          onError: (error) => {
              console.error('Error signing up:', error.message);
          }
      })






      const deleteCommentMutation = gql`
      mutation DeleteComment($commentId: ID!) {
        deleteComment(commentID: $commentId)
      }
      `
      const [deleteComments] =
          useMutation(deleteCommentMutation, {
              onCompleted: (data) => {
                  console.log(data,"Success")
                  getComments({
                    variables: {
                        details: {
                          "postID":props.postID
                        }
                    }});
                 
              },
              onError: (error) => {
                  console.error('Error signing up:', error.message);
              }
          })



  const [ getComments ] = useLazyQuery(gql`
  query GetComments($details: getComment!) {
    getComments(details: $details) {
      commentID
      commentText
      postedBy
      repliedTo
    }
  }
`, {
      onCompleted: (data) => {
        console.log("commentlist",data)
        setCommentList(data["getComments"])
      },
      onError: (error) => {
          console.error('Error signing up:', error.message);
      }
  });




  useEffect(() => {
    if (data)
        getComments({
            variables: {
                details: {
                  "postID":props.postID
                }
            }
        })
}, [data]);


  
    const handleInsertNode = (folderId, item) => {
     
     
      // if(item!="")
      // {
        if(folderId=="")
        {
            addComments({ variables: { details: {"postID":postID,"commentText":item}}})
        }
        else
        {
          addComments({ variables: { details: {"postID":postID,"commentText":item,"repliedTo":folderId}}})
        }
      //}
  
    };
 
    const handleDeleteNode = (folderId) => {
      console.log("delete the node",folderId)
      deleteComments({ variables: {"commentId": folderId}})


    };


    return (
      <div>
        <div className={'${style.inputContainer}'}>
            <input
              type="text"
              className={`${style.inputContainer__input} ${style.first_input}`}
              autoFocus
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Type your reply message here..."
            />

            <div className={`${style.reply} ${style.comment}`} onClick={() => handleInsertNode("", input)}>
              COMMENT
            </div>
        </div>
        <CommentsSection
            handleInsertNode={handleInsertNode}
            handleDeleteNode={handleDeleteNode}
            commentList={commentList} 
        />
      </div>
    );
}

export default Comments;