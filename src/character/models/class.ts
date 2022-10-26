import type { ObjectSchema } from '@banez/object-utility/types';
import {
  FSDBEntity,
  FSDBEntitySchema,
  FSDBRepository,
} from '@becomes/purple-cheetah-mod-fsdb/types';
import {
  MongoDBEntitySchemaString,
  MongoDBRepository,
} from '@becomes/purple-cheetah-mod-mongodb/types';
import { Schema } from 'mongoose';

export interface CharacterClass extends FSDBEntity {
  name: string;
  animations: string[];
  str: number;
  int: number;
  agi: number;
}

export interface CharacterClassRepoMethods {
  findByName(name: string): Promise<CharacterClass | null>;
}

export type CharacterClassRepo =
  | FSDBRepository<CharacterClass, CharacterClassRepoMethods>
  | MongoDBRepository<CharacterClass, CharacterClassRepoMethods>;

export const CharacterClassFSDBSchema: ObjectSchema = {
  ...FSDBEntitySchema,
  name: {
    __type: 'string',
    __required: true,
  },
  animations: {
    __type: 'array',
    __required: true,
    __child: {
      __type: 'string',
    },
  },
  str: {
    __type: 'number',
    __required: true,
  },
  int: {
    __type: 'number',
    __required: true,
  },
  agi: {
    __type: 'number',
    __required: true,
  },
};

export const CharacterClassMongoSchema = new Schema({
  ...MongoDBEntitySchemaString,
  name: {
    type: String,
    required: true,
  },
  animations: {
    type: [String],
    required: true,
  },
  str: {
    type: Number,
    required: true,
  },
  int: {
    type: Number,
    required: true,
  },
  agi: {
    type: Number,
    required: true,
  },
});
