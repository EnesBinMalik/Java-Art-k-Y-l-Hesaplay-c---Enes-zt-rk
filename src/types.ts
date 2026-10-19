export interface LeapYearAnalysis {
  year: number;
  isLeap: boolean;
  resultMessage: string;
  remainder4: number;
  remainder100: number;
  remainder400: number;
  isDivisibleBy4: boolean;
  isDivisibleBy100: boolean;
  isDivisibleBy400: boolean;
  reason: string;
  totalDaysInYear: number;
  februaryDays: number;
}

export interface TerminalEntry {
  id: string;
  timestamp: string;
  inputYear: number;
  output: string;
  isLeap: boolean;
}
