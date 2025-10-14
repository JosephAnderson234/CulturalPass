export interface TokenClaims {
    role: string;
    sub: string;
    exp: number;
    iat: number;
}