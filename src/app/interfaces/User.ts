// src/app/interfaces/User.ts
export interface User {
    id: string;  // Add this line
    email: string;
    name: string;
    token: string;
    role?: string;
    region?: string;
}