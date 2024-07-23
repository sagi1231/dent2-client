import ReactQuill from "react-quill";
import styled from "styled-components";
import { Article } from "../../core/entities/article";
import { Controller, useFormContext } from "react-hook-form";
import { Editor } from "@tinymce/tinymce-react";
import {
  forwardRef,
  useCallback,
  useEffect,
  useImperativeHandle,
  useRef,
} from "react";
import React from "react";
import generatorService from "../../core/services/generator.service";
import { useParams } from "react-router";

const EditorContainer = styled.div`
  height: calc(100vh - 85px);
  overflow: auto;
`;

const ArticleTextEditor = () => {
  const { getValues, setValue, handleSubmit } = useFormContext<Article>();
  const editorRef = useRef<any>();
  const selectedElement = useRef<Element>();
  const value = getValues("body");
  const { articleId } = useParams();

  const handler = (e: any) => {
    selectedElement.current?.append(e.detail);
  };

  const endStreamHandler = useCallback(() => {
    if (selectedElement.current?.textContent)
      setValue("body", editorRef.current.getContent());
  }, [handleSubmit]);

  useEffect(() => {
    document.removeEventListener("stream", handler);
    document.addEventListener("stream", handler);
    document.removeEventListener("end-stream", endStreamHandler);
    document.addEventListener("end-stream", endStreamHandler);
  }, [endStreamHandler, selectedElement]);

  const refraseWidget = () => {
    if (selectedElement.current && selectedElement.current.textContent) {
      generatorService
        .regenerateArticleWidget(
          selectedElement.current.textContent,
          articleId as string
        )
        .then(() => {});

      selectedElement.current.textContent = "";
    }
  };

  return (
    <EditorContainer className="overflow-auto">
      <Editor
        apiKey="c6b2eufyb1kx5rbc8jt19dx2gzf74hsovsd0nfpr6kfwdujz"
        onInit={(evt, editor) => {
          editorRef.current = editor as any;

          editor.ui.registry.addMenuItem("paragraph", {
            icon: "text",
            text: "Regenerate section",
            onAction: function () {
              refraseWidget();
            },
          });

          editor.ui.registry.addMenuItem("label", {
            icon: "text",
            text: "Regenerate title",
            onAction: function () {
              refraseWidget();
            },
          });

          editor.ui.registry.addContextMenu("test", {
            update: function (element: Element) {
              selectedElement.current = element;
              console.log(element.tagName);
              if (
                element.tagName === "H1" ||
                element.tagName === "H2" ||
                element.tagName === "H3"
              ) {
                return "label";
              } else if (element.tagName === "P") return "paragraph";
              return "";
            },
          });
          return { language: "he_IL" };
        }}
        onEditorChange={(v) => setValue("body", v)}
        value={value}
        init={{
          height: "100%",
          menubar: false,
          plugins: [
            "advlist",
            "autolink",
            "lists",
            "link",
            "image",
            "charmap",
            "anchor",
            "searchreplace",
            "visualblocks",
            "code",
            "fullscreen",
            "insertdatetime",
            "media",
            "table",
            "code",
            "wordcount",
          ],
          toolbar:
            "undo redo | blocks | " +
            "bold italic forecolor | alignleft aligncenter " +
            "alignright alignjustify | bullist numlist outdent indent | " +
            "removeformat",
          content_style: `@import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;900&display=swap');
          body { font-family:Inter,sans-serif; font-size:14px; padding: 20px 70px; }
          .header img{border-radius: 12px;border: solid 1px rgb(226, 232, 240); width:100%;height: 400px;object-fit: cover;}
          .header h1{
            color: #1C244B;
            font-size: 42px;
          font-weight: bold;
          text-transform: none;
          font-style: normal;
          text-decoration: none;
          line-height: 1.3em;
          letter-spacing: -1.2px;}
          li{margin-bottom:10px;}
          p{color: #0A2540;
            font-size: 18px;
            font-weight: 300;
            text-transform: none;
            font-style: normal;
            text-decoration: none;
            line-height: 2em;
            letter-spacing: -0.2px;}
            h3{font-size: 24px;
              font-weight: 600;}
              h2{font-size: 32px;
                font-weight: bold;}
                a{box-shadow: none;
                  text-decoration: none;
                  color: #A960EE !important;
                }`,
          contextmenu: "image link test table", // add test menu later
          contextmenu_never_use_native: true,
        }}
      />
    </EditorContainer>
  );
};

export default React.memo(ArticleTextEditor);
