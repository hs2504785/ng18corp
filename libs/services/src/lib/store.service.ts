import { Injectable, signal, computed } from '@angular/core';

export interface StoreState {
  [key: string]: any;
}

@Injectable({
  providedIn: 'root',
})
export class StoreService {
  private state = signal<StoreState>({});

  // Select a slice of state
  select(key: string) {
    return computed(() => this.state()[key]);
  }

  // Get current state value
  getState() {
    return this.state();
  }

  // Set state for a specific key
  setState(key: string, value: any) {
    this.state.update((state) => ({
      ...state,
      [key]: value,
    }));
  }

  // Update state partially for a specific key
  patchState(key: string, value: Partial<any>) {
    this.state.update((state) => ({
      ...state,
      [key]: {
        ...state[key],
        ...value,
      },
    }));
  }

  // Reset state for a specific key
  resetState(key: string) {
    this.state.update((state) => {
      const newState = { ...state };
      delete newState[key];
      return newState;
    });
  }

  // Clear entire store
  clearStore() {
    this.state.set({});
  }
}
