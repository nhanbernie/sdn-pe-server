import { Injectable, NotFoundException, ConflictException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Contact, ContactDocument } from './schemas/contact.schema';
import { CreateContactDto } from './dto/create-contact.dto';
import { UpdateContactDto } from './dto/update-contact.dto';
import { QueryContactDto } from './dto/query-contact.dto';

@Injectable()
export class ContactService {
  constructor(
    @InjectModel(Contact.name) private contactModel: Model<ContactDocument>,
  ) {}

  async create(createContactDto: CreateContactDto): Promise<Contact> {
    try {
      const createdContact = new this.contactModel(createContactDto);
      return await createdContact.save();
    } catch (error) {
      if (error.code === 11000) {
        throw new ConflictException('Email already exists');
      }
      throw error;
    }
  }

  async findAll(queryDto: QueryContactDto): Promise<Contact[]> {
    const { search, group, sort = 'asc', sortBy = 'name' } = queryDto;
    
    // Build query
    const query: any = {};
    
    if (search) {
      query.name = { $regex: search, $options: 'i' };
    }
    
    if (group) {
      query.group = group;
    }

    // Build sort object
    const sortObject: any = {};
    sortObject[sortBy] = sort === 'asc' ? 1 : -1;

    return this.contactModel
      .find(query)
      .sort(sortObject)
      .exec();
  }

  async findOne(id: string): Promise<Contact> {
    const contact = await this.contactModel.findById(id).exec();
    if (!contact) {
      throw new NotFoundException(`Contact with ID ${id} not found`);
    }
    return contact;
  }

  async update(id: string, updateContactDto: UpdateContactDto): Promise<Contact> {
    try {
      const updatedContact = await this.contactModel
        .findByIdAndUpdate(id, updateContactDto, { new: true })
        .exec();
      
      if (!updatedContact) {
        throw new NotFoundException(`Contact with ID ${id} not found`);
      }
      
      return updatedContact;
    } catch (error) {
      if (error.code === 11000) {
        throw new ConflictException('Email already exists');
      }
      throw error;
    }
  }

  async remove(id: string): Promise<void> {
    const result = await this.contactModel.findByIdAndDelete(id).exec();
    if (!result) {
      throw new NotFoundException(`Contact with ID ${id} not found`);
    }
  }

  async getGroups(): Promise<string[]> {
    const groups = await this.contactModel.distinct('group').exec();
    return groups;
  }
}
