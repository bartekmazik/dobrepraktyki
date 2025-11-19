enum UserRole {
  USER,
  ADMIN,
}

export interface User {
  email: string;
  password: string;
  role: UserRole;
}
