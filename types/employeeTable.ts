
export interface EmployeeJobTypeTable {
  _id: string;
  title: string;
  companyLogo?: string;
  category: string;
  salaryRange: {
    min: number,
    max:number
  };
  postedDate:  string;
  deadline:  string;
  status:string
}
