// const jwt=require('jsonwebtoken');

// const authHeader = (req, res, next) => {
//     try {
//         const authHeader=req.headers['authorization'];
//         if (!authHeader) {
//             return res.status(401).json({ message: 'Authorization header missing. Access denied' });
//     }

//     const token = authHeader.replace('Bearer ', '');
//     const decoded = jwt.verify(token, process.env.JWT_SECRET);

//     req.user = decoded; //{userId:...}
//     next();
// }
// catch (err) {
//     console.error('JWT error:', err);
//     return res.status(401).json({message: 'Invalid or expired token'});
// }   
// };
// module.exports=authenticate;  