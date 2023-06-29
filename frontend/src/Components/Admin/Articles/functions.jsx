import { gql } from "@apollo/client";


const generateSerialNumber = (params) => (params.rowIndex + 1).toString();

export const GET_ARTICLES = gql`
query GetArticles {
  articles {
    title
    category {
      name
    }
    name
    createdAt
    summary
    is_premium
    readingTime
    articleId
    previewImage
    is_banned
    claps
    is_featured
  }
}
`;


const unblockButtonStyle = {

}
const blockedButtonStyle =  {

}
export const columns = (handleBanToggle) => [
    {
      field: "details",
      headerName: "Author",
      width: 150,
      renderCell: (params) => {
        const { email, name, is_premium } = params.row;
        return (
          <div>
            <p>{email}</p>
            <p>{name}</p>
            <p>Premium: {is_premium ? "Yes" : "No"}</p>
          </div>
        );
      },
    },

    {
      field: "content",
      headerName: "Content",
      width: 800,
      renderCell: (params) => {
        const { title, summary } = params.row;
        return (
          <div>
            <p style={{fontWeight:"bold"}}>{title}</p>
            <p style={{ whiteSpace: "normal" }}>{summary}</p>
          </div>
        );
      },
    },
    {
        field:"preview image",
        headerName : "Image",
        width :200,
        renderCell : (params) => {
            const {previewImage} = params.row;
            return(<img style={{width:"100px", height:""}} src={previewImage} alt="image" />)}
    },
    {
      field: "actions",
      headerName: "Actions",
      width: 150,
      sortable: false,
      renderCell: (params) => {
        const userId = params.row.id;
        const isUserBlocked = params.row.is_banned;
  
        const handleBlockUserClick = () => {
          handleBanToggle(userId);
        };
  
        if (isUserBlocked) {
          return (
            <button style={unblockButtonStyle} onClick={handleBlockUserClick}>
              Unblock
            </button>
          );
        } else {
          return (
            <button style={blockedButtonStyle} onClick={handleBlockUserClick}>
              Block
            </button>
          );
        }
      },
    },
  ];
  
  
// show article in next tab
export const handleRowClick = (params) => {
    const { articleId } = params.row;
    const url = `${FRONTEND_DOMAIN_NAME}article/${articleId}`; // Modify the URL as per your application logic

    // Open the URL in a new tab
    window.open(url, '_blank');
  };