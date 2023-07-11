import {axios, ARTICLE_SERVER_NODE_BASE_URL, useNavigate,adminAxiosToDjangoServerInterceptor} from '../index'

export function extractBodyText(body) {
    const navigate = useNavigate()
    const plainText = body.ops.reduce((text, op) => {
      if (typeof op.insert === 'string') {
        return text + op.insert;
      }
      return text;
    }, '');
  
    const words = plainText.split(' ');
    const limitedWords = words.slice(0, 55);
    const bodyText = limitedWords.join(' ');
  
    return bodyText;
  }
  

//   Delete draft
export const deleteDraft = async (id) => {
    try{
        const response = await adminAxiosToDjangoServerInterceptor.delete(`${ARTICLE_SERVER_NODE_BASE_URL}user/delete-draft/${id}`)
        console.log('draft deleted', response);
        setSuccessMessage("Draft deleted successfully")
    }catch(error){
        console.log('error deleting draft', error)
        setErrorMessage("Error deleting draft")
    }
}