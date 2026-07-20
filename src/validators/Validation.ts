import { fitnessFormState } from "../model/FitnessForm";

export class Validator {
  static validateName = (value: string) => {
    const pRegex = /^[A-Z][a-z]{2,}( [A-Z][a-z]+)$/;
    return pRegex.test(value);
  };

  static validateContactNo = (value: string) => {
    const contactNumberRegex = /^[6789][0-9]{9}$/;
    return contactNumberRegex.test(value);
  };

  static validateDuration = (value: string) => {
    const durationRegex = /^[1-9][0-9]*$/;
    return durationRegex.test(value);
  };

  static validateForm(state: fitnessFormState): boolean {
    /*    
            1. Check if any of the following conditions are true:
                - name is an empty string
                - contactNo is 0
                - duration is 0
                - fitnessGoal is an empty string
                - preferredTime is an empty string
            2. If any of the conditions are true, return false
            3. If none of the conditions are true, return true
        */
    if (
      state.name === "" ||
      state.contactNo === 0 ||
      state.duration === "0" ||
      state.duration === "" ||
      state.fitnessGoal === "" ||
      state.preferredTime === ""
    ) {
      return false;
    }

    return true; //change the return statement to true or false based on the above conditions
  }
}
