import { Injectable, signal, WritableSignal } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class SignalStateService<T> {
  private entitiesSignal: WritableSignal<T[]> = signal<T[]>([]);

  // Expose a read-only signal for external access
  get entities() {
    return this.entitiesSignal.asReadonly();
  }

  // Set initial state for entities
  setEntities(entities: T[]) {
    this.entitiesSignal.set(entities);
  }

  // Add an entity to the signal state
  addEntity(entity: T) {
    this.entitiesSignal.update((current) => [...current, entity]);
  }

  // Update an entity in the signal state based on a unique identifier
  updateEntity(updatedEntity: T, identifier: (item: T) => boolean) {
    this.entitiesSignal.update((current) =>
      current.map((entity) => (identifier(entity) ? updatedEntity : entity))
    );
  }

  // Remove an entity from the signal state based on a unique identifier
  removeEntity(identifier: (item: T) => boolean) {
    this.entitiesSignal.update((current) =>
      current.filter((entity) => !identifier(entity))
    );
  }
}
