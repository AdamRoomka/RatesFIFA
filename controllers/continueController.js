exports.continues = async (req,res)=>{
    try {
        res.status(200).send(`
            <h1>Strona już jest aktywna!</h1>
            <a href="https://rates-fifa.loca.lt/"><h2>Wróć spowrotem!</h2></a>
        `);
    } catch (err) {
        res.status(404).json({
            status: 'fail',
            message: "server problem!"
        });
    }
}