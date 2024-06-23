import { NextApiRequest, NextApiResponse } from 'next'
import { ApiError } from './ApiErrors'
import { createErrorResponse } from './ApiResponse'

type HandlerFunction = (
  req: NextApiRequest,
  res: NextApiResponse
) => Promise<void>

export const asyncHandler = (fn: HandlerFunction) => {
  return (req: NextApiRequest, res: NextApiResponse) => {
    fn(req, res).catch((error) => {
      if (error instanceof ApiError) {
        res.status(error.statusCode).json(createErrorResponse(error.message, error.statusCode))
      } else {
        res.status(500).json(createErrorResponse('Internal Server Error', 500))

      }
    })
  }
}