import {
  axios,
  ARTICLE_SERVER_NODE_BASE_URL,
  useNavigate,
  adminAxiosToDjangoServerInterceptor,
  useToast,
} from "../index";

export function extractBodyText(body) {
  const navigate = useNavigate();
  const plainText = body.ops.reduce((text, op) => {
    if (typeof op.insert === "string") {
      return text + op.insert;
    }
    return text;
  }, "");

  const words = plainText.split(" ");
  const limitedWords = words.slice(0, 55);
  const bodyText = limitedWords.join(" ");

  return bodyText;
}

//   Delete draft
export const deleteDraft = async (id, showToast) => {
  try {
    const response = await adminAxiosToDjangoServerInterceptor.delete(
      `${ARTICLE_SERVER_NODE_BASE_URL}/user/delete-draft/${id}`,
    );
    showToast(response.data.message, response.status);
  } catch (error) {
    showToast(response.data.message, response.status);
  }
};
