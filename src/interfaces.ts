export interface IEmployee {
  id: string;
  firstName: string;
  lastName: string;
  dob: string;
  activeStatus?: 'active' | 'not-active';
}

export interface IEmployeeGroup {
  title: string;
  employees: IEmployee[];
}
