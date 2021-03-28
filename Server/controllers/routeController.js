import test from "../models/Test.js";

export const getApiTest = async (req, res) => {
    try {
        res.send(`
        <form action="/api/v1/test" method="POST">
            <input type="text" name="username">
            <input type="email" name="email">
            <button type="submit">Submit</button>
        </form>
   `);
    } catch (err) {
        console.error(err);
    }
};

export const postApiTest = async (req, res) => {
    try {
        const username = req.body.username;
        const email = req.body.email;
        test.username = username;
        test.email = email;
        await test._saveNewTest();
        await test._getTests();
        res.send(test.testData);
    } catch (err) {
        console.error(err);
    }
};

export const putApiTest = async (req, res) => {
    try {
        res.send("Successfully puted!");
    } catch {
        console.error(err);
    }
};

export const patchApiTest = async (req, res) => {
    try {
        res.send("Successfully patched!");
    } catch (err) {
        console.error(err);
    }
};

export const deleteApiTest = async (req, res) => {
    try {
        res.send("Successfully deleted!");
    } catch (err) {
        console.error(err);
    }
};