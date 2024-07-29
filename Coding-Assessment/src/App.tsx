/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState } from "react";
import axios from "axios";

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const FormSubmitter: React.FC = (props) => {
	const [email, setEmail] = useState<any>("");
	const [formData, setFormData] = useState<any>({});
	const [IsSending, setIsSending] = useState<any>(false);

	return (
		<div className="bg-gradient-to-r from-blue-100 to-blue-200 min-h-screen flex items-center justify-center p-4">
			<div className="bg-white rounded-lg shadow-xl p-8 w-full max-w-md">
				<h1 className="text-3xl font-bold mb-8 text-center text-gray-800">
					Form Submission
				</h1>
				<form
					className="space-y-6"
					onSubmit={(e) => {
						e.preventDefault();
						setIsSending(true);
						try {
							const response = axios.post(
								"https://api.example.com/send-email",
								{
									to: email,
									formData: formData,
								}
							);
							console.log("Email sent successfully:", response.data);
							alert("Form submitted successfully!");
						} catch (error) {
							console.log("Error sending email:", error);
							alert("An error occurred while submitting the form.");
						}
					}}
				>
					<div className="space-y-2">
						<label
							htmlFor="email"
							className="block text-sm font-medium text-gray-700"
						>
							Recipient Email:
						</label>
						<input
							type="email"
							id="email"
							value={email}
							onChange={(e) => setEmail(e.target.value)}
							required
							placeholder="Enter email address"
							className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
						/>
					</div>
					<div className="space-y-2">
						<label
							htmlFor="name"
							className="block text-sm font-medium text-gray-700"
						>
							Name:
						</label>
						<input
							type="text"
							id="name"
							name="name"
							onChange={(e) => {
								const { name, value } = e.target;
								setFormData({ ...formData, [name]: value });
							}}
							placeholder="Enter your name"
							className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
						/>
					</div>
					<div className="space-y-2">
						<label
							htmlFor="message"
							className="block text-sm font-medium text-gray-700"
						>
							Message:
						</label>
						<textarea
							id="message"
							name="message"
							onChange={(e) => {
								const { name, value } = e.target;
								setFormData({ ...formData, [name]: value });
							}}
							placeholder="Enter your message"
							className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 h-32 resize-none"
						></textarea>
					</div>
					{!IsSending && (
						<button
							type="submit"
							className="w-full bg-blue-600 text-white py-3 px-4 rounded-md hover:bg-blue-700 transition duration-300 ease-in-out text-lg font-semibold"
						>
							{IsSending ? "Sending..." : "Submit Form"}
						</button>
					)}
				</form>
			</div>
		</div>
	);
};

export default FormSubmitter;
