export interface LoginResponse {
    user:  User;
    token: string;
}

export interface User {
    email:    string;
    username: string;
    name:     string;
    role:     string;
    active:   boolean;
    uid:      string;
}
