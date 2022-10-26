import type { ObjectSchema } from '@banez/object-utility/types';
import {
  FSDBEntity,
  FSDBEntitySchema,
} from '@becomes/purple-cheetah-mod-fsdb/types';
import { MongoDBEntitySchemaString } from '@becomes/purple-cheetah-mod-mongodb/types';
import { Schema } from 'mongoose';

export interface CharacterStats {
  str: number;
  int: number;
  agi: number;
  speed: number;
}

export const CharacterStatsFSDBSchema: ObjectSchema = {
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
  speed: {
    __type: 'number',
    __required: true,
  },
};

export const CharacterStatsMongoDBSchema = new Schema({
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
  speed: {
    type: Number,
    required: true,
  },
});

export interface Character extends FSDBEntity {
  name: string;
  mapId: string;
  classId: string;
  raceId: string;
  userId: string;
  location: [number, number];
  level: number;
  stats: CharacterStats;
}

export const CharacterFSDBSchema: ObjectSchema = {
  ...FSDBEntitySchema,
  name: {
    __type: 'string',
    __required: true,
  },
  mapId: {
    __type: 'string',
    __required: true,
  },
  classId: {
    __type: 'string',
    __required: true,
  },
  raceId: {
    __type: 'string',
    __required: true,
  },
  userId: {
    __type: 'string',
    __required: true,
  },
  location: {
    __type: 'array',
    __required: true,
    __child: {
      __type: 'number',
    },
  },
  level: {
    __type: 'number',
    __required: true,
  },
  stats: {
    __type: 'object',
    __required: true,
    __child: CharacterStatsFSDBSchema,
  },
};

export const CharacterMongoSchema = new Schema({
  ...MongoDBEntitySchemaString,
  name: {
    type: String,
    required: true,
  },
  mapId: {
    type: String,
    required: true,
  },
  classId: {
    type: String,
    required: true,
  },
  raceId: {
    type: String,
    required: true,
  },
  userId: {
    type: String,
    required: true,
  },
  location: {
    type: [String],
    required: true,
  },
  level: {
    type: Number,
    required: true,
  },
  stats: {
    type: CharacterStatsMongoDBSchema,
    required: true,
  },
});
