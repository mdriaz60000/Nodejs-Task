"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const config_1 = __importDefault(require("./app/config"));
const app = (0, express_1.default)();
// parsers
app.use(express_1.default.json());
app.use((0, cors_1.default)({
    origin: ["http://localhost:5173"],
    credentials: true,
}));
// router setup
app.use("/api/v1");
app.get("/", (req, res) => {
    res.send(`Server Running on port ${config_1.default.port}`);
});
// // global error handler middleware
// app.use(globalErrorHandler);
// // not found middleware
// app.use(notFound);
exports.default = app;
