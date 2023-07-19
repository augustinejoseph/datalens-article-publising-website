import axios from "axios"
import { ARTICLE_SERVER_NODE_BASE_URL, adminAxiosToDjangoServerInterceptor } from "../../index"

// delete article by id
export const deleteArticle = async (id) => {

    try{
        const response = await adminAxiosToDjangoServerInterceptor.delete(`${ARTICLE_SERVER_NODE_BASE_URL}/user/delete-article/${id}`)
        return response.data
    }catch(error){
        console.error(error)
        throw new Error('Error deleting resource');
    }

}