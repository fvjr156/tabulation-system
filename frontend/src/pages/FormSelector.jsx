import { useEffect, useState } from "react";
import './FormCreator.css'
import axios from 'axios'

function FormSelector() {
  const [surveyForms, setSurveyForms] = useState([]);
  const [selectedForm, setSelectedForm] = useState(null);

  useEffect(() => {
    const fetchSurveyForms = async () => {
      try {
        const response = await axios.get('http://127.0.0.1:3001/surveys');
        console.log(response.data);
        if (!response.ok) {
          throw new Error("Failed to fetch survey forms");
        }
        const data = await response.data();
        setSurveyForms([...surveyForms, data]);
      } catch (error) {
        console.error("Error fetching survey forms:", error);
      }
    };

    fetchSurveyForms();
  }, []);

  const handleFormSelect = (event) => {
    setSelectedForm(event.target.value);
  };

  return (
    <div className="selector-div">
      <h2>Select a Survey Form</h2>
      <select onChange={handleFormSelect}>
        <option value="">Select a form...</option>
        {surveyForms.map((form) => (
          <option key={form.id} value={form.form_filename}>
            {form.form_name}
          </option>
        ))}
      </select>
      {selectedForm && (
        <div>
          <h3>Selected Form: {selectedForm}</h3>
          {/* Additional details or actions for the selected form */}
        </div>
      )}
    </div>
  );
}
export default FormSelector;
