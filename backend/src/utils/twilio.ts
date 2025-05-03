import twilio from 'twilio';
import dotenv from 'dotenv';
dotenv.config();
const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const client = twilio(accountSid, authToken);
export const createMessage = async (body: string, to: string) => {
  try {
    const message = await client.messages.create({
      from: process.env.TWILIO_PHONE_NUMBER,
      to: to,
      body: body,
    })
  }
  catch (error) {
    console.error(`Failed to send message to ${to}: ${error}`);
  }
}
