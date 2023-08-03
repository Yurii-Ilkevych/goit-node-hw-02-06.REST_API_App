const supertest = require("supertest");
const express = require("express");
const app = express();
const { User } = require("../service/schemas");
const login = require("./login");
const logger = require("morgan");
const cors = require("cors");

const formatsLogger = app.get("env") === "development" ? "dev" : "short";
app.use(logger(formatsLogger));
app.use(cors());
app.use(express.json());

const mongoose = require("mongoose");
mongoose.Promise = global.Promise;
require("dotenv").config();

const PORT = 4000;
const uriDb = process.env.DB_HOST;

const connectionOptions = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};

app.post("/api/users/login", login);

describe("Login Controller", () => {
  let testServer;

  beforeAll((done) => {
    mongoose
      .connect(uriDb, connectionOptions)
      .then(() => {
        testServer = app.listen(PORT, done);
      })
      .catch((err) => {
        console.log(`Server not running. Error message: ${err.message}`);
        process.exit(1);
      });
  });

  afterAll(async () => {
    await mongoose.disconnect();
    testServer.close();
  });

  test("should return a valid token and user data on successful login", async () => {
    const response = await supertest(app)
      .post("/api/users/login")
      .send({ email: "test@example.com", password: "testpassword123" });

    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty("token");
    expect(response.body).toHaveProperty("user.email", "test@example.com");
    expect(response.body).toHaveProperty("user.subscription", "starter");
    expect(typeof response.body.user.email).toBe("string");
    expect(typeof response.body.user.subscription).toBe("string");
    const loggedInUser = await User.findOne({ email: "test@example.com" });
    expect(loggedInUser.token).toBe(response.body.token);
  }, 15000);
});
