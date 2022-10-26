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
import { CharacterClass, CharacterClassFSDBSchema } from '../models';
import { UpdateDataFSDBSchema } from './race';

interface UpdateData {
  _id: string;
  name?: string;
  animations?: string[];
  str?: number;
  int?: number;
  agi?: number;
}
export const UpdateDataSchema: ObjectSchema = {
  _id: {
    __type: 'string',
    __required: true,
  },
  name: {
    __type: 'string',
    __required: false,
  },
  animations: {
    __type: 'array',
    __required: false,
    __child: {
      __type: 'string',
    },
  },
  str: {
    __type: 'number',
    __required: false,
  },
  int: {
    __type: 'number',
    __required: false,
  },
  agi: {
    __type: 'number',
    __required: false,
  },
};

export const CharacterClassController = createController({
  name: 'Character class',
  path: '/api/character/class',
  methods() {
    return {
      getAll: createControllerMethod<
        unknown,
        {
          items: CharacterClass[];
        }
      >({
        path: '/all',
        type: 'get',
        async handler() {
          return {
            items: await Repo.charClass.findAll(),
          };
        },
      }),

      get: createControllerMethod<
        unknown,
        {
          item: CharacterClass;
        }
      >({
        path: '/:id',
        type: 'get',
        async handler({ request, errorHandler }) {
          const cclass = await Repo.charClass.findById(request.params.id);
          if (!cclass) {
            throw errorHandler.occurred(
              HTTPStatus.NOT_FOUNT,
              responseCode('cc001', { id: request.params.id }),
            );
          }
          return {
            item: cclass,
          };
        },
      }),

      create: createControllerMethod<
        RouteProtectionJWTAndBodyCheckResult<CharacterClass>,
        { item: CharacterClass }
      >({
        type: 'post',
        preRequestHandler: RouteProtection.jwtAndBodyCheck({
          roles: [JWTRoleName.ADMIN],
          bodySchema: CharacterClassFSDBSchema,
        }),
        async handler({ body }) {
          const cclass = await Repo.charClass.add(CharacterFactory.class(body));
          return {
            item: cclass,
          };
        },
      }),

      update: createControllerMethod<
        RouteProtectionJWTAndBodyCheckResult<UpdateData>,
        { item: CharacterClass }
      >({
        type: 'post',
        preRequestHandler: RouteProtection.jwtAndBodyCheck({
          roles: [JWTRoleName.ADMIN],
          bodySchema: UpdateDataFSDBSchema,
        }),
        async handler({ body, errorHandler }) {
          const cclass = await Repo.charClass.findById(body._id);
          if (!cclass) {
            throw errorHandler.occurred(
              HTTPStatus.NOT_FOUNT,
              responseCode('cc001', { id: body._id }),
            );
          }
          for (const k in body) {
            const key = k as keyof UpdateData;
            if (key !== '_id' && cclass[key] && body[key]) {
              cclass[key] = body[key] as never;
            }
          }
          return {
            item: await Repo.charClass.update(cclass),
          };
        },
      }),
    };
  },
});
