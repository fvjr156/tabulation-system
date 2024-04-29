import React, { useState, useEffect } from "react";
import "./SurveyCreator.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import GetDateTime from "../../api/datetime";
import { POST_uploadSurvey } from "../../api/survey_opers";

function QuestionBox({
  id,
  onQTextChange,
  onQTypeChange,
  onQDelete,
  onQImageFile,
  QuestionNumber,
}) {
  const [question, setQuestion] = useState("");
  const [questionType, setQuestionType] = useState("shortAnswer");
  const [choices, setChoices] = useState([""]);
  const [numRadioBoxes, setNumRadioBoxes] = useState(5);
  const [imageFile, setImageFile] = useState(null);
  const [imageFileURL, setImageFileURL] = useState(null);

  // useEffect(() => {
  //     console.log(`Uploaded Image: `, imageFile)
  // }, [imageFile])

  const QTextChange = function (event) {
    const newText = event.target.value;
    setQuestion(newText);
    onQTextChange(id, newText, choices, numRadioBoxes);
  };

  const QTypeChange = function (event) {
    const newType = event.target.value;
    setQuestionType(newType);
    onQTypeChange(id, newType);

    if (newType !== "multipleChoice") {
      setChoices([""]);
    }

    if (newType === "radioButtons") {
      setNumRadioBoxes(5);
    }
  };

  const QDelete = function () {
    onQDelete(id);
  };

  const handleChoiceChange = function (index, value) {
    const newChoices = [...choices];
    newChoices[index] = value;
    setChoices(newChoices);
    onQTextChange(id, question, newChoices, numRadioBoxes);
  };

  const addChoice = function () {
    setChoices([...choices, ""]);
  };

  const removeChoice = function (index) {
    const newChoices = [...choices];
    newChoices.splice(index, 1);
    setChoices(newChoices);
    onQTextChange(id, question, newChoices, numRadioBoxes);
  };

  const handleNumRadioBoxesChange = function (event) {
    const value = parseInt(event.target.value, 10);
    setNumRadioBoxes(value);
    onQTextChange(id, question, choices, value);
  };

  const handleAddImageFile = async function (event, filename) {
    try {
      const uploadedImage = await event.target.files[0];
      const modUploadedImage = new File([uploadedImage], filename, {
        type: uploadedImage.type,
      }); 
      setImageFile(modUploadedImage);
      setImageFileURL(URL.createObjectURL(modUploadedImage)); //for preview
      onQImageFile(id, imageFile, filename); //send to SurveyCreator to store before submit
    } catch (error) {
      throw error;
    }
  };

  return (
    <div className="questionDiv">
      <h2>Question no. {QuestionNumber}</h2>
      <label>Question: </label>
      <input type="text" value={question} onChange={QTextChange} />
      <label>Question Type: </label>
      <select value={questionType} onChange={QTypeChange}>
        <option value="shortAnswer">Short Answer</option>
        <option value="multipleChoice">Multiple Choice</option>
        <option value="radioButtons">Radio Buttons</option>
      </select>
      <div className="imageselectordiv">
        <label>
          Add an Image (Optional, JPEG/PNG)
          <br />
          <input
            type="file"
            accept=".jpg,.png,.jpeg"
            onChange={(e) => handleAddImageFile(e, `${GetDateTime()}.jpg`)}
          />
        </label>
        <br />
        {imageFileURL && (
          <>
            <p>Image Preview</p>
            <img
              src={imageFileURL}
              alt="Product"
              style={{
                width: "25%",
                height: "100%",
                border: "1px solid blue",
              }}
            />
          </>
        )}
      </div>
      {questionType === "multipleChoice" && (
        <div>
          <label>Choices:</label>
          {choices.map((choice, index) => (
            <div key={index} className="choicebox">
              <input
                type="text"
                value={choice}
                onChange={(e) => handleChoiceChange(index, e.target.value)}
              />
              {choices.length > 1 && (
                <button onClick={() => removeChoice(index)}>Remove</button>
              )}
            </div>
          ))}
          <button onClick={addChoice}>Add Choice</button>
        </div>
      )}
      {questionType === "radioButtons" && (
        <div>
          <label>Number of Radio Boxes:</label>
          <input
            type="number"
            min={2}
            value={numRadioBoxes}
            onChange={handleNumRadioBoxesChange}
          />
        </div>
      )}
      <button className="button-small" onClick={QDelete}>
        Delete
      </button>
    </div>
  );
}

function SurveyCreator() {
  document.title = "rewriting frontend code in progress";

  const [surveyName, setSurveyName] = useState("");
  const [creatorName, setCreatorName] = useState("");
  const [questions, setQuestions] = useState([]);
  const [uploadedImages, setUploadedImages] = useState([]);

  const HandleAddQuestionBox = function () {
    const questionCount = questions.length + 1;
    setQuestions([
      ...questions,
      {
        id: questionCount,
        text: "",
        questionType: "shortAnswer",
        choices: [""],
        numRadioBoxes: 5,
      },
    ]);
  };

  const HandleQBTextChange = function (id, text, choices, numRadioBoxes) {
    setQuestions((prevQuestions) =>
      prevQuestions.map((question) =>
        question.id === id
          ? {
              ...question,
              text: text,
              choices: choices,
              numRadioBoxes: numRadioBoxes,
            }
          : question
      )
    );
  };

  const HandleQBTypeChange = function (id, type) {
    setQuestions((prevQuestions) =>
      prevQuestions.map((question) =>
        question.id === id
          ? {
              ...question,
              questionType: type,
              choices: type === "multipleChoice" ? [""] : [],
              numRadioBoxes: type === "radioButtons" ? 2 : undefined,
            }
          : question
      )
    );
  };

  const HandleQBImageFile = function (id, imageFile, filename) {
    setUploadedImages([...uploadedImages, { id, filename, imageFile }]);
    setQuestions((prevQuestions) =>
      prevQuestions.map(
        (question) =>
          question.id === id
            ? { ...question, image_filename: filename }
            : question
        //make sure na filename ang papasok dito ah
        //image_filename dapat
      )
    );
  };

  useEffect(
    function () {
      console.log(JSON.stringify(questions));
    },
    [questions]
  );

  //my problem with this code: values passed in functions, code logic; fix is to map out functions and rewrite problematic code

  const HandleQBDelete = function (id) {
    setQuestions((prevQuestions) =>
      prevQuestions.filter((question) => question.id !== id)
    );
  };

  const SubmitSurveyCreatorData = async function () {
    if (questions.length === 0) {
      toast.warning("Please add questions before submitting the survey.");
      return;
    }

    const formData = new FormData();

    const surveyData = {
      survey_name: surveyName,
      create_date: GetDateTime(),
      creator: creatorName,
      questions: questions.map((question) => ({
        id: question.id,
        question: question.text,
        question_type: question.questionType,
        choices: question.choices,
        image_filename: question.imagefile_name
          ? question.imagefile_name
          : null,
        //make sure na filename string ang value nito pag may laman na image file
        //plan is dito din kukunin ang filename na ilalagay sa upload at database
      })),
    };

    const jsonData = JSON.stringify(surveyData);
    formData.append("surveyData", jsonData);

    uploadedImages.forEach((image) => {
      formData.append("images", image.imageFile, image.filename);
    });

    try {
      const response = await POST_uploadSurvey(formData);
      if (response.status(200)) {
        toast.success("Survey submitted successfully!");
      } else {
        toast.error(response.error);
      }
    } catch (error) {
      console.error("Error submitting survey:", error);
      toast.error("Failed to submit survey. Please try again later.");
    }
  };

  return (
    <>
      <div className="surveycreatordiv">
        <h1>Survey Creator</h1>
        <div className="input-container">
          <label>Survey Name:</label>
          <input
            type="text"
            value={surveyName}
            onChange={(e) => setSurveyName(e.target.value)}
          />
        </div>
        <div className="input-container">
          <label>Creator's Name:</label>
          <input
            type="text"
            value={creatorName}
            onChange={(e) => setCreatorName(e.target.value)}
          />
        </div>
        <div className="actionbuttons">
          <button onClick={HandleAddQuestionBox}>Add Question</button>
          {questions.map((question) => (
            <QuestionBox
              key={question.id}
              id={question.id}
              onQTextChange={HandleQBTextChange}
              onQTypeChange={HandleQBTypeChange}
              onQDelete={HandleQBDelete}
              onQImageFile={HandleQBImageFile}
              QuestionNumber={question.id}
            />
          ))}
          <button onClick={SubmitSurveyCreatorData}>Submit Survey</button>
        </div>
      </div>
      <ToastContainer />
    </>
  );
}

export default SurveyCreator;
