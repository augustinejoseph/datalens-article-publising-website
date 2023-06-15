import EditorJS from "@editorjs/editorjs";
import React, { useEffect, useRef } from "react";
import Header from "@editorjs/header";
import {EDITOR_JS_TOOLS} from './tools'

const NewArticle = () => {
  const initEditor = () => {
    const editor = new EditorJS({
      holder: "editorjs",
      onReady: () => {
        ejInstance.current = editor;
      },
      autofocus: true,
      data: DEFAULT_INITIAL_DATA,
      onChange: async () => {
        let content = await editor.save();

        console.log('content in editor.js', content);
        console.log("editor const in editor.js", editor)
      },
      tools: {
        header: {
          class: Header,
          config: {
            placeholder: "Enter a header",
            levels: [1, 2, 3, 4, 5, 6], // Specify the header levels you want to allow
          },
        },
        
        // Other tools
      },
    });
  };

  const ejInstance = useRef();

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

  useEffect(() => {
    if (ejInstance.current === null) {
      initEditor();
    }

    return () => {
      ejInstance?.current?.destroy();
      ejInstance.current = null;
    };
  }, []);

  return <div id="editorjs"></div>;
};

export default NewArticle;
