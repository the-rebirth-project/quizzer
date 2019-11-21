export interface Validator {
  validateCondition: boolean;
  successMessage?: string;
  errorMessage: string;
}
