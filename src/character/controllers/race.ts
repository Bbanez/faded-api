import type { ObjectSchema } from '@banez/object-utility/types';
import {
  createController,
  createControllerMethod,
} from '@becomes/purple-cheetah';
import { JWTRoleName } from '@becomes/purple-cheetah-mod-jwt/types';
import { HTTPStatus } from '@becomes/purple-cheetah/types';
import { Repo } from '@faded/repo';
import { responseCode } from '@faded/response-code';
import {
  RouteProtection,
  RouteProtectionJWTAndBodyCheckResult,
} from '@faded/security';
import { CharacterFactory } from '../factory';
import { CharacterRace, CharacterRaceFSDBSchema } from '../models';

interface UpdateData {
  _id: string;
  name?: string;
  baseModel?: string;
  model?: string;
}
export const UpdateDataFSDBSchema: ObjectSchema = {
  _id: {
    __type: 'string',
    __required: true,
  },
  name: {
    __type: 'string',
    __required: false,
  },
  baseModel: {
    __type: 'string',
    __required: false,
  },
  model: {
    __type: 'string',
    __required: false,
  },
};

export const CharacterRaceController = createController({
  name: 'Character race',
  path: '/api/character/race',
  methods() {
    return {
      getAll: createControllerMethod<
        unknown,
        {
          items: CharacterRace[];
        }
      >({
        path: '/all',
        type: 'get',
        async handler() {
          return {
            items: await Repo.charRace.findAll(),
          };
        },
      }),

      get: createControllerMethod<
        unknown,
        {
          item: CharacterRace;
        }
      >({
        path: '/:id',
        type: 'get',
        async handler({ request, errorHandler }) {
          const race = await Repo.charRace.findById(request.params.id);
          if (!race) {
            throw errorHandler.occurred(
              HTTPStatus.NOT_FOUNT,
              responseCode('cr001', { id: request.params.id }),
            );
          }
          return {
            item: race,
          };
        },
      }),

      create: createControllerMethod<
        RouteProtectionJWTAndBodyCheckResult<CharacterRace>,
        { item: CharacterRace }
      >({
        type: 'post',
        preRequestHandler: RouteProtection.jwtAndBodyCheck({
          roles: [JWTRoleName.ADMIN],
          bodySchema: CharacterRaceFSDBSchema,
        }),
        async handler({ body }) {
          const race = await Repo.charRace.add(CharacterFactory.race(body));
          return {
            item: race,
          };
        },
      }),

      update: createControllerMethod<
        RouteProtectionJWTAndBodyCheckResult<UpdateData>,
        { item: CharacterRace }
      >({
        type: 'post',
        preRequestHandler: RouteProtection.jwtAndBodyCheck({
          roles: [JWTRoleName.ADMIN],
          bodySchema: UpdateDataFSDBSchema,
        }),
        async handler({ body, errorHandler }) {
          const race = await Repo.charRace.findById(body._id);
          if (!race) {
            throw errorHandler.occurred(
              HTTPStatus.NOT_FOUNT,
              responseCode('cr001', { id: body._id }),
            );
          }
          for (const k in body) {
            const key = k as keyof UpdateData;
            if (key !== '_id' && race[key] && body[key]) {
              race[key] = body[key] as never;
            }
          }
          return {
            item: await Repo.charRace.update(race),
          };
        },
      }),
    };
  },
});
