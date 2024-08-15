export interface LoginCredentials {
    phone: string;
    password: string; 
  }
  
  // Define the shape of the response you expect from the login API
  export interface LoginResponse {
    user: {
      id: string;
      email: string;
      name: string;
      phone: string;
    };
    token: string;
  }
  