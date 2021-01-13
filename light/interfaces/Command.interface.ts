export interface Command {
  id: number;
  method: string;
  params: Array<string | number>;
}
