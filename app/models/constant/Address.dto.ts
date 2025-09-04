export interface Address {
  province?: string;
  ward?: string;
  street?: string;
}

export interface Province {
  code: number;
  codename: string;
  division_type: string;
  name: string;
  phone_code: number;
}

export interface Ward {
  code: number;
  codename: string;
  division_type: string;
  name: string;
  province_code: number;
}
