import React from "react";

const Volunteer = ({list}) =>{
    console.log(list);
    return(

        
        <div className="flex justify-start items-center gap-1 p-2 w-full"> 
        <div className="flex w-1/4">
        <article><img src="src/images/user.png" alt="user-icon" className="object-contain h-14"/></article>
        </div>
        <div className="flex flex col w-3/4 flex-wrap">
        <p href="" className="font-semibold text-modal-color">@{list.username}</p>
        <p href="" className="text-sm text-modal-color">{list.email}</p>

        </div>

    </div>
    );
}

export default Volunteer;