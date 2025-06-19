import crypto from "crypto";
const { PERSISTENCE } = process.env;

class CartsDTO {
  constructor(data) {
    if (PERSISTENCE !== "mongo") {
      this._id = crypto.randomBytes(12).toString("hex");
    }

  }
}

export default CartsDTO