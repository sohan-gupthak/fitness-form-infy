import { fitnessFormState } from "./FitnessForm";

export interface ViewFormState {
  joiningId: string;
  infoMessage: string;
  isTableEnabled: boolean;
  selectedFitnessGoal: string;
  allJoinedData: fitnessFormState[];
  filteredJoinedData: fitnessFormState[];
}
