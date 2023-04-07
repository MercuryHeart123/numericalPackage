export interface loginProps {
    username?: string;
    isAdmin?: boolean;
    setUserName: (username: string) => void;
    setIsAdmin: (isAdmin: boolean) => void;
}