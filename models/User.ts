export enum Sex {
  M = "male",
  F = "female",
}

export interface User {
  id: number;
  fullName: string;
  age?: number;
  email: string;
  sex: Sex;
  username: string;
}

export class UserBuilder {
  user: User;

  constructor(
    id: number,
    fullName: string,
    email: string,
    sex: Sex,
    username: string
  ) {
    this.user = {
      fullName,
      email,
      sex,
      id,
      username,
    };
  }

  setAge(age: number) {
    this.user.age = age;
    return this;
  }

  build() {
    return this.user;
  }
}