import { Injectable, computed, signal } from '@angular/core';

interface IResourceBaseObject {
  id?: any;
}

type ResourceType<T> = T & IResourceBaseObject;

@Injectable({
  providedIn: 'root',
})
export class ResourceService<T> {
  resources = signal<ResourceType<T>[]>([]);
  resourceId = signal<ResourceType<string>>('');

  selectedResource = computed(() => {
    if (this.resourceId()) {
      return this.resources()?.find((item: any) => {
        return item.id === this.resourceId();
      });
    }
    return null;
  });

  protected setResources = (resources: ResourceType<T>[]) => {
    this.resources.set(resources);
  };

  protected upsertResource = (resource: ResourceType<T>) => {
    const index = this.resources().findIndex((item) => item.id === resource.id);
    if (index === -1) {
      const newResources = [resource, ...this.resources()];
      this.resources.set(newResources);
      return;
    }

    const newResources = this.resources().slice(); // Create a copy of the array
    newResources[index] = resource;
    this.resources.set(newResources);
  };

  protected removeResource = (id: string) => {
    this.resources.set(
      this.resources().filter((resource: any) => resource.id !== id)
    );
  };
}
