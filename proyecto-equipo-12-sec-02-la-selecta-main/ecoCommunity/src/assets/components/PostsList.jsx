import React from "react";
import { useState, useEffect } from "react";
import PostInteractions from "./modals/PostInteractions";
import Publicacion from "./Publicacion";

const PostList = ({posts}) => {

console.log(posts);
    if (posts[0] == undefined) {
        return(
            <h1 className="text-xl text-white font-bold">Nothing to show here...</h1>
        );
}
else{
    return(
        <div className=" h-auto bg-maincolor ">
           
            {posts.map((element) => (
                      <Publicacion element = {element} key = {element._id}/>                    
                  ))}    

                  
        </div>
    );
}
  
}

export default PostList;