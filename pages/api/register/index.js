import { registerUser } from "../../../prisma/users";

export default async function handler(req, res) {
  const { name, email, password, isAdmin } = req.body;
  try {
    switch (req.method) {
      case "POST":
        const user = await registerUser(name, email, password, isAdmin);
        return res.status(200).json(user);
      case "GET":
        // const user = await registerUser(name, email, password);
        return res.status(200).json("Hello from register");

      default:
        return;
    }
  } catch (err) {
    res.status(500).json({ statusCode: 500, message: err.message });
  }
}
