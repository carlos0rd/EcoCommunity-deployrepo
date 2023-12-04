import React from "react";
import { useState, useEffect } from "react";
import PostInteractions from "./modals/PostInteractions";
import { getIsLiked, whoAmI , toogleLike, getIsSaved, toogleSave, getIsVolunteer, toogleParticipants} from "../services/ecoCommunity.services";
import Donar from "./modals/Donar";
import CancelarPublicacion from "./modals/CancelarPublicacion";
import Participantes from "./modals/Participantes";
import { Link } from "react-router-dom";


const Publicacion = (element) => {
    const [isOpen, setIsOpen] = useState(false);
    const [showDonarInfo, setShowDonarInfo] = useState(false);
    const [showDelete, setShowDelete] = useState(false);
    const [showParticipants, setShowParticipants] = useState(false);




  //  console.log(element);

    const toggleModal = () => {
      setIsOpen(!isOpen);
    };

    const handleShowDelete = () => {
      setShowDelete(!showDelete);
    };


    const handleShowParticipants = () => {
      setShowParticipants(!showParticipants);
    };

    

    const [likeStatus, setLikeStatus] = useState();
    const [savedStatus, setSavedStatus] = useState();
    const [like, setLike] = useState([]);
    const [saved, setSaved] = useState([]);
    const [toggle, setToggle] = useState([]);
    const [toggle2, setToggle2] = useState([]);
    const [showDonar, setShowDonar] = useState(false);

    const [volunteerStatus, setVolunteerStatus] = useState([]);
    const [isVolunteer, setIsVolunteer] = useState([]);
    const [who, setWho] = useState([]);


  //Metodo para obtener la informacion de cada post
    const getData = async () => {
      const who = await whoAmI();
      setWho(who);

      const like = await getIsLiked(element.element._id);
      setLike(like);

      const saved = await getIsSaved(element.element._id);
      setSaved(saved);

      const participant = await getIsVolunteer(element.element._id);
      setSaved(participant);
     
      if(saved === 'true'){
        setSavedStatus('bookmark_added');  
       // console.log(savedStatus);
      }
      else{
        setSavedStatus('bookmark'); 
     //   console.log(savedStatus);

      }

      if(like === 'true'){
        setLikeStatus('heart_check');  
      //  console.log(likeStatus);
      }
      else{
        setLikeStatus('favorite'); 
       // console.log(likeStatus);

      }

      if(participant === 'true'){
        setVolunteerStatus('person_check');  
      //  console.log(likeStatus);
      }
      else{
        setVolunteerStatus('person_add'); 
       // console.log(likeStatus);

      }
    };

    
    const toLike = async () =>{   
     const toggle = await toogleLike(element.element._id);
     setToggle(toggle);
     if(likeStatus ==  'heart_check')
     {
      setLikeStatus('favorite');
     }
     else{
      setLikeStatus('heart_check')
     }
    // console.log(likeStatus);
    }

    const toParticipate = async () =>{   
      const toggle = await toogleParticipants(element.element._id);
         
        if(volunteerStatus ==  'person_check')
        {
         setVolunteerStatus('person_add');
        }
        else{
         setVolunteerStatus('person_check')
        }
       // console.log(likeStatus);
     }

    const toSave = async () =>{   
      const toggle2 = await toogleSave(element.element._id);
      setToggle2(toggle2);
      if(savedStatus ==  'bookmark_added')
      {
       setSavedStatus('bookmark');
      }
      else{
       setSavedStatus('bookmark_added')
      }
      console.log(savedStatus);
     }

     const handleDonarClick = () => {
      setShowDonarInfo(!showDonarInfo);
     
    };
    

    useEffect(() =>{
      getData();
    
    },[], likeStatus, savedStatus);
  
   // console.log(element.element.tipo);

    if(who.username == element.element.user.username){
      if((element.element.tipo) === ('Publicación')){
        return(
            <div className="h-auto  max-w-xl bg-maincolor relative ">
                <article className="flex flex-col gap-4 pb-12 relative"  >
                            <div className="flex items-center gap-1"> 
                               <article><img src="../src/images/user.png" alt="user-icon" className="object-contain h-14"/></article>
                               <Link to={`/UserPage/${element.element.user._id}`}>
                                <button className="font-semibold">@{element.element.user.username}</button>
                               </Link>
                            <p> - {element.element.titulo}</p>
                            <button onClick={handleShowDelete} className="flex justify-center"><span className="material-symbols-outlined absolute right-0 top-5 hover:text-red-500 hover:duration-300">delete</span></button>
                            {showDelete && <CancelarPublicacion close = {handleShowDelete} postId={element.element._id}/>} 
             
                            
                            </div>
                            <div className="flex justify-center items-center flex-col gap-2">
                            <article className="justify-center items-center h-auto w-full"><img src={element.element.imagen} alt="turtles" className="object-fill w-full feedimage" /></article>
                            </div>
                            <div className="flex flex-wrap items-center gap-1 w-16">
                               <p className="flex flex-wrap whitespace-normal">{element.element.descripcion}</p>
                            </div>
                            <div id="bottom-card">
                            <button onClick={toLike} className="flex justify-center"><span className="material-symbols-outlined absolute left-0 hover:text-orange-400 hover:duration-300">{likeStatus}</span></button>
                            <button onClick={toSave} className="flex justify-center"><span className="material-symbols-outlined absolute left-8 hover:text-orange-400 hover:duration-300">{savedStatus}</span></button>
                            <button  onClick={toggleModal} className="absolute right-0"><span className="material-symbols-outlined hover:text-orange-400 hover:duration-300">share</span> {isOpen && (
                  <PostInteractions/>
                  )}</button>
                            </div>
                           
                </article>     
            </div>
        );
        }
        else{
          return(
               <article className="flex flex-col max-w-xl gap-4 pb-12 relative" >
              <div className="flex items-center gap-1"> 
                <article><img src="../src/images/user.png" alt="user-icon" className="object-contain h-14"/></article>
                <Link to={`/UserPage/${element.element.user._id}`}>
                  <button className="font-semibold">@{element.element.user.username}</button>
                </Link>
              <p> - {element.element.titulo}</p>
              <button onClick={handleShowParticipants} className="flex justify-center absolute right-8 top-5 "><span className="material-symbols-outlined hover:text-orange-400 hover:duration-300">patient_list</span></button>
              {showParticipants && <Participantes close = {handleShowParticipants} postId={element.element._id}/>} 
    
              <button onClick={handleShowDelete} className="flex justify-center"><span className="material-symbols-outlined absolute right-0 top-5 hover:text-red-500 hover:duration-300">delete</span></button>
              {showDelete && <CancelarPublicacion close = {handleShowDelete} postId={element.element._id}/>} 
             
              </div>
              <div className="flex justify-center items-center flex-col gap-2">
              <article className="justify-center items-center h-auto w-full"><img src={element.element.imagen} alt="turtles" className="object-fill feedimage" /></article>
            
                <div className="flex w-full justify-start items-center">
                  <p className="h-auto text-justify"><span className="bg-secondcolor rounded-xl p-1.5 pl-3">Evento </span> {element.element.descripcion}</p>
                </div>
              
              <div id="bottom-card">
                  <button onClick={toLike} className="flex justify-center"><span className="material-symbols-outlined absolute left-0 hover:text-orange-400 hover:duration-300">{likeStatus}</span></button>
                  <button onClick={toSave} className="flex justify-center"><span className="material-symbols-outlined absolute left-8 hover:text-orange-400 hover:duration-300">{savedStatus}</span></button>
                  <button onClick={toParticipate} className="flex justify-center"><span className="material-symbols-outlined absolute left-24 hover:text-orange-400 hover:duration-300">{volunteerStatus}</span></button>
           
                  <button onClick={handleDonarClick} className="flex justify-center"><span className="material-symbols-outlined absolute left-16 hover:text-orange-400 hover:duration-300 ">credit_card</span></button>
                  {showDonarInfo && <Donar close={handleDonarClick}/>} 
    
                  <button  onClick={toggleModal} className="absolute right-0"><span className="material-symbols-outlined">share</span> {isOpen && (
                  <PostInteractions/>
                  )}</button>
              </div>
              </div>
          </article>
          );
           
        }
    }
    else{
      if((element.element.tipo) === ('Publicación')){
        return(
            <div className="h-auto  max-w-xl bg-maincolor relative ">
                <article className="flex flex-col gap-4 pb-12"  >
                            <div className="flex items-center gap-1"> 
                               <article><img src="../src/images/user.png" alt="user-icon" className="object-contain h-14"/></article>
                               <Link to={`/UserPage/${element.element.user._id}`}>
                                <button className="font-semibold">@{element.element.user.username}</button>
                               </Link>
                            <p> - {element.element.titulo}</p>
                          
                            
                            </div>
                            <div className="flex justify-center items-center flex-col gap-2">
                            <article className="justify-center items-center h-auto w-full"><img src={element.element.imagen} alt="turtles" className="object-fill w-full feedimage" /></article>
                            
                            <div className="flex w-full justify-start items-center">
                               <p className="h-auto text-justify"> {element.element.descripcion}</p>
                            </div>
                            <div id="bottom-card">
                            <button onClick={toLike} className="flex justify-center"><span className="material-symbols-outlined absolute left-0 hover:text-orange-400 hover:duration-300">{likeStatus}</span></button>
                            <button onClick={toSave} className="flex justify-center"><span className="material-symbols-outlined absolute left-8 hover:text-orange-400 hover:duration-300">{savedStatus}</span></button>
                            <button  onClick={toggleModal} className="absolute right-0"><span className="material-symbols-outlined hover:text-orange-400 hover:duration-300">share</span> {isOpen && (
                  <PostInteractions/>
                  )}</button>
                            </div>
                            </div>
                </article>     
            </div>
        );
        }
        else{
          return(
               <article className="flex flex-col gap-4  max-w-xl pb-12 relative" >
              <div className="flex items-center gap-1"> 
                <article><img src="../src/images/user.png" alt="user-icon" className="object-contain h-14"/></article>
                      <Link to={`/UserPage/${element.element.user._id}`}>
                          <button className="font-semibold">@{element.element.user.username}</button>
                        </Link>
              <p> - {element.element.titulo}</p>
             
              </div>
              <div className="flex justify-center items-center flex-col gap-2">
              <article className="justify-center items-center h-auto w-full"><img src={element.element.imagen} alt="turtles" className="object-fill w-full feedimage" /></article>
            
                <div className="flex w-full justify-start items-center">
                  <p className="h-auto text-justify"><span className="bg-secondcolor rounded-xl p-1.5 pl-3">Evento </span> {element.element.descripcion}</p>
                </div>
              
              <div id="bottom-card">
                  <button onClick={toLike} className="flex justify-center"><span className="material-symbols-outlined absolute left-0 hover:text-orange-400 hover:duration-300">{likeStatus}</span></button>
                  <button onClick={toSave} className="flex justify-center"><span className="material-symbols-outlined absolute left-8 hover:text-orange-400 hover:duration-300">{savedStatus}</span></button>
                  <button onClick={toParticipate} className="flex justify-center"><span className="material-symbols-outlined absolute left-24 hover:text-orange-400 hover:duration-300">{volunteerStatus}</span></button>
           
                  <button onClick={handleDonarClick} className="flex justify-center"><span className="material-symbols-outlined absolute left-16 hover:text-orange-400 hover:duration-300 ">credit_card</span></button>
                  {showDonarInfo && <Donar close={handleDonarClick}/>} 
    
                  <button  onClick={toggleModal} className="absolute right-0"><span className="material-symbols-outlined">share</span> {isOpen && (
                  <PostInteractions/>
                  )}</button>
              </div>
              </div>
          </article>
          );
           
        }
    }

    
}

export default Publicacion;