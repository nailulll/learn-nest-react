export type Token = {
  access_token: string;
  refresh_token: string;
};

export type HttpException = {
  message: string;
  statusCode: number;
};

export type User = {
  id: number;
  username: string;
};
