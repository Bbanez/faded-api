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

export interface CharacterRace extends FSDBEntity {
  name: string;
  baseModel: string;
  model: string;
}

export interface CharacterRaceRepoMethods {
  findByName(name: string): Promise<CharacterRace | null>;
}

export type CharacterRaceRepo =
  | FSDBRepository<CharacterRace, CharacterRaceRepoMethods>
  | MongoDBRepository<CharacterRace, CharacterRaceRepoMethods>;

export const CharacterRaceFSDBSchema: ObjectSchema = {
  ...FSDBEntitySchema,
  name: {
    __type: 'string',
    __required: true,
  },
  baseModel: {
    __type: 'string',
    __required: true,
  },
  model: {
    __type: 'string',
    __required: true,
  },
};

export const CharacterRaceMongoSchema = new Schema({
  ...MongoDBEntitySchemaString,
  name: {
    type: String,
    required: true,
  },
  baseModel: {
    type: String,
    required: true,
  },
  model: {
    type: String,
    required: true,
  },
});
