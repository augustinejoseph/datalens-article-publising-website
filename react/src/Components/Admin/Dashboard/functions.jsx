import { BACKEND_BASE_URL, ARTICLE_SERVER_NODE_BASE_URL } from "../index";
import { adminAxiosToDjangoServerInterceptor } from "../../../Axios/AxiosInstance"

export const fetchStatics = async (setLoading, setStatistics ) => {
    setLoading(true)
    try{
    const response = await adminAxiosToDjangoServerInterceptor.get(`${BACKEND_BASE_URL}/dashboard`);
    setLoading(false)
    console.log(response);
    setStatistics(response.data)
    }catch(error){
        setLoading(false)
        console.log(" dashboard error",error);
    }
    return
}


export const fetchArticleStatistics = async (setLoading, setArticleStatistics) => {
    setLoading(true)
    try{
        const response = await adminAxiosToDjangoServerInterceptor.get(`${ARTICLE_SERVER_NODE_BASE_URL}/admin/statistics`)
        setLoading(false)
        console.log('article response',response);
        setArticleStatistics(response.data)
    }catch(error){
        setLoading(false)
        console.log(error)
    }
}