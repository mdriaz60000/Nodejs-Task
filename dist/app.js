"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const config_1 = __importDefault(require("./app/config"));
const notFound_1 = __importDefault(require("./app/middlewares/notFound"));
const routes_1 = __importDefault(require("./app/routes"));
const globalErrorHandler_1 = __importDefault(require("./app/middlewares/globalErrorHandler"));
const requestLogger_1 = require("./app/middlewares/requestLogger");
const app = (0, express_1.default)();
// middlewares
app.use((0, cors_1.default)());
app.use(requestLogger_1.requestLogger);
// parsers
app.use(express_1.default.json());
app.use("/api/v1", routes_1.default);
app.get("/", (req, res) => {
    res.send(`Server Running on port ${config_1.default.port}`);
});
app.use(globalErrorHandler_1.default);
app.use(notFound_1.default);
exports.default = app;
