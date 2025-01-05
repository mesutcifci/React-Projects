import { createTransport } from 'nodemailer';

export const sendEmail = async (options: {
	email: any;
	subject: any;
	message: any;
}): Promise<void> => {
	const transporter = createTransport({
		host: process.env.EMAIL_HOST,
		port: Number(process.env.EMAIL_PORT),
		logger: true,
		auth: {
			user: process.env.EMAIL_USERNAME,
			pass: process.env.EMAIL_PASSWORD,
		},
	});

	const mailOptions = {
		from: process.env.EMAIL_SENDER,
		to: options.email,
		subject: options.subject,
		text: options.message,
	};

	await transporter.sendMail(mailOptions);
};
