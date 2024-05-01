import React, { useState, useEffect } from "react";
import "./FormCreator.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { POST_uploadSurvey } from "../../api/survey_opers";
import { QuestionBox } from "./QuestionBox";

function FormCreator() {
  useEffect(() => {
    document.title = "Versatily-TSPro Tabulation System";
  }, []);

  const [formName, setFormName] = useState("");
  const [formAuthor, setFormAuthor] = useState("");
  const [formQuestions, setFormQuestions] = useState([]);
  const [images, setImages] = useState([]);

  const handleAddQuestion = function () {
    const questionCount = formQuestions.length + 1;
    setFormQuestions([
      ...formQuestions,
      {
        id: questionCount,
        questionType: "shortAnswer",
        multipleChoices: [""],
        radioBoxCount: 5,
        image_filename: null,
      },
    ]);
  };

  const handleQuestionTextChange = function (
    id,
    text,
    multipleChoices,
    radioBoxCount
  ) {
    setFormQuestions((questions) =>
      questions.map((question) =>
        question.id === id
          ? {
              ...question,
              questionText: text,
              multipleChoices: multipleChoices,
              radioBoxCount: radioBoxCount,
            }
          : question
      )
    );
  };

  const handleQuestionTypeChange = function (id, questionType) {
    setFormQuestions((questions) =>
      questions.map((question) =>
        question.id === id
          ? {
              ...question,
              questionType: questionType,
              multipleChoices: questionType === "multipleChoice" ? [""] : [],
              radioBoxCount: questionType === "radioButtons" ? 2 : undefined,
            }
          : question
      )
    );
  };

  const handleImageFile = function (id, imageData) {
    console.log(imageData.image_name);
    setImages([...images, imageData.image_file]);
    setFormQuestions((questions) =>
      questions.map((question) =>
        question.id === id
          ? { ...question, image_filename: imageData.image_name }
          : question
      )
    );
  };

  const handleDeleteQuestionBox = function (id) {
    setFormQuestions((questions) =>
      questions.filter((question) => question.id !== id)
    );
  };

  const submitFormCreatorData = async function () {
    if (!formName || !formAuthor) {
      toast.error("Please enter a survey name and author.");
      return;
    } else if (formQuestions.length < 1) {
      toast("Get started by adding a question.");
      return;
    }

    const formCreatorData = {
      form_name: formName,
      form_author: formAuthor,
      form_content: formQuestions,
    };

    const formData = new FormData();
    images.forEach((image) => {
      formData.append("images", image);
      console.log(image);
    });
    const JSONdata = JSON.stringify(formCreatorData);
    formData.append("form_data", JSONdata);

    console.log(formData.getAll("images")); //File object array
    console.log(formData.get("form_data")); //string

    try {
      const result = await POST_uploadSurvey(formData);
      if (result.success) {
        toast.success("Form uploaded successfully!");
        setFormName("");
        setFormAuthor("");
        setFormQuestions([]);
        setImages([]);
      } else {
        toast.error(`Error submitting form: ${result.error}`);
      }
    } catch (error) {
      toast.error(`Error submitting form: ${error}`);
      return;
    }
  };

  return (
    <>
      <div className="survey-creator">
        <h1>Survey Creator</h1>
        <div className="input-container">
          <label>Survey Name: </label>
          <input
            type="text"
            value={formName}
            onChange={(e) => setFormName(e.target.value)}
          />
        </div>
        <div className="input-container">
          <label>Survey Author: </label>
          <input
            type="text"
            value={formAuthor}
            onChange={(e) => setFormAuthor(e.target.value)}
          />
        </div>
        <div className="action-buttons">
          <button onClick={handleAddQuestion}>Add Question</button>
          {formQuestions.map((question) => (
            <QuestionBox
              key={question.id}
              id={question.id}
              questionNumber={question.id}
              onChangeText={handleQuestionTextChange}
              onChangeType={handleQuestionTypeChange}
              onDelete={handleDeleteQuestionBox}
              onAddImage={handleImageFile}
            />
          ))}
          <button onClick={submitFormCreatorData}>Submit Survey</button>
        </div>
      </div>
      <ToastContainer />
    </>
  );
}

export default FormCreator;
