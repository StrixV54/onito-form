type ErrorT = {
  path: string | null;
  message: string | null;
};

type UserT = {
  name: string;
  age: number;
  sex: string;
  mobile: string;
  country: string;
};

export type { ErrorT, UserT };
