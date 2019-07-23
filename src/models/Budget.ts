import { Schema, model, Document, Types } from 'mongoose';

const { ObjectId } = Schema.Types.ObjectId;

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

export default model<Budget>('Budget', budgetSchema);
