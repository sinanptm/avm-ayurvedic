
export interface SignInCredentials {
   email: string;
   password: string;
}

export interface SignInResponse {
   user: {
      _id: string;
      email: string;
      name: string;
      phone: string;
   };
   token: string;
}

export interface AuthState {
   token: string | null;
}

export interface SignUpResponse{
   message:string;
}