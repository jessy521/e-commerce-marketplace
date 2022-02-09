import {
  Ability,
  AbilityBuilder,
  AbilityClass,
  ExtractSubjectType,
  InferSubjects,
} from '@casl/ability';
import { Injectable } from '@nestjs/common';
import { User } from 'src/auth/interface/user.interface';
import { Catalog } from 'src/catalogs/interface/catalog.interface';
import { Order } from 'src/orders/interface/order.interface';
import { Product } from 'src/products/interface/product.interface';
import { Action } from './action.enum';

type Subjects =
  | InferSubjects<typeof Catalog | typeof Order | typeof Product | typeof User>
  | 'all';

export type AppAbility = Ability<[Action, Subjects]>;

@Injectable()
export class CaslAbilityFactory {
  createForUser(user: User) {
    const { can, cannot, build } = new AbilityBuilder<
      Ability<[Action, Subjects]>
    >(Ability as AbilityClass<AppAbility>);

    if (user.isSeller) {
      can(Action.Create, Product);
      can(Action.Create, Catalog);
      can(Action.Get, Order);
    } else {
      can(Action.Create, Order);
    }

    return build({
      detectSubjectType: (item) =>
        item.constructor as ExtractSubjectType<Subjects>,
    });
  }
}
