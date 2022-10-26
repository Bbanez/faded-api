import type {
  CharacterClassRepo,
  CharacterRaceRepo,
  CharacterRepo,
} from './character';
import type { MapRepo } from './map';
import type { UserRepo } from './user';

export class Repo {
  static char: CharacterRepo;
  static charClass: CharacterClassRepo;
  static charRace: CharacterRaceRepo;
  static user: UserRepo;
  static map: MapRepo;
}
