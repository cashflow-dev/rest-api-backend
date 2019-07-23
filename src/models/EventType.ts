import { Schema, model, Document, Types } from 'mongoose';

const { ObjectId } = Schema.Types.ObjectId;

interface EventType extends Document {
  eventId: Types.ObjectId;
  type: string;
}

const eventTypeSchema = new Schema({
  eventId: ObjectId,
  type: { type: String, unique: true },
});

export default model<EventType>('EventType', eventTypeSchema);
