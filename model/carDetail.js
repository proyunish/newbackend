const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const carDetailSchema = new Schema({
    userId: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    year: {
        type: Number,
        required: true, 
    },
    price: {
        type: Number,
        min: 0, 
    },
    description: {
        type: String, 
        trim: true,
    },
    status: {
        type: String,
        enum: ['available', 'sold', 'reserved'], 
        default: 'available',
    },
    video_link: {
        type: String,
    },
    make: {
        id: { type: Number },
        name: { type: String }
    },
    model: {
        id: { type: Number },
        name: { type: String },
        name_ar: { type: String },
        make_id: { type: Number }
    },
    showroom: {
        id: { type: Number },
        name: { type: String },
        address: { type: String },
        primary_phone: { type: String },
        secondary_phone: { type: String }, 
        email: { 
            type: String, 
            validate: {
                validator: function (v) {
                    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v);
                },
                message: props => `${props.value} is not a valid email!`
            },
        },
        whatsapp_number: { type: String },
        location: { type: String },
        company_id: { type: String },
        deleted_at: { type: Date }, 
        open: { type: Boolean, default: true },
        gforce_showrooms: { type: String },
        display_order: { type: Number },
        showroom_name_arabic: { type: String },
        email_leads_cc: { type: String },
        fax: { type: String },
        sms_receipt_number: { type: String },
        timings: { type: String },
        place_id: { type: String },
        address_arabic: { type: String },
        timestamp: { type: Date, default: Date.now }
    },
    color: {
        id: { type: String },
        name: { type: String }
    },
    interior_color: {
        id: { type: String },
        name: { type: String }
    },
    gearbox: {
        id: { type: String },
        name: { type: String }
    },
    body_type: {
        id: { type: String },
        name: { type: String }
    },
    body_condition: {
        id: { type: String },
        name: { type: String }
    },
    fuel_type: {
        id: { type: String },
        name: { type: String }
    },
    door: {
        id: { type: String },
        name: { type: String }
    },
    wheel: {
        id: { type: String },
        name: { type: String }
    },
    seat: {
        id: { type: String },
        name: { type: String }
    },
    cylinder: {
        id: { type: String },
        name: { type: String }
    },
    images: [{
        id: { type: String },
        url: { type: String, },
    }],
    title: { type: String },
    timestamp: {
        type: Date,
        default: Date.now
    }
});


const CarDetail = mongoose.model('CarDetail', carDetailSchema);
module.exports = CarDetail;
