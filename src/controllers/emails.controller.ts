import { Request, Response } from "express";
import mailer from "../services/send-mail.services";

const create = async (req: Request, res: Response) => {
  try {
    const payload: {
      name: string;
      email: string;
      mobile: string;
      message: string;
    } = req.body;

    //1. compile ejs template as per data
    await mailer(payload)
    return res.status(200).json({
      message: "Enquiry received, we will get back to you soon!",
    });
  } catch (error) {
    return res.status(500).json({ message: "Error while sending enquiry", error });
  }
};
export default { create };
