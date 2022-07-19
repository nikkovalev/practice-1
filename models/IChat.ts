export interface IMessage {
  id: number;
  from: number | { username: string; moderation: boolean };
  text: string;
  type: 0 | 1 | 2;
  sentDate: string;
}

export interface IChat {
  id: number;
  firstId: number;
  secondId: number;
}
