import React, { FC, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { fitnessFormState } from "../model/FitnessForm";
import { FormErrorState } from "../model/FormErrorState";
import { Messages } from "../messages/Messages";
import { Validator } from "../validators/Validation";
import axios from "axios";

const FitnessForm: FC = () => {
  const [state, setState] = useState<fitnessFormState>({
    name: "",
    contactNo: "",
    duration: "",
    fitnessGoal: "",
    preferredTime: "",
    id: "",
  });

  const fitnessGoalList: string[] = [
    "Weight Loss",
    "Muscle Gain",
    "Endurance",
    "Cardiovascular Health",
  ];

  const [formErrors, setFormErrors] = useState<FormErrorState>({
    nameError: "",
    contactNoError: "",
    durationError: "",
  });

  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [valid, setValid] = useState(false);

  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    setErrorMessage("");
    // Your code here
    /* 
        1. You should prevent page reload on submit
        2. Make an axios call to the URL specified in messages/Messages.ts file :
            "http://localhost:2500/fitness-form/" passing the appropriate state as 
            data to the axios call.
        3. If the axios call is successful, assign the successMessage state to the 
              SUCCESS message from Messages.ts file with the ID received from the response: 
              "Successfully submitted with Id: + <id>. 
        4. If the axios call is not successful, assign the errorMessage state to the 
              ERROR message from Messages.ts file : "Please run the backend".
        5. Use Messages object imported from messages/Messages.ts file to set the URL, success and error messages
    */

    e.preventDefault();

    try {
      const res = await axios.post<fitnessFormState>(Messages.URL, state);
      const data = res.data;

      setErrorMessage("");
      setSuccessMessage(Messages.SUCCESS + res.data.id);

      setState({
        name: "",
        contactNo: "",
        duration: "",
        fitnessGoal: "",
        preferredTime: "",
        id: "",
      });

      setTimeout(() => {
        navigate("/home");
      }, 5000);
    } catch (error) {
      setSuccessMessage("");
      setErrorMessage(Messages.ERROR);
    }
  };

  const handleChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ): void => {
    /*
        1. This method will be invoked whenever the user changes the value of any form field. 
            This method should also validate the form fields.
        2. 'event' input parameter will contain both name and value of the form field.
        3. Set state using the name and value recieved from event parameter. 
        4. Call the validateField method for validating form fields.
        */

    const { name, value } = event.target;
    const newState = {
      ...state,
      [name]: value,
    };
    setState(newState);

    validateField(name, value);
  };

  const validateField = (name: string, value: any): void => {
    let errors = { ...formErrors };
    /*
        1. Write validation for all input fields as given in QP document.
            Use appropriate methods imported from validators/Validation.ts 
        2. Set the error messages in formErrors state appropriately. 
            Use the Messages object imported from messages/Messages.ts
        3. Set the valid state to true if the below conditions are true
            - All the form fields are entered (Check by calling the validateForm 
                method in Validation.ts by passing the state as parameter)
            - The formErrors state must not contain any error messages
        4. If any of the above conditions are not true, set the valid state to false
    */

    switch (name) {
      case "name":
        return setFormErrors((prev) => ({
          ...prev,
          nameError: Validator.validateName(value) ? "" : Messages.NAME_ERROR,
        }));
      case "contactNo":
        return setFormErrors((prev) => ({
          ...prev,
          contactNoError: Validator.validateContactNo(value)
            ? ""
            : Messages.CONTACTNO_ERROR,
        }));
      case "duration":
        return setFormErrors((prev) => ({
          ...prev,
          durationError: Validator.validateDuration(value)
            ? ""
            : Messages.DURATION_ERROR,
        }));
      default:
        break;
    }

    // setValid(Validator.validateForm(state)); // better to use it in the useEffect
  };

  useEffect(() => {
    const hasErrors =
      formErrors.nameError ||
      formErrors.contactNoError ||
      formErrors.durationError;

    setValid(Validator.validateForm(state) && !hasErrors);
  }, [state, formErrors]);

  return (
    <React.Fragment>
      <div className="container ">
        <div className="row">
          <br />
          <div className="offset-md-5 col-md-5  ">
            <br />
            <div>
              <div className="head">
                <h3>
                  <b>Elite Fitness Plan</b>
                </h3>
              </div>
              <div>
                <form className="form form-background" onSubmit={handleSubmit}>
                  {/* create form as per the view given in screenshots */}
                  {/* Display field level formError state messages as given in QP */}
                  {/* Display success or error messages for axios calls as given in QP */}
                  <div className="form-group">
                    <label htmlFor="name" className="form-label fw-bold">
                      Name
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={state.name}
                      onChange={handleChange}
                      className="form-control"
                      placeholder="Enter your name"
                    />
                    <span className="text-danger">{formErrors.nameError}</span>
                  </div>
                  <div className="form-group">
                    <label htmlFor="contactNo" className="form-label fw-bold">
                      Contact Number
                    </label>
                    <input
                      type="text"
                      id="contactNo"
                      name="contactNo"
                      value={state.contactNo}
                      onChange={handleChange}
                      className="form-control"
                      placeholder="Enter your contact number"
                    />
                    <span className="text-danger">
                      {formErrors.contactNoError}
                    </span>
                  </div>
                  <div className="form-group">
                    <label htmlFor="fitnessGoal" className="form-label fw-bold">
                      Fitness Goal
                    </label>
                    <select
                      name="fitnessGoal"
                      id="fitnessGoal"
                      value={state.fitnessGoal}
                      onChange={handleChange}
                      className="form-select"
                    >
                      <option value="" disabled>
                        --Select your Fitness Goal--
                      </option>
                      {fitnessGoalList.map((item) => (
                        <option value={item}>{item}</option>
                      ))}
                    </select>
                  </div>
                  <div className="form-group">
                    <div>
                      <label htmlFor="" className="form-label fw-bold">
                        Prefered Time
                      </label>
                    </div>
                    {["Morning", "Afternoon", "Evening"].map((item) => (
                      <div key={item} className="form-check-inline">
                        <input
                          type="radio"
                          name="preferredTime"
                          value={item}
                          id={item}
                          checked={state.preferredTime === item}
                          className="form-check-input"
                          onChange={handleChange}
                        />
                        <label htmlFor={item} className="form-check-label ms-1">
                          {item}
                        </label>
                      </div>
                    ))}
                  </div>
                  <div className="form-group">
                    <label htmlFor="duration" className="form-label fw-bold">
                      Duration
                    </label>
                    <input
                      type="text"
                      id="duration"
                      name="duration"
                      value={state.duration}
                      onChange={handleChange}
                      className="form-control"
                      placeholder="Enter your duration in hours"
                    />
                    <span className="text-danger">
                      {formErrors.durationError}
                    </span>
                  </div>
                  <div className="d-flex flex-column justify-content-center align-items-center">
                    <button
                      type="submit"
                      name="join"
                      data-testid="join"
                      className="btn btn-primary mt-4 text-center"
                      disabled={!valid}
                    >
                      Join
                    </button>
                    {errorMessage && (
                      <p className="text-danger fw-bold mt-2">{errorMessage}</p>
                    )}
                    {successMessage && (
                      <p className="text-success fw-bold">{successMessage}</p>
                    )}
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};

export default FitnessForm;
