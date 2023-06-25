import axios from "axios"
import { ARTICLE_SERVER_NODE_BASE_URL } from "../../EditArticle"

// delete article by id
export const deleteArticle = async (id) => {
    try{
        const response = await axios.delete(`${ARTICLE_SERVER_NODE_BASE_URL}article/${id}`)
        return response.data
    }catch(error){
        throw new Error('Error deleting resource');
        console.error(error)
    }

}