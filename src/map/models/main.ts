import type { ObjectSchema } from '@banez/object-utility/types';
import {
  FSDBEntity,
  FSDBEntitySchema,
} from '@becomes/purple-cheetah-mod-fsdb/types';
import { MongoDBEntitySchemaString } from '@becomes/purple-cheetah-mod-mongodb/types';
import { Schema } from 'mongoose';

export interface Map extends FSDBEntity {
  model: string;
  name: string;
}

export const MapFSDBSchema: ObjectSchema = {
  ...FSDBEntitySchema,
  model: {
    __type: 'string',
    __required: true,
  },
  name: {
    __type: 'string',
    __required: true,
  },
};

export const MapMongoDBSchema = new Schema({
  ...MongoDBEntitySchemaString,
  model: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
});
