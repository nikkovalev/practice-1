export interface IMessage {
  id: number;
  from: number;
  text: string;
  type: 0 | 1 | 2;
  sentDate: string;
}
