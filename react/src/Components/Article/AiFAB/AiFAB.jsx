// AiFAB.jsx

import "./AiFAB.css";
import { MdAdd } from "react-icons/md";
import { FcBusinessman, FcFullTrash } from "react-icons/fc";
import cn from "classnames";
import { React, useState, X, ArrowLeftCircleFill } from "../../index";
import { makeArticleSummaryRequest } from "./ChatGpt";
const FAB = () => {
  const articleUrl = window.location.href;

  const [openModal, setOpenModal] = useState(false);
  const [optionsPressed, setOptionsPressed] = useState(false);
  const handleShowAIModal = () => {
    setOpenModal(!openModal);
  };

  const handleCloseModal = () => {
    setOpenModal(false);
    setOptionsPressed(false);
  };

  const handleArticleSummaryPress = () => {
    setOptionsPressed(true);
    makeArticleSummaryRequest(articleUrl);
  };

  return (
    <>
      <div onClick={handleShowAIModal} className="fab_container">
        <MdAdd />
      </div>

      {openModal && (
        <div className="fab_ai_modal_full_container">
          <div className="fav_ai_modal_content_container">
            <div className="fav_modal_close_btn">
              {optionsPressed && (
                <span onClick={() => setOptionsPressed(false)}>
                  <ArrowLeftCircleFill />
                </span>
              )}
              <span onClick={handleCloseModal}>
                <X />
              </span>
            </div>

            {!optionsPressed && (
              <div className="fav_modal_options_buttons_container">
                <button onClick={handleArticleSummaryPress}>
                  Give an AI Generated Summary
                </button>
                <button onClick={() => setOptionsPressed(true)}>
                  Detailed explanation by AI
                </button>
              </div>
            )}
            {openModal && optionsPressed && (
              <div className="fav_modal_explanation_shown">
                explainaed fby chate
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
};

export default FAB;
