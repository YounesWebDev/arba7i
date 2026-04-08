"use server";

type ContactFormState = {
  success: boolean;
  error?: string;
  message?: string;
};

export async function submitContactForm(
  prevState: ContactFormState,
  formData: FormData
): Promise<ContactFormState> {
  void prevState;
  const name = formData.get("name");
  const email = formData.get("email");
  const subject = formData.get("subject");
  const message = formData.get("message");

  // Basic Server-Side Validation
  if (!name || !email || !message) {
    return { success: false, error: "Please fill in all required fields." };
  }

  try {
    // TODO: When we set up the database in Week 3, we will save this message to a `support_messages` table!
    // For now, we simulate a successful submission so the UI can show a success message.
    console.log("New Contact Submission Received:", { name, email, subject, message });
    
    // Simulate a 1-second network delay to make the loading state feel natural
    await new Promise((resolve) => setTimeout(resolve, 1000));

    return { success: true, message: "Your message has been sent successfully. We will reply soon!" };
  } catch {
    return { success: false, error: "Something went wrong. Please try again." };
  }
}
