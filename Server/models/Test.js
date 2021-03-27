import dotenv from "dotenv";
import mongoose from "mongoose";

dotenv.config();

export default class Test {

    // Class fields
    #testModel;
    testData;

    constructor (username, email) {

        this.username = username;
        this.email = email;

    }

    async _connectToDb () {

        await mongoose.connect(`${process.env.DB_HOST}`, {
            user: process.env.MONGO_USER,
            pass: process.env.MONGO_PASSWORD,
            useNewUrlParser: true,
            useUnifiedTopology: true
        });

        mongoose.set("useCreateIndex", true);

        const testSchema = new mongoose.Schema({
            username: {
                type: String,
                required: true
            },
            email: {
                type: String,
                required: true
            }
        });
        this.#testModel = mongoose.model("Test", testSchema);

    };

    async _saveNewTest () {
        try {
            const newTest = new this.#testModel({
                username: this.username,
                email: this.email
            });
            await newTest.save((err) => {
                if (err) throw new Error(`Cannot save data to database: ${err.message}`);
            });
        } catch (err) {
            console.error(err);
        }

    }

    async _getTests () {
        try {
            this.testData = await this.#testModel.find({}, (err) => {
                if (err) throw new Error(`Cannot get data from database: ${err.message} (${err.status})`);
            });
        } catch (err) {
            console.error(err);
        }

    }

}