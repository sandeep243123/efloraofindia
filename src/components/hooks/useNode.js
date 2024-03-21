const useNode = () => {
    const insertNode = function (tree, commentId, item,uname) {
      if (tree.id === commentId) {
        tree.items.push({
          id: new Date().getTime(),
          text: item,
          name: uname,
          
          items: [],
        });
        return tree;
      }
  
      let latestNode = [];
      latestNode = tree.items.map((ob) => {
        return insertNode(ob, commentId, item, uname);
      });
  
      return { ...tree, items: latestNode };
    };
  
    
    const deleteNode = (tree, id) => {
      for (let i = 0; i < tree.items.length; i++) {
        const currentItem = tree.items[i];
        if (currentItem.id === id) {
          tree.items.splice(i, 1);
          return tree;
        } else {
          deleteNode(currentItem, id);
        }
      }
      return tree;
    };
  
    return { insertNode, deleteNode };
  };
  
  export default useNode;






// {
//   "data": {
//     "getComments": [
//       {
//         "commentID": "65ec52a589e64a665a0079cc",
//         "commentText": "Color green",
//         "postedBy": "Anjali",
//         "repliedTo": null
//       },
//       {
//         "commentID": "65f0b47f4ea91f9d5a9f32ca",
//         "commentText": "Hello Everyone",
//         "postedBy": "ar2",
//         "repliedTo": null
//       },
//       {
//         "commentID": "65f0b48e4ea91f9d5a9f32cd",
//         "commentText": "Bye Bye",
//         "postedBy": "ar2",
//         "repliedTo": nul
// },
//       {
//         "commentID": "65f0b4a54ea91f9d5a9f32d0",
//         "commentText": "Hello are you",
//         "postedBy": "ar2",
//         "repliedTo": "65f0b48e4ea91f9d5a9f32cd"
//       },
//       {
//         "commentID": "65f0b4b34ea91f9d5a9f32d3",
//         "commentText": "Color of flower is pink",
//         "postedBy": "ar2",
//         "repliedTo": "65f0b48e4ea91f9d5a9f32cd"
//       }
//     ]
//   }
// }
// mdu-wiws-oeh