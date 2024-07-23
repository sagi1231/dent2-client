import { Editor } from "@tinymce/tinymce-react";
import { useCallback, useEffect, useMemo, useRef } from "react";
import { useRecoilValue } from "recoil";
import styled from "styled-components";
import { articleState } from "../../state/articleState";
import { useParams } from "react-router";
import Link from "../common/Link";
import LogoIcon from "../../assets/Logo/LogoIcon.png";
import Button from "../common/form/Button";
import ArticleEditorNavbar from "./ArticleEditorNavbar";
import AppConfig from "../../config/appConfig";

const ViewerContainer = styled.div`
  height: calc(100vh - 85px);
  overflow: auto;

  .tox-editor-header {
    display: none !important;
  }
  .tox-statusbar {
    display: none !important;
  }
`;

const OverWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  top: 0px;
  display: flex;
  width: 100%;
  border-bottom: 1px solid #e2e8f0;
  border-top: 1px solid #e2e8f0;
  background: white;
  height: 70px;
  z-index: 99;
`;

const Wrapper = styled.div`
  display: flex;
  height: 70px;
  padding-left: 25px;
  align-items: center;
`;

const BoxImage = styled.img`
  width: 35px;
  padding-left: 25px;
  padding-right: 25px;
  box-sizing: content-box;
  object-fit: contain;

  transition-duration: 0.25s;
`;

const ArticleViewer: React.FC = () => {
  const editorRef = useRef<any>(null);
  const { websiteId, articleId } = useParams();
  const article = useRecoilValue(articleState(articleId as string));

  const articleContent = useMemo(() => {
    return (
      `
      <div class="header"><img width="700px" align="center" src="${article?.imageSrc}"/>
    <h1>${article?.title}</h1></div>` + article?.body
    );
  }, [article?.body, article?.imageSrc, article?.title]);

  return (
    <>
      <ArticleEditorNavbar preview />
      <ViewerContainer className="overflow-auto">
        <Editor
          apiKey="c6b2eufyb1kx5rbc8jt19dx2gzf74hsovsd0nfpr6kfwdujz"
          onInit={(evt, editor) => {
            editorRef.current = editor;
          }}
          value={articleContent}
          init={{
            height: "100%",
            width: "100%",
            menubar: false,
            content_style: `@import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;900&display=swap');
              body { font-family:Inter,sans-serif; font-size:14px; padding: 20px 250px; }
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
                    }
                    img{
                      height: 400px;
    object-fit: cover;
    object-position: bottom;
                    }
                    .faq-item p{
font-size:14px;
                    }`,
            toolbar: false,
            //plugins: "export",
          }}
          disabled
        />
      </ViewerContainer>
    </>
  );
};

export default ArticleViewer;
