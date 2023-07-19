  // Sql Django Query for author data
  export const fetchAuthorData = async (BACKEND_BASE_URL,user_id, setAuthor, axios) => {
    try {
      const response = await axios.get(
        `${BACKEND_BASE_URL}/author/author-details-by-id/${user_id}`
      );
      console.log(response.data);
      const { id, user_name, first_name, last_name, email } = response.data;
      setAuthor({ id, user_name, first_name, last_name, email });
    }catch(error){
      console.error(error)
    }
  }

  export const authorNameButton = {
    fontWeight : "200",
    color : "grey",
    fontFamily : `sohne, "Helvetica Neue", Helvetica, Arial, sans-serif`
  }


 export const categoryButtonStyle = {
    marginRight: "1rem",
    cursor: "pointer",
    backgroundColor: "#ECF0F1",
    color: "black",
    padding: ".3rem .89rem",
    borderRadius: "20px",
    whiteSpace: "nowrap",
  };