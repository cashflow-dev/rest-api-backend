import { Schema, model, Document, Types } from 'mongoose';

const { ObjectId } = Schema.Types.ObjectId;

interface EventType extends Document {
  type: string;
}

const eventTypeSchema = new Schema({
  type: { type: String, unique: true },
});

export default model<EventType>('EventType', eventTypeSchema);
