import axios from "axios";
//const BASE_URL = "http://localhost:3500/api";
const BASE_URL = "https://real-gray-buffalo-coat.cyclic.app/api";

export const createUser = async (formData) => {
    try{
        
        const response = await axios.post(`${BASE_URL}/auth/register`, formData, {
            headers:{
                'Content-Type': 'application/json',
            }
        });

        return response.data;
    }
    catch(error){
        console.error('Error al realizar la petición:', error);
        throw new Error("Error al registrar el usuario, intente nuevamente.");
    }
}

export const login = async (formData) => {
    try{
        
        const response = await axios.post(`${BASE_URL}/auth/login`, formData, {
            headers:{
                'Content-Type': 'application/json',
            }
        });
      
        localStorage.setItem('token', response.data.token);
        return response.data;
        
    }
    catch(error){
        console.error('Error al realizar la petición:', error);
        throw new Error("Error al iniciar sesión.");
    }
}

export const logout = () => {
    localStorage.removeItem('token');
}

export const createPost = async (formData) => {
    try{
        
        const response = await axios.post(`${BASE_URL}/post/`, formData, {
            headers:{
                'Authorization': `Bearer ${localStorage.getItem('token')} `,
                'Content-Type': 'application/json'
            }
        });

        return response.data;
    }
    catch(error){
        console.error('Error al realizar la petición:', error);
        throw new Error("No se pudo crear el post.");
    }
}


export const updatePost = async (identifier, formData) => {
    try {
      const response = await axios.post(`${BASE_URL}/post/${identifier}`, formData, {
        headers: {
          'Content-Type': 'application/json',
        },
      });
  
      return response.data;
    } catch (error) {
      console.error('Error al realizar la petición:', error);
      throw new Error("Error al intentar actualizar el post.");
    }
  };

  export const getAllPosts = async () => {
    try {
      const response = await axios.get(`${BASE_URL}/post/`);
      //console.log(response.data.posts); // DEBUG
  
      if (response.status === 200) return response.data.posts;
      else return [];
    } catch (error) {
      console.log("Error:", error.message);
      return [];
    }
  };

  export const getUserPosts = async (postId) => {
    try {
      const response = await axios.get(`${BASE_URL}/post/user/${postId}`);
      //console.log(response.data.posts); // DEBUG
  
      if (response.status === 200) return response.data.posts;
      else return [];
    } catch (error) {
      console.log("Error:", error.message);
      return [];
    }
  };

  export const getOwnPosts = async () => {
    try {
      const response = await axios.get(`${BASE_URL}/post/own` , {
        headers:{
            Authorization: `Bearer ${localStorage.getItem('token')} `,
        }
      });
      //console.log(response.data.posts); // DEBUG
      if (response.status === 200) return response.data.posts;
      else return [];
    } catch (error) {
      console.log("Error:", error.message);
      return [];
    }
  };

  export const getSavedPosts = async () => {
    try {
      const response = await axios.get(`${BASE_URL}/post/saved` , {
        headers:{
            Authorization: `Bearer ${localStorage.getItem('token')} `,
        }
      });
      console.log(response.data.posts); // DEBUG
      if (response.status === 200) return response.data.posts;
      else return [];
    } catch (error) {
      console.log("Error:", error.message);
      return [];
    }
  };

  export const whoAmI = async () => {
    try {
        //console.log(localStorage.getItem('token'));
      const response = await axios.get(`${BASE_URL}/auth/whoami`,
      {
        headers:{
            Authorization: `Bearer ${localStorage.getItem('token')} `,
        }
      });
    //  console.log(response.data); // DEBUG
        
      

      if (response.status === 200) return response.data;
      else return [];
    } catch (error) {
      console.log("Error:", error.message);
      return [];
    }
  };


  export const getParticipants = async (postId) => {
    try {
        //console.log(localStorage.getItem('token'));
      const response = await axios.get(`${BASE_URL}/post/volunteer/${postId}`,
      {
        headers:{
            Authorization: `Bearer ${localStorage.getItem('token')} `,
        }
      });
     console.log(response.data.posts[0].participants); // DEBUG
        
      

      if (response.status === 200) return response.data.posts[0].participants;
      else return [];
    } catch (error) {
      console.log("Error:", error.message);
      return [];
    }
  };

  export const toogleLike = async (postId) => {
    try {
      if (!postId) throw new Error("post identifier is required!");
  
      const response = await axios.patch(`${BASE_URL}/post/like/${postId}` , "",{
          headers:{
            Authorization: `Bearer ${localStorage.getItem('token')} `,
        }
        }   
      );
       //console.log(localStorage.getItem('token'));
  
      if (response.status === 200) return true;
      else return undefined;
    } catch (error) {
      console.log("Error:", error.message);
      return undefined;
    }
  };


  export const toogleParticipants = async (postId) => {
    try {
      if (!postId) throw new Error("post identifier is required!");
  
      const response = await axios.patch(`${BASE_URL}/post/volunteer/${postId}` , "",{
          headers:{
            Authorization: `Bearer ${localStorage.getItem('token')} `,
        }
        }   
      );
       console.log(response.status);
  
      if (response.status === 200) return true;
      else return undefined;
    } catch (error) {
      console.log("Error:", error.message);
      return undefined;
    }
  };

  export const getIsLiked = async (postId) => {
    try {
        //console.log(localStorage.getItem('token'));
      const response = await axios.get(`${BASE_URL}/post/like/${postId}`, 
      {
        headers:{
            Authorization: `Bearer ${localStorage.getItem('token')} `,
        }
      });
     // console.log(response.data.message); // DEBUG
            
      if (response.status === 200) return response.data.message;
      else return [];
    } catch (error) {
      console.log("Error:", error.message);
      return [];
    }
  };

  export const toogleSave = async (postId) => {
    try {
      if (!postId) throw new Error("post identifier is required!");
  
      const response = await axios.patch(`${BASE_URL}/post/save/${postId}` , "",{
          headers:{
            Authorization: `Bearer ${localStorage.getItem('token')} `,
        }
        }   
      );
       //console.log(localStorage.getItem('token'));
  
      if (response.status === 200) return true;
      else return undefined;
    } catch (error) {
      console.log("Error:", error.message);
      return undefined;
    }
  };

  export const getIsSaved = async (postId) => {
    try {
        //console.log(localStorage.getItem('token'));
      const response = await axios.get(`${BASE_URL}/post/save/${postId}`, 
      {
        headers:{
            Authorization: `Bearer ${localStorage.getItem('token')} `,
        }
      });
     // console.log(response.data.message); // DEBUG
            
      if (response.status === 200) return response.data.message;
      else return [];
    } catch (error) {
      console.log("Error:", error.message);
      return [];
    }
  };

  export const getIsVolunteer = async (postId) => {
    try {
        //console.log(localStorage.getItem('token'));
      const response = await axios.get(`${BASE_URL}/post/participant/${postId}`, 
      {
        headers:{
            Authorization: `Bearer ${localStorage.getItem('token')} `,
        }
      });
     // console.log(response.data.message); // DEBUG
            
      if (response.status === 200) return response.data.message;
      else return [];
    } catch (error) {
      console.log("Error:", error.message);
      return [];
    }
  };

  export const eliminarPublicacion = async (postId) => {
    try {
      if (!postId) throw new Error("postId is required!");
  
      const response = await axios.delete(`${BASE_URL}/post/${postId}` ,
      {
        headers:{
          Authorization: `Bearer ${localStorage.getItem('token')} `,
      }
      });
      // console.log(response);
  
      if (response.status === 200) return true;
      else return undefined;
    } catch (error) {
      console.log("Error:", error.message);
      return undefined;
    }
  };


  export function eliminarToken(){
    try{
      localStorage.removeItem('token');
      console.log("removido");
    }
    catch(error){
      console.log(error);
    }
    
  }