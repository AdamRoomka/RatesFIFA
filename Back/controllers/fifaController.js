const Fifa = require('../models/fifaModel');


exports.getAllFifa = async (req, res) => {
    try {
        const fifa = await Fifa.find();
        res.status(200).json({
            status: 'success',
            results: fifa.length,
            data: {
                fifa: fifa
            }
        });
    } catch (err) {
        res.status(404).json({
            status: 'fail',
            message: err
        });
    }
};