export interface Rules {
  id: string;
  title: string;
  content_number: number;
  content: string;
}

export type RuleResponseType = Rules[];
