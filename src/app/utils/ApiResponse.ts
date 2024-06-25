interface ApiResponse<T> {
    success: boolean;
    message?: string;
    statusCode: number;
    data?: T;
    error?: string;
  }
  
  export const createSuccessResponse = <T>(data: T, message: string, statusCode: number): ApiResponse<T> => {
    return {
      success: true,
      message: message,
      statusCode: statusCode,
      data
    }
  }
  
  export const createErrorResponse = (error: string, statusCode: number): ApiResponse<null> => {
    return {
      success: false,
      statusCode: statusCode,
      message: error
    }
  }
  