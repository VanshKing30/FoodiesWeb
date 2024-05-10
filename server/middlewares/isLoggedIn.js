const jwt = require("jsonwebtoken");

const validateToken = async (req, res, next) => {
    try {
        const token = req.header("Authorization")?.replace("Bearer ", "");

        if (!token) {
            return res.status(401).json({ msg: "No token, authorization denied" });
        }

        try {
            const decoded = jwt.verify(token, process.env.JWT_SECRET);

            req.user = decoded;

            next();
        } catch (error) {
            res.status(401).json({ msg: "Token is not valid", error: error.message });
            console.log("Error verifying token:", error);
        }
    } catch (error) {
        res.status(500).json({ msg: "Internal server error" });
        console.log("Unexpected error:", error);
    }
}

export default validateToken;