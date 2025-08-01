export interface IUserBarberDTO {
  name: string;
  age: number;
}

export interface IFindUserBarberRepositories {
  find(id: string): Promise<IUserBarberDTO | null>;
}
