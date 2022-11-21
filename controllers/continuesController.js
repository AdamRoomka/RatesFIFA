exports.contback = async (req,res)=>{
try {
    res.status(200).send(`
    <h1>Dzięki za potwierdzenia zgody do korzystania CORS!</h1>
    <a href="https://rates-fifa.loca.lt/"><h2>Wróć spowrotem!</h2></a>
    `);
} catch (err) {
    res.status(404).json({
        status: 'NOT_FOUND',
        message: err
    });
}
}