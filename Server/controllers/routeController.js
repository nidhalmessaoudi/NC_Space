import Test from "../models/Test.js";

const test = new Test("", "");
test._connectToDb();

export const getApiTest = async (req, res) => {
    res.send(`
        <form action="/api/v1/test" method="POST">
            <input type="text" name="username">
            <input type="email" name="email">
            <button type="submit">Submit</button>
        </form>
   `);
};

export const postApiTest = async (req, res) => {
    const username = req.body.username;
    const email = req.body.email;
    test.username = username;
    test.email = email;
    await test._saveNewTest();
    await test._getTests();
    res.send(test.testData);
};

export const putApiTest = async (req, res) => {
    res.send("Successfully puted!");
};

export const patchApiTest = async (req, res) => {
    res.send("Successfully patched!");
};

export const deleteApiTest = async (req, res) => {
    res.send("Successfully deleted!");
};