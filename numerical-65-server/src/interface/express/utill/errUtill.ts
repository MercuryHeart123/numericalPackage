// import { broadcast } from "./broadcast";
export function getErrorMessage(error: unknown) {
    if (error instanceof Error) {
        // broadcast(error.message);
        return error.message
    }
    // broadcast(String(error));
    return String(error);
}