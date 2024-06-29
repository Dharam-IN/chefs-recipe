import { renderToStaticMarkup } from 'react-dom/server'
import VerificationEmail from '../../../emails/VerifyEmail'

export function renderVerificationEmail(
  username: string,
  code: string
): string {
  return renderToStaticMarkup(VerificationEmail({ username, otp: code }))
}
