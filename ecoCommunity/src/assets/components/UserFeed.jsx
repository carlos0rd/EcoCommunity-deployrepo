import React from "react";
import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import PostList from "./PostsList";
import Crear from "./modals/Crear";
import { whoAmI, getOwnPosts, getSavedPosts, logout } from "../services/ecoCommunity.services";

const UserFeed = () => {
    const [isOpen, setIsOpen] = useState(false);

    const navigateTo = useNavigate()

    const toggleModal = () => {
      setIsOpen(!isOpen);
    };

    const [showFavorites, setShowFavorites] = useState([]);
    const [posts, setPosts] = useState([]);
    const [who, setWho] = useState([]);

    const getData = async () => {
      const posts = await getOwnPosts();
      const who = await whoAmI();
      setShowFavorites(0);
      setPosts(posts);
      setWho(who);
    };

    const getFavorites = async () => {
        const posts = await getSavedPosts();
        setShowFavorites(1);
        setPosts(posts);
        
      };

      const handleLogOut = () => {
        logout();
        navigateTo.push("/login");
      }      

    useEffect(() =>{
        getData();
      }, [], posts);


      if(showFavorites == 0){
        return(
            <div className="h-auto min-w-full bg-maincolor ">
                
                <div id="header" className=" h-1/4 flex justify-center items-center flex-row gap-4 p-12 relative">
                    <article className="absolute left-8"> 
                    <img src="assets/Logo1-5d5331e3.png" alt="Eco-community" className="object-contain h-24 w-48" />
                    </article>
                    
                </div>
                
                <div id="content" className="h-3/4 flex justify-center items-center flex-row min-h-full relative">
                    <section className="w-1/4 flex flex-col absolute top-0 left-0 gap-6 pt-12">
                    <button onClick={toggleModal} className="flex gap-0.5 pl-8 fixed bottom-8 text-xl hover:text-orange-400 hover:duration-300"><span className="material-symbols-outlined" >add_box</span>Postear </button>
                    {isOpen && (
                                <Crear closeModal ={toggleModal}/>
                                )}                        
                    </section>
                    <section className="w-2/4 flex justify-center items-center flex-col absolute top-0 gap-1 pb-8" >
                     
                     <div className="flex justify-item-start gap-4 w-full pb-4 pl-8">
                     <button className="user-posts border-2 rounded-xl w-28 bg-white text-maincolor">Todos</button>
                     <button className="user-posts border-2 rounded-xl w-36">Publicaciones</button>
                     <button className="user-posts border-2 rounded-xl w-28">Eventos</button>
                     </div>
    
                     <PostList posts = {posts}/>
    
                    </section>
    
                    <section className="w-1/4 flex justify-center items-center flex-col absolute right-0 top-60 gap-4 ">
    
                    <div className="flex justify-center items-center">
                        <article><img src="https://i.ibb.co/5TVvL4M/user.png" alt="user-icon" className="object-contain h-20"/></article>
                       <div className="flex flex-col">
                            <h3 className="font-semibold text-green-400 text-xl">@{who.username}</h3>
                            <h3 className="text-xl">{who.email}</h3>
                        </div>
                    </div>
                        
                        <button className="flex gap-1 hover:text-orange-400 hover:duration-300">

      <Link to="/Feed">
        <span class="material-symbols-outlined">Home</span> Inicio
      </Link>
    </button>
                        <button onClick={getFavorites} className="flex gap-1 hover:text-orange-400 hover:duration-300"><span className="material-symbols-outlined flex">bookmark</span>Favoritos</button>
                        <button onClick={handleLogOut} className="flex gap-1 hover:text-orange-400 hover:duration-300" ><span class="material-symbols-outlined">Logout</span>Cerrar Sesion</button>
                        <div className="flex flex-wrap gap-2 text-xs">
                             <a href="" className="underline">Acerca de</a>
                             <a href="" className="underline">Contacto</a>
                        </div>
                        
                    </section>
                </div>
            </div>
        );
      }
      else{
        return(
            <div className="h-auto min-w-full bg-maincolor ">
                
            <div id="header" className=" h-1/4 flex justify-center items-center flex-row gap-4 p-12 relative">
                <article className="absolute left-8"> 
                <img src="assets/Logo1-5d5331e3.png" alt="Eco-community" className="object-contain h-24 w-48" />
                </article>
                
            </div>
            
            <div id="content" className="h-3/4 flex justify-center items-center flex-row min-h-full relative">
                <section className="w-1/4 flex flex-col absolute top-0 left-0 gap-6 pt-12">
                    <button onClick={toggleModal} className="flex gap-0.5 pl-8 fixed bottom-8 text-xl hover:text-orange-400 hover:duration-300"><span className="material-symbols-outlined" >add_box</span>Postear </button>
                    {isOpen && (
                                <Crear closeModal ={toggleModal}/>
                                )}
                    
                </section>
                <section className="w-2/4 flex justify-center items-center flex-col absolute top-0 gap-1 pb-8" >

                 <h1 className="text-3xl p-2 font-bold text-orange-400">Lista de posts guardados: </h1>

                 <PostList posts = {posts}/>

                </section>

                <section className="w-1/4 flex justify-center items-center flex-col absolute right-0 top-60 gap-4 ">

                <div className="flex justify-center items-center">
                    <article><img src="https://i.ibb.co/5TVvL4M/user.png" alt="user-icon" className="object-contain h-20"/></article>
                   <div className="flex flex-col">
                        <h3 className="font-semibold text-green-400 text-xl">@{who.username}</h3>
                        <h3 className="text-xl">{who.email}</h3>
                    </div>
                    
                </div>
                
                
                
                    <button className="flex gap-1 pt-8 hover:text-orange-400 hover:duration-300"><span className="material-symbols-outlined flex">notifications</span>Notificaciones</button>
                    <button onClick={getFavorites} className="flex gap-1 hover:text-orange-400 hover:duration-300"><span className="material-symbols-outlined flex">bookmark</span>Favoritos</button>
                  
                    <button className="flex gap-1 hover:text-orange-400 hover:duration-300">
                      <Link to="/Feed">
                        <span class="material-symbols-outlined">Home</span> Inicio
                      </Link>
                      </button>

                      <div className="flex flex-wrap gap-2 text-xs">
                        <a href="" className="underline">Acerca de</a>
                        <a href="" className="underline">Contacto</a>
                   </div>
                    
                </section>
            </div>
        </div>
        );
      }
    
}

export default UserFeed;