import { sampleArticle } from "./SampleArticle";
import { axios } from "../../index";
export const makeArticleSummaryRequest = async (articleUrl) => {
  const options = {
    method: "POST",
    url: "https://tldrthis.p.rapidapi.com/v1/model/abstractive/summarize-url/",
    headers: {
      "content-type": "application/json",
      "X-RapidAPI-Key": "e0647e59eemshb79cfd9e5536ea0p197cc2jsn900f7e66b164",
      "X-RapidAPI-Host": "tldrthis.p.rapidapi.com",
    },
    data: {
      url: "https://techcrunch.com/2019/08/12/verizon-is-selling-tumblr-to-wordpress-parent-automattic/",
      min_length: 100,
      max_length: 300,
      is_detailed: false,
    },
  };

  try {
    const response = await axios.request(options);
  } catch (error) {
    console.error("error api", error);
  }
};
