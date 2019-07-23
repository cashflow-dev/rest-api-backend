import { Schema, model, Document, Types } from 'mongoose';

const { ObjectId } = Schema.Types.ObjectId;

interface Savings extends Document {
  name: string;
  goal: number;
  category: string;
}

const savingsSchema = new Schema({
  name: String,
  goal: Number,
  category: String,
});

export default model<Savings>('Savings', savingsSchema);
