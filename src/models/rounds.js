import mongoose from "mongoose";

const modelName = "bandarqiuqiu_rounds";

const handSchema = new mongoose.Schema(
    {
        dominoes: { type: [String], required: true },
        handRankingId: { type: Number, required: true },
        pipsOfSet: { type: [Number] },
    },
    { _id: false }
);

const resultSchema = new mongoose.Schema(
    {
        dealer: handSchema,
        spade: handSchema,
        heart: handSchema,
        club: handSchema,
        diamond: handSchema,
    },
    { _id: false }
);

const settlementResultSchema = new mongoose.Schema(
    {
        spade: { type: Number },
        heart: { type: Number },
        club: { type: Number },
        diamond: { type: Number },
    },
    { _id: false }
);

const Schema = new mongoose.Schema({
    id: { type: Number, required: true },
    result: resultSchema,
    settlementResult: settlementResultSchema,
    time: { type: Date, default: new Date() },
    exchangeRateId: { type: Number, required: true },
});

export default mongoose.model(modelName, Schema);
