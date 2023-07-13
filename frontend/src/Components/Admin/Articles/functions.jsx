import { gql } from "@apollo/client";
import {FRONTEND_DOMAIN_NAME} from '../../index'
import { borderRadius } from "@mui/system";
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
  backgroundColor: "green",
  padding : ".3rem 1rem",
  borderRadius : "10px",
  color : "white",
};
const blockedButtonStyle = {
  backgroundColor: "red",
  padding : ".3rem 1rem",
  borderRadius : "10px",
  color : "white",
};
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
          <p style={{ fontWeight: "bold" }}>{title}</p>
          <p style={{ whiteSpace: "normal" }}>{summary}</p>
        </div>
      );
    },
  },
  {
    field: "preview image",
    headerName: "Image",
    width: 200,
    renderCell: (params) => {
      const { previewImage } = params.row;
      return (
        <img
          style={{ width: "100px", height: "" }}
          src={previewImage}
          alt="image"
        />
      );
    },
  },
  {
    field: "actions",
    headerName: "Actions",
    width: 150,
    sortable: false,
    renderCell: (params) => {
      const articleId = params.row.id;
      console.log('article id in admin article for ban', articleId);
      const isArticleBanned = params.row.is_banned;

      const handleBlockArticleClick = () => {
        handleBanToggle(params.row.articleId, isArticleBanned);
      };

      if (isArticleBanned) {
        return (
          <button style={unblockButtonStyle} onClick={handleBlockArticleClick}>
            Unblock
          </button>
        );
      } else {
        return (
          <button style={blockedButtonStyle} onClick={handleBlockArticleClick}>
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
  window.open(url, "_blank");
};
