const { json } = require("express");
const Post = require("../models/Post.model");
const User = require("../models/User.model");
const debug = require("debug")("app:post-controller");

const controller = {};

controller.save = async (req, res, next) => {
    //Premisa - la ruta save debe estar autenticada
    try{
        const {titulo, descripcion, imagen, ubicacion, etiquetas, menciones, tipo, usuario, likes, participants} = req.body;
        const { postId } = req.params;
        const { user } = req;

       // debug({ user });
        // const post = new Post({
        //     titulo: titulo,
        //     descripcion: descripcion,
        //     imagen: imagen,
        //     ubicacion: ubicacion,
        //     etiquetas: etiquetas,
        //     menciones: menciones,
        //     tipo: tipo,
        //     usuario: usuario,
        //     likes: likes
        // });

        let post = await Post.findById(postId);

        if(!post){
            post = new Post();
            post["user"] = user._id;
        }else{
            if(!post["user"].equals(user._id)){
                return res.status(403).json({error: "Not your post"});
            }
        }

        post["titulo"] = titulo;
        post["descripcion"] = descripcion;
        post["imagen"] = imagen;
        post["ubicacion"] = ubicacion;
        post["etiquetas"] = etiquetas;
        post["menciones"] = menciones;
        post["tipo"] = tipo;
        post["likes"] = likes;
        post["participants"] = participants;

        const postSaved = await post.save();
        if(!postSaved){
            return res.status(409).json({error: "Error creating Post"});
        }
        return res.status(201).json(postSaved);
    }
    catch(error){
        next(error);
    }
}

controller.findAll = async (req, res, next) => {

    try{
        const posts = await Post.find().sort({createdAt: -1})
        .populate("user", "username email")
        .populate("likes", "username email")
        .populate("comments.user", "username email");

        return res.status(200).json({posts});
    }
    catch(error){
        next(error);
    }
}

controller.findOneById = async (req, res, next) => {
    try{
        const { postId } = req.params;

        //TODO: verificar si es visible
        const post = await Post.findOne({_id: postId})
            .populate("user", "username email")
            .populate("likes", "username email")
            .populate("comments.user", "username email");
        if(!post){
            return res.status(404).json({error: "Post not found"});
        }
        return res.status(200).json({post});

    }
    catch(error){
            next(error);
    }
}

controller.findByUser = async (req, res, next) => {
    try{
        const {identifier} = req.params;

        const posts = await Post.find({user: identifier}).sort({createdAt: -1})
            .populate("user", "username email")
            .populate("likes", "username email")
            .populate("comments.user", "username email");

        return res.status(200).json({posts});
    }
    catch(error){
        next(error);
    }
}

controller.findLike = async (req, res, next) => {
    try{
        const {postId} = req.params;
        const {_id: userId} = req.user;

        const posts = await Post.find({_id: postId, likes: userId})          
        .populate("likes", "username email");
             //debug(postId);  
            //debug(userId);
           
            if(posts == ""){
                return res.status(200).json({message: "false"});

            }

            return res.status(200).json({message: "true"});

    }
    catch(error){
        next(error);
    }
}

controller.findIsVolunteer = async (req, res, next) => {
    try{
        const {postId} = req.params;
        const {_id: userId} = req.user;

        const posts = await Post.find({_id: postId, participants: userId})          
        .populate("participants", "username email");
             //debug(postId);  
            //debug(userId);
           
            if(posts == ""){
                return res.status(200).json({message: "false"});

            }

            return res.status(200).json({message: "true"});

    }
    catch(error){
        next(error);
    }
}

controller.findParticipants = async (req, res, next) => {
    try{
        const {postId} = req.params;
        const {_id: userId} = req.user;

        const posts = await Post.find({_id: postId}, {"participants":1, "_id":0})          
        .populate("participants", "username email");
             //debug(postId);  
            //debug(userId);
           
            if(posts == ""){
                return res.status(200).json({posts});

            }
            debug(posts);
            //posts: user["savedPosts"]

            return res.status(200).json({posts});

    }
    catch(error){
        next(error);
    }
}


controller.isSaved = async (req, res, next) => {
    try{
        const {postId} = req.params;
        const {_id: userId} = req.user;

        const posts = await User.find({savedPosts: postId, _id: userId})          
       ;
       //     debug(postId);  
          //  debug(userId);
           
            if(posts == ""){
                return res.status(200).json({message: "false"});

            }

            return res.status(200).json({message: "true"});

    }
    catch(error){
        next(error);
    }
}

controller.findOwn = async (req, res, next) => {
    try{
        const {_id: userId} = req.user;

        const posts = await Post.find({user: userId}).sort({createdAt: -1})
            .populate("user", "username email")
            .populate("likes", "username email")
            .populate("comments.user", "username email");
    
        return res.status(200).json({posts});

    }
    catch(error){
        next(error);
    }
}


controller.findSavedPosts = async (req, res, next) => {
    try{
        const user =
        await (req.user)
        .populate({
            path: "savedPosts",
            populate: [
                {
                    path: "user",
                    select: "username email"
                },
                {
                    path: "likes",
                    select: "username email"
                },
                {
                    path: "comments.user",
                    select: "username email"
                }
            ]
        });
    
        return res.status(200).json({posts: user["savedPosts"]});

    }
    catch(error){
        next(error);
    }
}

controller.likeAPost = async (req, res, next) => {
    try{
        const {identifier} = req.params;
        const user = req.user;

        const post = await Post.findOne({_id: identifier})
            .populate("user", "username email")
            .populate("comments.user", "username email");

        if(!post){
            return res.status(404).json({error: "Post not found"});
        }

        let _likes = post["likes"] || [];
        const alreadyLike = _likes.findIndex(_i => _i.equals(user._id)) >= 0;

        if(alreadyLike){
            _likes = _likes.filter(_i => !_i.equals(user.id));
        }else{
            _likes = [user.id, ..._likes];
        }

        post ["likes"] = _likes;

        const newPost = await (await post.save())
            .populate("likes", "username email");
        return res.status(200).json(newPost);

    }
    catch(error){
        next(error);
    }
}

//Hacer find que encuentre las participaciones del usuario pasandole el id del evento 

controller.volunteerToEvent = async (req, res, next) => {
    try{
        const {identifier} = req.params;
        const user = req.user;

        const post = await Post.findOne({_id: identifier})
            .populate("user", "username email")
            .populate("comments.user", "username email");

        if(!post){
            return res.status(404).json({error: "Post not found"});
        }

        let _participants = post["participants"] || [];
        const alreadyLike = _participants.findIndex(_i => _i.equals(user._id)) >= 0;

        if(alreadyLike){
            _participants = _participants.filter(_i => !_i.equals(user.id));
        }else{
            _participants = [user.id, ..._participants];
        }

       // debug (_participants);
        
        
        post ["participants"] = _participants;

        const newPost = await (await post.save())
            .populate("participants", "username email");
        return res.status(200).json(newPost);

    }
    catch(error){
        next(error);
    }
}

controller.saveAPost = async (req, res, next) => {
    try{
        const {identifier} = req.params;
        const user = req.user;

        const post = await Post.findOne({_id: identifier})
            .populate("user", "username email")
            .populate("likes", "username email");

        if(!post){
            return res.status(404).json({error: "Post not found"});
        }

        let _posts = user["savedPosts"] || [];
        const alreadySaved = _posts.findIndex(_i => _i.equals(post._id)) >= 0;

        if(alreadySaved){
            _posts = _posts.filter(_i => !_i.equals(post._id));
        }else{
            _posts = [post._id, ..._posts];
        }

        //Commit a los cambios
        user["savedPosts"] = _posts
        const newUser = await (await user.save())
            .populate({
                path: "savedPosts",
                populate: [
                    {
                        path: "user",
                        select: "username email"
                    },
                    {
                        path: "likes",
                        select: "username email"
                    },
                    {
                        path: "comments.user",
                        select: "username email"
                    }
                ]
            })
            

        return res.status(200).json({posts: newUser["savedPosts"]});

    }
    catch(error){
        next(error);
    }
}

controller.deleteById = async (req, res, next) => {
    try {
      const { postId } = req.params;
      const user = req.user;
  
      const post  = await Post.findOneAndDelete({_id: postId, user: user._id});

      if(!post){
        return res.status(404).json({ error: "Post not found" })
      }
      
      return res.status(200).json({ message: "Post Deleted" })
    } catch (error) {
      next(error);
    }
  }
  
controller.saveComment = async (req, res, next) => {
  try {
    const { postId } = req.params;
    const { content, _id: commentId } = req.body;
    const user = req.user;

    //Obtener el post
    const post = 
        await Post.findOne({ _id: postId, hidden: false })
            .populate("user", "username email")
            .populate("likes", "username email");

    //Verificar que el post exista
    if(!post) {
        return res.status(404).json({ error: "Post not found" });
    }

    //Buscar la existencia de un comnetatio prervio (commentId)
    let _comments = post["comments"];

    const prevIndex = _comments.findIndex(_c => _c._id.equals(commentId));
    if(prevIndex >= 0) {
        //el comentario ya existe
        const _comment = _comments[prevIndex];
        _comment.history = [..._comment.history, _comment.content];
        _comment.content = content;

        _comment[prevIndex] = _comment;
    } else {
        //el comentario no existe
        _comments = [..._comments, { user: user._id, timestamp: new Date(), content }];
    }

    //Guardamos el post -> commit
    post["comments"] = _comments;
    const newPost = 
        await (await post.save())
            .populate("comments.user", "username email");

    //Retornamos el post actualizado
    return res.status(200).json(newPost);

  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
}


module.exports = controller;