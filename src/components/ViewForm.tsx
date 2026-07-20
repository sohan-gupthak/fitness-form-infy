import { FC, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ViewFormState } from "../model/ViewForm";
import axios, { AxiosError } from "axios";
import { Messages } from "../messages/Messages";
import { fitnessFormState } from "../model/FitnessForm";

const ViewForm: FC = () => {
  const [state, setState] = useState<ViewFormState>({
    joiningId: "",
    infoMessage: "",
    isTableEnabled: false,
    selectedFitnessGoal: "",
    allJoinedData: [],
    filteredJoinedData: [],
    selectedIds: [],
  });

  const fitnessGoalList: string[] = [
    "Weight Loss",
    "Muscle Gain",
    "Endurance",
    "Cardiovascular Health",
  ];

  const navigate = useNavigate();

  const isUpdate = (joiningId: string) => {
    //When Update button is clicked, navigate to '/update-form'+state.joiningId
    navigate("/update-form/" + joiningId);
  };

  const onDelete = async (joiningId: string) => {
    /* when Delete button is clicked,  make axios call to URL in messages/Messages.ts file 
          "http://localhost:2500/fitness-form/"+<joining Id>   
          and handle the response accordingly.
    */

    try {
      const res = await axios.delete(Messages.URL + joiningId);
      const data = res.data;

      console.log("deleted data:::", data);

      setState((prev) => ({
        ...prev,
        allJoinedData: prev.allJoinedData.filter(
          (entry) => entry.id !== joiningId,
        ),
        filteredJoinedData: prev.filteredJoinedData.filter(
          (entry) => entry.id !== joiningId,
        ),
      }));
    } catch (error) {
      console.log(error);
    }
  };

  const handleDeleteSelected = async () => {
    try {
      await Promise.all(
        state.selectedIds.map((id) => {
          axios.delete(Messages.URL + id);
        }),
      );

      setState((prev) => ({
        ...prev,
        allJoinedData: prev.allJoinedData.filter(
          (item) => !prev.selectedIds.includes(item.id),
        ),
        filteredJoinedData: prev.filteredJoinedData.filter(
          (item) => !prev.selectedIds.includes(item.id),
        ),
        selectedIds: [],
      }));
    } catch (error) {
      console.log(error);
    }
  };

  const handleFilter = (): void => {
    const filteredData = state.selectedFitnessGoal
      ? state.allJoinedData.filter(
          (entry) => entry.fitnessGoal === state.selectedFitnessGoal,
        )
      : state.allJoinedData;

    setState((prev) => ({
      ...prev,
      filteredJoinedData: filteredData,
      infoMessage:
        filteredData.length > 0
          ? ""
          : "No entries found for the selected fitness goal!",
      isTableEnabled: true,
    }));
  };

  const fetchAll = (event: React.FormEvent): void => {
    /*
          1.You should prevent page reload on submit
          2. Make an axios call to fetch all the data from URL specified in Messages.ts file:  "http://localhost:2500/ fitness-form/"
          3. In case of successful response:
              -Set the allJoinedData state with the success response data received from the axios call and clear the infoMessage state
              Set isTableEnabled state to true
          4. If the axios call is not successful, assign the infoMessage state to "Failed to fetch all joined entries!" 
              and clear allJoinedData state. Also set isTableEnabled state to false.
          5. Use Messages object imported from messages/Messages.ts file to set the infoMessage

    */

    event.preventDefault();
    setState((prev) => ({ ...prev, selectedFitnessGoal: "" }));

    axios
      .get<fitnessFormState[]>(Messages.URL)
      .then((res) => {
        setState((prev) => ({
          ...prev,
          allJoinedData: res.data,
          filteredJoinedData: res.data,
          infoMessage: "",
          isTableEnabled: true,
        }));
      })
      .catch((error: AxiosError) => {
        setState((prev) => ({
          ...prev,
          allJoinedData: [],
          filteredJoinedData: [],
          infoMessage: Messages.VIEW_INFO_MESSAGE,
          isTableEnabled: false,
        }));
      });
  };

  return (
    <div>
      <div className="container">
        <div className="row">
          <br />
          <div className="offset-md-4 col-md-5">
            <br />
            <div>
              <div className="head">
                <h3>
                  <b>Fitness Insights</b>
                </h3>
              </div>

              <div className="text-center mt-4 ">
                <button className="btn btn-primary" onClick={fetchAll}>
                  Get All Joined Entries
                </button>
              </div>

              {state.isTableEnabled && state.allJoinedData.length > 0 && (
                <div>
                  <div className="mt-3" style={{ maxWidth: 200 }}>
                    <select
                      name="fitnessGoal"
                      id="fitnessGoal"
                      className="form-select"
                      value={state.selectedFitnessGoal}
                      onChange={(event) =>
                        setState((prev) => ({
                          ...prev,
                          selectedFitnessGoal: event.target.value,
                        }))
                      }
                    >
                      <option value="" disabled>
                        --Select your Fitness Goal--
                      </option>
                      {fitnessGoalList.map((item) => (
                        <option value={item}>{item}</option>
                      ))}
                    </select>
                  </div>
                  <div className="d-flex justify-content-between align-items-center mt-2 w-100">
                    <button
                      className="btn btn-primary"
                      onClick={handleFilter}
                      type="button"
                    >
                      Filter
                    </button>

                    <button
                      className="btn btn-danger"
                      type="button"
                      onClick={handleDeleteSelected}
                    >
                      Delete Selected Items
                    </button>
                  </div>
                  <div className="mt-3 ">
                    <table className="table table-striped custom-table">
                      <thead>
                        <tr>
                          <th>select</th>
                          <th>JoiningId</th>
                          <th>Name</th>
                          <th>Contact Number</th>
                          <th>Fitness Goal</th>
                          <th>Preferred Time</th>
                          <th>Duration</th>
                          <th>Action</th>
                        </tr>
                      </thead>
                      <tbody>
                        {state.filteredJoinedData.map((entry, index) => (
                          <tr key={index}>
                            <td>
                              <input
                                type="checkbox"
                                id="checkboxId"
                                checked={state.selectedIds.includes(entry.id)}
                                onChange={(e) => {
                                  const check = e.target.checked;

                                  setState((prev) => ({
                                    ...prev,
                                    selectedIds: check
                                      ? [...prev.selectedIds, entry.id]
                                      : prev.selectedIds.filter(
                                          (id) => id != entry.id,
                                        ),
                                  }));
                                }}
                                className="form-check-input"
                              />
                            </td>
                            <td>{entry.id}</td>
                            <td>{entry.name}</td>
                            <td>{entry.contactNo}</td>
                            <td>{entry.fitnessGoal}</td>
                            <td>{entry.preferredTime}</td>
                            <td>{entry.duration}</td>
                            <td>
                              <button
                                className="btn btn-success btn-sm"
                                //Your code here
                                onClick={() => isUpdate(entry.id)}
                              >
                                Update
                              </button>
                              &nbsp;
                              <button
                                className="btn btn-danger btn-sm"
                                //Your code here
                                onClick={() => onDelete(entry.id)}
                              >
                                Delete
                              </button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              )}
              <div
                data-testid="message"
                className="text-danger  text-center mt-3"
              >
                {state.infoMessage}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ViewForm;
