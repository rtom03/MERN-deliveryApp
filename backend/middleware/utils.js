import jwt from "jsonwebtoken";

const authMiddleware = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;
    // console.log(authHeader);
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res
        .status(401)
        .json({ message: "Unauthorized: No token provided" });
    }

    const token = authHeader.split(" ")[1]; // Extract the actual token
    // console.log("Extracted Token:", token);

    // Verify JWT
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.body.userId = decoded.userId || decoded.id;
    // console.log(req.body.userId);

    next(); // Proceed to the next middleware
  } catch (err) {
    console.log("JWT Verification Error:", err);
    return res.status(403).json({ message: "Invalid token" });
  }
};

export default authMiddleware;
