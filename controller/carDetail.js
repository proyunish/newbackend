const CarDetail = require("../model/carDetail");
const User = require("../model/userModel");

exports.createCarDetail = async (req, res) => {
    try {
        const userId = req.userId;
        const {
            year,
            price,
            description,
            status,
            video_link,
            make,
            model,
            showroom,
            color,
            interior_color,
            gearbox,
            body_type,
            body_condition,
            fuel_type,
            door,
            wheel,
            seat,
            cylinder,
            images
        } = req.body;

        if (!userId || !year || !make || !model) {
            return res.status(400).json({ message: 'Required fields are missing.' });
        }
        const carDetail = new CarDetail({
            userId,
            year,
            price,
            description,
            status,
            video_link,
            make,
            model,
            showroom,
            color,
            interior_color,
            gearbox,
            body_type,
            body_condition,
            fuel_type,
            door,
            wheel,
            seat,
            cylinder,
            images
        });

        await carDetail.save();

        res.status(201).json({
            message: 'Car detail created successfully',
            carDetail
        });
    } catch (error) {
        console.error('Error creating car detail:', error);
        res.status(500).json({
            message: 'An error occurred while creating the car detail'
        });
    }
};

exports.handleOrder = async (req, res) => {
    try {
        const userId = req.userId;
        const { id } = req.params;

        const carDetail = await CarDetail.findOne({ id });
        if (!carDetail) {
            return res.status(404).json({ message: 'Car detail not found' });
        }
        res.status(200).json({
            message: 'Car saved',
            carDetail,
            userId
        })

    } catch (error) {
        console.error('Error handling order:', error);
        res.status(500).json({ message: 'Something went wrong' });
    }
};
