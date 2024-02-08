import {
  SERIALIZED_INTERNAL_PROPERTIES_KEY,
  type SerializedEntity,
} from '@mswjs/data/lib/db/Database';
import {
  DATABASE_INSTANCE,
  ENTITY_TYPE,
  type Entity,
  type FactoryAPI,
  type ModelDictionary,
  PRIMARY_KEY,
  type PrimaryKeyType,
} from '@mswjs/data/lib/glossary';
import { inheritInternalProperties } from '@mswjs/data/lib/utils/inheritInternalProperties';
import debounce from 'lodash.debounce';

const STORAGE_KEY_PREFIX = 'mswjs-data';

// Timout to persist state with some delay
const DEBOUNCE_PERSIST_TIME_MS = 10;

type Models<Dictionary extends ModelDictionary> = Record<
  keyof Dictionary,
  Map<PrimaryKeyType, Entity<Dictionary, any>> // eslint-disable-line @typescript-eslint/no-explicit-any
>;

type SerializedModels<Dictionary extends ModelDictionary> = Record<
  keyof Dictionary,
  Map<PrimaryKeyType, SerializedEntity>
>;

export default function persist<Dictionary extends ModelDictionary>(
  factory: FactoryAPI<Dictionary>
) {
  if (typeof window === 'undefined' || typeof sessionStorage === 'undefined') {
    return;
  }

  const db = factory[DATABASE_INSTANCE];

  const key = `${STORAGE_KEY_PREFIX}/${db.id}`;

  const persistState = debounce(function persistState() {
    // eslint-disable-next-line @typescript-eslint/dot-notation, @typescript-eslint/consistent-type-assertions
    const models = db['models'] as Models<Dictionary>;
    // eslint-disable-next-line @typescript-eslint/dot-notation, @typescript-eslint/consistent-type-assertions
    const serializeEntity = db['serializeEntity'] as (
      entity: Entity<Dictionary, any> // eslint-disable-line @typescript-eslint/no-explicit-any
    ) => SerializedEntity;

    const json = Object.fromEntries(
      Object.entries(models).map(([modelName, entities]) => [
        modelName,
        Array.from(entities, ([, entity]) => serializeEntity(entity)),
      ])
    );

    sessionStorage.setItem(key, JSON.stringify(json));
  }, DEBOUNCE_PERSIST_TIME_MS);

  function hydrateState() {
    const initialState = sessionStorage.getItem(key);

    if (initialState) {
      // eslint-disable-next-line @typescript-eslint/consistent-type-assertions
      const data = JSON.parse(initialState) as SerializedModels<Dictionary>;

      for (const [modelName, entities] of Object.entries(data)) {
        for (const entity of entities.values()) {
          db.create(modelName, deserializeEntity(entity));
        }
      }
    }

    // Add event listeners only after hydration
    db.events.on('create', persistState);
    db.events.on('update', persistState);
    db.events.on('delete', persistState);
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', hydrateState);
  } else {
    hydrateState();
  }
}

function deserializeEntity(entity: SerializedEntity) {
  const {
    [SERIALIZED_INTERNAL_PROPERTIES_KEY]: internalProperties,
    ...publicProperties
  } = entity;

  inheritInternalProperties(publicProperties, {
    [ENTITY_TYPE]: internalProperties.entityType,
    [PRIMARY_KEY]: internalProperties.primaryKey,
  });

  // eslint-disable-next-line @typescript-eslint/consistent-type-assertions, @typescript-eslint/no-explicit-any
  return publicProperties as Entity<any, any>;
}
