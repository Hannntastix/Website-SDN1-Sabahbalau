export default async function handler(req, res) {
    try {
        const { getKindeServerSession } = await import("@kinde-oss/kinde-auth-nextjs/server");
        const { getUser } = getKindeServerSession(req, res);
        const user = await getUser();

        if (!user) {
            return res.status(401).json({ error: 'Not authenticated' });
        }

        const isAdmin = user.email === process.env.ADMIN_EMAIL;

        return res.status(200).json({
            user,
            isAdmin 
        });
    } catch (error) {
        console.error("Server error:", error);
        return res.status(500).json({ error: 'Internal server error' });
    }
}