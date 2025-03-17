interface ApiResponse<T> {
    message: string;
    status: number;
    result: T;
}

export const formatResponse = <T>(message: string, status: number, result: T): ApiResponse<T> => {
    return {
        message,
        status,
        result
    };
};
