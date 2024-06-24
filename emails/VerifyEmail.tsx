import {
  Html,
  Head,
  Font,
  Preview,
  Heading,
  Row,
  Section,
  Text,
} from '@react-email/components';

interface VerificationEmailProps {
  username: string;
  otp: string;
}

export default function VerificationEmail({ username, otp }: VerificationEmailProps) {
  const capitalizeUsername = (username: string) => {
    return username.charAt(0).toUpperCase() + username.slice(1);
  };

  return (
    <Html lang="en" dir="ltr">
      <Head>
        <title>Verification Code</title>
        <Font
          fontFamily="Roboto"
          fallbackFontFamily="Verdana"
          webFont={{
            url: 'https://fonts.gstatic.com/s/roboto/v27/KFOmCnqEu92Fr1Mu4mxKKTU1Kg.woff2',
            format: 'woff2',
          }}
          fontWeight={400}
          fontStyle="normal"
        />
      </Head>
      <Preview>Here's your verification code: {otp}</Preview>
      <Section style={{ fontFamily: 'Roboto, Verdana, sans-serif', lineHeight: '1.6', padding: '20px', border: '1px solid #eaeaea', borderRadius: '5px', maxWidth: '600px', margin: 'auto' }}>
        <Row>
          <Heading as="h2" style={{ color: '#333', textAlign: 'center' }}>Hello {capitalizeUsername(username)},</Heading>
        </Row>
        <Row>
          <Text>
            Thank you for signing up for <strong>Chef's Recipe</strong>! We're thrilled to welcome you aboard.
          </Text>
        </Row>
        <Row>
          <Text>
            Chef's Recipe is your go-to platform for exploring a world of culinary delights, sharing recipes, and connecting with fellow food enthusiasts.
          </Text>
        </Row>
        <Row>
          <Text>To complete your registration, please use the OTP below:</Text>
        </Row>
        <Row style={{ textAlign: 'center', margin: '20px 0' }}>
          <div
            style={{
              backgroundColor: '#007bff',
              color: '#fff',
              padding: '10px 20px',
              borderRadius: '5px',
              display: 'inline-block',
              fontSize: '20px',
              fontWeight: 'bold',
            }}
          >
            {otp}
          </div>
        </Row>
        <Row>
          <Text>If you didn't sign up for Chef's Recipe, please disregard this email.</Text>
        </Row>
        <Row>
          <Text>
            Happy cooking!<br />
            The Chef's Recipe Team<br />
            GitHub: <a href="https://github.com/Dharam-IN" target='_blank'>Dharam-IN</a>
          </Text>
        </Row>
      </Section>
    </Html>
  );
}
