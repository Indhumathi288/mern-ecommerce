const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    items: [
      {
        id: Number,
        name: String,
        price: Number,
        qty: Number,
        image: String,
      },
    ],
    customer: {
  name: {
    type: String,
    required: true,
  },
  phone: {
    type: String,
    required: true,
  },
  address: {
    type: String,
    required: true,
  },
},

    total: {
      type: Number,
      required: true,
    },

    payment: {
      type: String,
      required: true,
    },
    upiId: {
  type: String,
  default: null,
},

    date: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Order", orderSchema);