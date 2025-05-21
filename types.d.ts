type User = {
  _id: string;
  email: string;
  last_name: string;
  first_name: string;
  phone_number?: string;
  date: Date;
  time: string;
  service_type: string;
  createdAt: Date;
  updatedAt: Date;
  __v: number;
};

type Users = User[];
