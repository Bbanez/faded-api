import { createFSDBRepository } from '@becomes/purple-cheetah-mod-fsdb';
import type { FSDBRepository } from '@becomes/purple-cheetah-mod-fsdb/types';
import type { MongoDBRepository } from '@becomes/purple-cheetah-mod-mongodb/types';
import type { Module } from '@becomes/purple-cheetah/types';
import { Config } from '@faded/config';
import { Repo } from '@faded/repo';
import { Map, MapFSDBSchema } from './models';

export interface MapRepoMethods {
  findByName(name: string): Promise<Map | null>;
}

export type MapRepo =
  | FSDBRepository<Map, MapRepoMethods>
  | MongoDBRepository<Map, MapRepoMethods>;

export function createMapRepo(): Module {
  return {
    name: 'Map repository',
    initialize({ next }) {
      if (Config.fsdb) {
        Repo.map = createFSDBRepository<Map, MapRepoMethods>({
          name: 'Map repository',
          collection: `${Config.dbPrfx}_maps`,
          schema: MapFSDBSchema,
          methods({ repo }) {
            return {
              findByName(name) {
                return repo.findBy((e) => e.name === name);
              },
            };
          },
        });
      }
      next();
    },
  };
}
