import { Schema, model, Document } from 'mongoose';
import { timestamps } from 'mongoose-timestamp';

interface Budget extends Document {
  name: string;
  amount: number;
  period: string;
}

const budgetSchema = new Schema({
  name: String,
  amount: Number,
  period: String,
});

budgetSchema.plugin(timestamps);

export default model<Budget>('Budget', budgetSchema);
