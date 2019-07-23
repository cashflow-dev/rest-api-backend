import { Schema, model, Document, Types } from 'mongoose';

const { ObjectId } = Schema.Types.ObjectId;

interface Budget extends Document {
  budgetId: Types.ObjectId;
  name: string;
  amount: number;
  period: string;
}

const budgetSchema = new Schema({
  budgetId: ObjectId,
  name: String,
  amount: Number,
  period: String,
});

export default model<Budget>('Budget', budgetSchema);
