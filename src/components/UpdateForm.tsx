import React from "react";
import { FC, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { fitnessFormState } from "../model/FitnessForm";
import { Messages } from "../messages/Messages";
import axios, { AxiosError } from "axios";

const UpdateForm: FC = () => {
  let params = useParams<{ joiningId: string }>();
  const { joiningId } = params;

  const [join, setJoin] = useState({
    joiningId: "",
    name: "",
    contactNo: "",
    duration: "",
    fitnessGoal: "",
    preferredTime: "",
  });

  const fitnessGoalList: string[] = [
    "Weight Loss",
    "Muscle Gain",
    "Endurance",
    "Cardiovascular Health",
  ];

  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");

  const isDisabled = !(
    join.name &&
    join.contactNo &&
    join.duration &&
    join.fitnessGoal &&
    join.preferredTime
  );

  useEffect(() => {
    /*
            1.Make an axios call to URL specified in Messages.ts file:  
                "http://localhost:2500/fitness-form/" + < joiningId >, 
                to retrieve the join details of the join with the given id.
            2.Set the join state with data retrieved from response object.
            3.Set the name, contactNo, duration, fitnessGoal, preferredTime states 
                with corresponding values retrieved from response object.
            4.If the axios call is not successful, 
                set the error state with UPDATE_FETCH_ERROR message.
            5.Use dependency array to run the effect with every change in joiningId.

        */

    axios
      .get<fitnessFormState>(Messages.URL + joiningId)
      .then((res) => {
        setJoin({
          joiningId: res.data.id,
          name: res.data.name,
          contactNo: String(res.data.contactNo),
          duration: String(res.data.duration),
          fitnessGoal: res.data.fitnessGoal,
          preferredTime: res.data.preferredTime,
        });
      })
      .catch((error: AxiosError) => {
        setError(Messages.UPDATE_FETCH_ERROR);
      });
  }, [joiningId]);

  const handleChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ): void => {
    const { name, value } = event.target;
    setJoin((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const update = (e: React.FormEvent): void => {
    // This method will be called on submission of update form.
    // Prevent the reload of the page.
    /*
            1. Update the object newJoin with the respective state values 
                - name, contactNo, duration, fitnessGoal, preferredTime (already implemented)
            2. Write validation for all input fields as given in the QP document.
            3. Use appropriate methods from validators/Validation.ts
            4. If all the form fields are validated, then make an axios PUT request 
                to URL specified in messages/Messages.ts file: 
                "http://localhost:2500/fitness-form/", newJoin object as data to the axios call .
            5. If axios call is successful, set the success state to UPDATE_SUCCESS message.
            6. If axios call is not successful, set the error state to UPDATE_ERROR message.
            7. Use Messages object imported from messages/Messages.ts file to set the messages.

        */
    e.preventDefault();

    axios
      .put(Messages.URL + joiningId, join)
      .then((res) => {
        setError("");
        setSuccess(Messages.UPDATE_SUCCESS);
      })
      .catch((error: AxiosError) => {
        setSuccess("");
        setError(Messages.UPDATE_ERROR);
      });
  };

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
                  <b>Update Your Fitness Plan</b>
                </h3>
              </div>
              <div>
                <form className="form form-background" onSubmit={update}>
                  {/*    
                                1. Form should be controlled
                                2. On change of input fields, set respective states with form values.
                                3. Display error and success messages appropriately
                                4. Invoke 'update' methods on submit using an appropriate event handler on <form> tag,
                                */}

                  <div className="form-group">
                    <label className="form-label" htmlFor="name">
                      <b>Name</b>
                    </label>
                    <input
                      type="text"
                      placeholder="Enter your name"
                      className="form-control"
                      name="name"
                      id="name"
                      data-testid="name"
                      value={join.name}
                      //Your code here
                      onChange={handleChange}
                    />
                  </div>
                  <div className="form-group">
                    <label className="form-label" htmlFor="contactNo">
                      <b>Contact Number</b>
                    </label>
                    <input
                      type="number"
                      className="form-control"
                      id="contactNo"
                      name="contactNo"
                      value={join.contactNo}
                      //Your code here
                      onChange={handleChange}
                    />
                  </div>

                  <div className="form-group">
                    <label className="form-label" htmlFor="fitnessGoal">
                      <b>Fitness Goal</b>
                    </label>
                    <select
                      className="form-control"
                      id="fitnessGoal"
                      name="fitnessGoal"
                      value={join.fitnessGoal}
                      //Your code here
                      onChange={handleChange}
                    >
                      {fitnessGoalList.map((goal, index) => {
                        return (
                          <option key={index} value={goal}>
                            {goal}
                          </option>
                        );
                      })}
                    </select>
                  </div>

                  <div>
                    <label className="form-label" htmlFor="preferredTime">
                      <b>Preferred Time</b>
                    </label>
                  </div>
                  <div className="form-check form-check-inline">
                    <label className="form-check-label">
                      <input
                        type="radio"
                        className="form-check-input"
                        name="preferredTime"
                        id="preferredTime"
                        data-testid="preferredTime"
                        value="Morning"
                        checked={join.preferredTime === "Morning"}
                        //Your code here
                        onChange={handleChange}
                      />
                      Morning
                    </label>
                  </div>

                  <div className="form-check form-check-inline">
                    <label className="form-check-label">
                      <input
                        type="radio"
                        className="form-check-input"
                        name="preferredTime"
                        id="preferredTime"
                        data-testid="preferredTime"
                        value="Afternoon"
                        checked={join.preferredTime === "Afternoon"}
                        //Your code here
                        onChange={handleChange}
                      />
                      Afternoon
                    </label>
                  </div>

                  <div className="form-check form-check-inline">
                    <label className="form-check-label">
                      <input
                        type="radio"
                        className="form-check-input"
                        name="preferredTime"
                        id="preferredTime"
                        data-testid="preferredTime"
                        value="Evening"
                        checked={join.preferredTime === "Evening"}
                        //Your code here
                        onChange={handleChange}
                      />
                      Evening
                    </label>
                  </div>
                  <div className="form-group">
                    <label className="form-label" htmlFor="duration">
                      <b>Duration</b>
                    </label>
                    <input
                      type="number"
                      className="form-control"
                      id="duration"
                      name="duration"
                      value={join.duration}
                      //Your code here
                      onChange={handleChange}
                    />
                  </div>

                  <div className="form-group text-center">
                    <button
                      type="submit"
                      name="button"
                      className="btn btn-primary mt-2 text-center"
                      disabled={isDisabled}
                    >
                      Update
                    </button>
                  </div>

                  {success && <span className="text-success">{success}</span>}
                  {error && <span className="text-danger">{error}</span>}

                  <p
                    className="text-success text-center success"
                    data-testid="success"
                  >
                    <h5>
                      <b></b>
                    </h5>
                  </p>
                  <p className="text-danger text-center " data-testid="error">
                    <h5>
                      <b></b>
                    </h5>
                  </p>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};
export default UpdateForm;
