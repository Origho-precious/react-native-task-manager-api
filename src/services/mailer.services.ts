import mailchimp from "@mailchimp/mailchimp_transactional";
import emailTemplate from "../utils/emailTemplate";

class Mailer {
	private client: any;

	constructor() {
		this.client = mailchimp(process.env.MANDRILL_API_KEY as string);
	}

	async sendEmail(
		to: string,
		subject: string,
		body: string,
		from = "organizo@preciousorigho.com"
	) {
		try {
			let recipients = [];
			const emails = to;

			if (Array.isArray(emails)) {
				recipients = emails.map((recipient) => {
					return {
						email: recipient,
						type: "to",
					};
				});
			} else {
				recipients.push({
					email: to,
					type: "to",
				});
			}
			const message = {
				from_name: "Risecoin",
				from_email: from,
				subject: subject,
				html: body,
				to: recipients,
				inline_css: true,
			};
			const res = await this.client.messages.send({
				message,
			});

			console.log(res);

			if (res[0]?.status === "sent") {
				return true;
			}

			if (res[0]?.status === "rejected") {
				throw new Error("email rejected");
			}
		} catch (error) {
			throw error;
		}
	}

	async forgotPassword(email: string, token: string) {
		const href = `https://app.risecoin.xyz/redirect?token=${token}&exp=${new Date().getTime()}`;

		const subject = "Reset Password";
		const msg = `Click <a href=${href}>here</a> to reset your password. <br /> <br /> Note that the link will be invalid in 15mins time.`;

		const body = emailTemplate(msg);

		try {
			await this.sendEmail(email, subject, body);
		} catch (error) {
			console.log(error);
			throw error;
		}
	}
}

export default Mailer;
