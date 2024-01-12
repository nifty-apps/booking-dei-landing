import { loginUser } from "../../../prisma/users";

export default async function handler(req, res) {
  const { email, password } = req.body;
  try {
    switch (req.method) {
      case "POST":
        const user = await loginUser(email, password);
        return res.status(200).json(user, { message: "Login successfull" });

      default:
        return;
    }
  } catch (err) {
    res.status(500).json({ statusCode: 500, message: err.message });
  }
}
