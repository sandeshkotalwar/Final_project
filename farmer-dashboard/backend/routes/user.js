app.get('/api/user', async (req, res) => {
    try {
        const token = req.headers.authorization?.split(' ')[1]; // Extract the token
        if (!token) {
            return res.status(401).json({ error: 'Unauthorized' });
        }

        // Verify the token (e.g., using JWT)
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const user = await User.findById(decoded.userId); // Fetch user from database

        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }

        // Return the user's name (or other details) as JSON
        res.json({ name: user.name });
    } catch (error) {
        console.error('Error in /api/user:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});