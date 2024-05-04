import React, { useState } from "react";
import GetDateTime from "../../api/datetime";

export function QuestionBox({
  id,
  questionNumber,
  onChangeText,
  onChangeType,
  onAddImage,
  onDelete,
}) {
  const [questionText, setquestionText] = useState("");
  const [questionType, setQuestionType] = useState("shortAnswer");
  const [multipleChoices, setMultipleChoices] = useState([""]);
  const [radioBoxCount, setRadioBoxCount] = useState(5);
  const [imageUrl, setImageUrl] = useState(null);

  const handlequestionTextChange = function (event) {
    const text = event.target.value;
    setquestionText(text);
    onChangeText(id, text, multipleChoices, radioBoxCount);
  };

  const handleQuestionTypeChange = function (event) {
    const type = event.target.value;
    setQuestionType(type);
    onChangeType(id, type);

    if (type === "multipleChoice") {
      setMultipleChoices([""]);
    }
    if (type === "radioButtons") {
      setRadioBoxCount(5);
    }
  };

  const handleDeleteQuestionBox = function () {
    onDelete(id);
  };

  const handleMultipleChoicesChange = function (index, choiceValue) {
    const choices = [...multipleChoices];
    choices[index] = choiceValue;
    setMultipleChoices(choices);
    onChangeText(id, questionText, choices, radioBoxCount);
  };

  const handleAddChoice = function () {
    setMultipleChoices([...multipleChoices, ""]);
  };

  const handleRemoveChoice = function (index) {
    const choices = [...multipleChoices];
    choices.splice(index, 1);
    setMultipleChoices(choices);
    onChangeText(id, questionText, choices, radioBoxCount);
  };

  const handleRadioBoxCountChange = function (event) {
    const value = parseInt(event.target.value, 10);
    setRadioBoxCount(value);
    onChangeText(id, questionText, multipleChoices, value);
  };

  const handleImageUpload = async function (event) {
    const uploaded_image = event.target.files[0];
    const image_filename = uploaded_image.name;
    const file_extension = image_filename.split('.').pop().toLowerCase();
    const modified_filename = `${GetDateTime()}.${file_extension}`;
    const modified_image = new File([uploaded_image], modified_filename, {
      type: uploaded_image.type,
    });
    const reader = new FileReader();
    reader.onloadend = function () {
      const image_data = {
        image_name: modified_filename,
        image_file: modified_image,
      };
      setImageUrl(URL.createObjectURL(image_data.image_file));
      onAddImage(id, image_data);
    };
    reader.readAsDataURL(modified_image);
  };

  return (
    <div className="question-box">
      <h2>Question no. {questionNumber}</h2>
      <label>Question: </label><br/>
      <textarea
        type="text"
        value={questionText}
        onChange={handlequestionTextChange}
      /><br/>
      <label>Question Type: </label>
      <select value={questionType} onChange={handleQuestionTypeChange}>
        <option value="shortAnswer">Short Answer</option>
        <option value="multipleChoice">Multiple Choice</option>
        <option value="radioButtons">Radio Buttons</option>
      </select>
      <div className="image-selector">
        <label>Add an Image (Optional, JPEG/PNG)</label>
        <input
          type="file"
          accept=".jpg,.png,.jpeg"
          onChange={handleImageUpload}
        />
        <br />
        {imageUrl && (
          <>
            <p>Image Preview</p>
            <img
              src={imageUrl}
              alt="Image"
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
          <label>Choices</label>
          {multipleChoices.map((choice, index) => (
            <div key={index}>
              <input
                type="text"
                value={choice}
                onChange={(e) =>
                  handleMultipleChoicesChange(index, e.target.value)
                }
              />
              {multipleChoices.length > 1 && (
                <button onClick={() => handleRemoveChoice(index)}>
                  Remove
                </button>
              )}
            </div>
          ))}
          <button onClick={handleAddChoice}>Add Choice</button>
        </div>
      )}
      {questionType === "radioButtons" && (
        <div>
          <label>Number of Radio Boxes:</label>
          <input
            type="number"
            min={2}
            value={radioBoxCount}
            onChange={handleRadioBoxCountChange}
          />
        </div>
      )}
      <button onClick={handleDeleteQuestionBox}>Delete</button>
    </div>
  );
}
