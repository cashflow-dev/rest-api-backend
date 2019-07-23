import { Schema, model, Document } from 'mongoose';
import { timestamps } from 'mongoose-timestamp';

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

savingsSchema.plugin(timestamps);

export default model<Savings>('Savings', savingsSchema);
