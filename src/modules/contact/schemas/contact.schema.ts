import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type ContactDocument = Contact & Document;

@Schema({
  timestamps: true, // Automatically add createdAt and updatedAt
})
export class Contact {
  @Prop({ required: true, trim: true })
  name: string;

  @Prop({ 
    required: true, 
    trim: true,
    lowercase: true,
    match: [/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/, 'Please enter a valid email']
  })
  email: string;

  @Prop({ trim: true })
  phone?: string;

  @Prop({ 
    trim: true,
    enum: ['Friends', 'Work', 'Family', 'Other'],
    default: 'Other'
  })
  group: string;
}

export const ContactSchema = SchemaFactory.createForClass(Contact);

// Add index for better search performance
ContactSchema.index({ name: 1 });
ContactSchema.index({ email: 1 }, { unique: true });
ContactSchema.index({ group: 1 });
