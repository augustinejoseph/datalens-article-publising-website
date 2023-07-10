export const addClap = async (id, ARTICLE_SERVER_NODE_BASE_URL, axios, setClaps) => {
    const response = await axios.put(`${ARTICLE_SERVER_NODE_BASE_URL}open/add-clap/${id}`)
    console.log(('clap api response', response));
    setClaps((prevClaps) => prevClaps+1)
}

export const addComment = () => {

}
