import { Schema, model, Document, Types } from 'mongoose';
import { timestamps } from 'mongoose-timestamp';

const { ObjectId } = Schema.Types.ObjectId;
const { Any } = Schema.Types.Mixed;

interface RecurrentEvent extends Document {
  eventTypeId: Types.ObjectId;
  name: string;
  amount: Amount;
  lastOccurred: string;
  occursEvery: string;
  occurDate: string;
  nextOccurrance: string;
  currency: Currency;
  meta: any;
}

interface Account extends Document {
  fromAccId: Types.ObjectId;
  toAccId: Types.ObjectId;
}

interface Amount extends Document {
  origin: number;
  target: number;
}

const recurrentEventSchema = new Schema({
  eventTypeId: ObjectId,
  name: String,
  amount: {
    origin: Number,
    target: Number,
  },
  currency: {
    origin: String,
    target: String,
  },
  account: {
    fromAccId: ObjectId,
    toAccId: ObjectId,
  },
  lastOccurred: String,
  occursEvery: String,
  occurDate: String,
  nextOccurrance: String,
  meta: Any,
});

recurrentEventSchema.plugin(timestamps);

export default model<RecurrentEvent>('RecurrentEvent', recurrentEventSchema);
