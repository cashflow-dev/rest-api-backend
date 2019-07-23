import { Schema, model, Document, Types } from 'mongoose';

const { ObjectId } = Schema.Types.ObjectId;

interface Savings extends Document {
  savingsId: Types.ObjectId;
  name: string;
  goal: number;
  category: string;
}

const savingsSchema = new Schema({
  savingsId: ObjectId,
  name: String,
  goal: Number,
  category: String,
});

export default model<Savings>('Savings', savingsSchema);
