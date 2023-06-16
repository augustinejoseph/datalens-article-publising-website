import React, { useEffect, useRef } from "react";
import EditorJS from "@editorjs/editorjs";
import Header from "@editorjs/header";
import { EDITOR_JS_TOOLS } from "./tools";

const NewArticle = () => {
  const ejInstance = useRef(null);

  const loadDraftFromLocalStorage = () => {
    const draft = localStorage.getItem("articleDraft");
    if (draft) {
      return JSON.parse(draft);
    }
    return null;
  };

  const saveDraftToLocalStorage = (data) => {
    localStorage.setItem("articleDraft", JSON.stringify(data));
  };

  const DEFAULT_INITIAL_DATA = {
    time: new Date().getTime(),
    blocks: [
      {
        type: "header",
        data: {
          text: "This is my awesome editor!",
          level: 1,
        },
      },
    ],
  };

  const clearDraftFromLocalStorage = () => {
    localStorage.removeItem("articleDraft");
  };

  useEffect(() => {
    const initEditor = async () => {
      const draftData = loadDraftFromLocalStorage();

      const editor = new EditorJS({
        holder: "editorjs",
        autofocus: true,
        data: draftData ? draftData : DEFAULT_INITIAL_DATA,
        onChange: async () => {
          let content = await editor.save();
          saveDraftToLocalStorage(content);
          console.log("Content saved in draft:", content);
        },
        tools: EDITOR_JS_TOOLS,
      });

      ejInstance.current = editor;
    };

    initEditor();

    return () => {
      const editorInstance = ejInstance.current;
      if (editorInstance && typeof editorInstance.destroy === "function") {
        editorInstance.destroy();
      }
      ejInstance.current = null;
    };
  }, []);

  return (
    <div id="editorjs">
      <button onClick={clearDraftFromLocalStorage}>Clear Draft</button>
    </div>
  );
};

export default NewArticle
