import React from "react";
import { useState, useEffect } from "react";
import PostInteractions from "./modals/PostInteractions";
import { getAllPosts, getSavedPosts, whoAmI, eliminarToken } from "../services/ecoCommunity.services";
import PostList from "./PostsList";
import Crear from "./modals/Crear";
import { Link } from "react-router-dom";
import Post from "./modals/Post";



const Feed = () => {
    const [isOpen, setIsOpen] = useState(false);

    const toggleModal = () => {
      setIsOpen(!isOpen);
    };

    const [showFavorites, setShowFavorites] = useState([]);
    const [posts, setPosts] = useState([]);
    const [who, setWho] = useState([]);

    const getData = async () => {
      const posts = await getAllPosts();
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
      
      const getAllAndFavoritesPosts = async () => {
        const allPosts = await getAllPosts();
        const favoritesPosts = await getSavedPosts();
        const mergedPosts = allPosts.map(post => {
            const isFavorite = favoritesPosts.some(favPost => favPost.id === post.id);
            return { ...post, isFavorite };
        });
        setPosts(mergedPosts);
    };

    const handleShowAllPosts = async () => {
        setShowFavorites(false);
        await getAllAndFavoritesPosts();
    };

    useEffect(() =>{
        getData();
      }, [], posts);

      const [searchTerm, setSearchTerm] = useState(""); 

    const handleSearch = (event) => {
        setSearchTerm(event.target.value); 
    };


    const handleStorage = () => {
        localStorage.removeItem('token');
        console.log("removido");
        
      };
    const searchPosts = () => {
        return posts.filter((post) =>
            post.titulo.toLowerCase().includes(searchTerm.toLowerCase())
        );
    };

    
    if(showFavorites == 0){
        //console.log(showFavorites);
        return(
            <div className="h-auto min-w-full bg-maincolor ">
                
                <div id="header" className=" h-1/4 flex justify-center items-center flex-row gap-4 p-12 relative">
                    <article className="absolute left-8"> 
                    <img src="assets/Logo1-5d5331e3.png" alt="Eco-community" className="object-contain h-24 w-48" />
                    </article>
                    
                    
                    <input
                        name="Buscar"
                        type="text"
                        placeholder="Buscar"
                        className="bg-transparent border-white border-2 rounded-2xl p-2 absolute right-10"
                        onChange={handleSearch} 
                    />
                
                </div>
                
                <div id="content" className="h-3/4 flex justify-center items-center flex-row min-h-full relative">
                    <section className="w-1/4 flex flex-col absolute top-0 left-0 gap-6 pt-12">
                        <button onClick={toggleModal} className="flex gap-0.5 pl-8 hover:text-orange-400 hover:duration-300"><span className="material-symbols-outlined" >add_box</span>Postear </button>
                        {isOpen && (
                                <Crear closeModal ={toggleModal}/>
                                )}
                        <button className="flex gap-0.5 pl-8 hover:text-orange-400 hover:duration-300"><span className="material-symbols-outlined">notifications</span>Notificaciones</button>
                        <button className="flex gap-0.5 pl-8 hover:text-orange-400 hover:duration-300"><span className="material-symbols-outlined">logout</span>Cerrar Sesion</button>
                    </section>
                    <section className="w-2/4  flex justify-center items-center flex-col absolute top-0 gap-1 pb-8" >
                     
                      
                      <PostList posts={searchPosts()} />
    
    
                    </section>
                    <section className="w-1/4 flex justify-center items-center flex-col absolute right-0 top-60 gap-4 ">
                   
                        <button onClick={getFavorites} className="flex gap-1 hover:text-orange-400 hover:duration-300"><span className="material-symbols-outlined flex">star</span>Favoritos</button>
                      
                        
                        <Link to={`/UserFeed`} className="">
                        <a href="" className="flex justify-center items-center"> <article><img src="https://i.ibb.co/5TVvL4M/user.png" alt="user-icon" className="object-contain h-10 hover:h-12 hover:duration-300"/></article> @{who.username}</a>
                         </Link>
                       
                        <div className="flex flex-wrap gap-2 text-xs">
                        <a href="" className="underline">Condiciones de servicio</a>
                            <a href="" className="underline">Acerca de</a>
                            <a href="" className="underline">Contacto</a>
                       </div>
                     
                    </section>
                </div>
            </div>
        );
    }
    else{
        console.log(showFavorites);
        return(
            <div className="h-auto min-w-full bg-maincolor ">
                
            <div id="header" className=" h-1/4 flex justify-center items-center flex-row gap-4 p-12 relative">
                <article className="absolute left-8"> 
                <img src="assets/Logo1-5d5331e3.png" alt="Eco-community" className="object-contain h-24 w-48" />
                </article>
                
                
                <input
                    name="Buscar"
                    type="text"
                    placeholder="Buscar"
                    className="bg-transparent border-white border-2 rounded-2xl p-2 absolute right-10"
                    onChange={handleSearch} 
                />
            
            </div>
            
            <div id="content" className="h-3/4 flex justify-center items-center flex-row min-h-full relative">
                <section className="w-1/4 flex flex-col absolute top-0 left-0 gap-6 pt-12">
                    <button onClick={toggleModal} className="flex gap-0.5 pl-8 hover:text-orange-400 hover:duration-300"><span className="material-symbols-outlined" >add_box</span>Postear </button>
                    {isOpen && (
                            <Crear closeModal ={toggleModal}/>
                            )}
                    <button onClick={handleShowAllPosts} className="flex gap-0.5 pl-8 hover:text-orange-400 hover:duration-300">
                    <span className="material-symbols-outlined">Home</span>Inicio
                </button>
                    <button className="flex gap-0.5 pl-8 hover:text-orange-400 hover:duration-300"><span className="material-symbols-outlined">notifications</span>Notificaciones</button>
                    <button className="flex gap-0.5 pl-8 hover:text-orange-400 hover:duration-300"><span className="material-symbols-outlined">Logout</span>Cerrar Sesion</button>
                    
                </section>
                <section className="w-2/4  flex justify-center items-center flex-col absolute top-0 gap-1 pb-8" >
                 
                  <h1 className="text-3xl p-2 font-bold text-orange-400">Lista de posts guardados: </h1>
                  <PostList posts={searchPosts()} />


                </section>
                <section className="w-1/4 flex justify-center items-center flex-col absolute right-0 top-60 gap-4 ">
               
                    <button onClick={getFavorites} className="flex gap-1 hover:text-orange-400 hover:duration-300"><span className="material-symbols-outlined flex">bookmark</span>Favoritos</button>
                                      
                    <Link to={`/UserFeed`} className="">
                    <a href="" className="flex justify-center items-center"> <article><img src="https://i.ibb.co/5TVvL4M/user.png" alt="user-icon" className="object-contain h-10 hover:h-12 hover:duration-300"/></article> @{who.username}</a>
                     </Link>
                   
                    <div className="flex flex-wrap gap-2 text-xs">
                    <a href="" className="underline">Condiciones de servicio</a>
                        <a href="" className="underline">Acerca de</a>
                        <a href="" className="underline">Contacto</a>
                   </div>
                 
                </section>
            </div>
        </div>
        );    
    }
    
}

export default Feed;