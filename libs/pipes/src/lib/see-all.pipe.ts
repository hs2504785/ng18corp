import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  standalone: true,
  name: 'seeAll',
})
export class SeeAllPipe implements PipeTransform {
  transform(value: string, limit = 250, trail = '...'): string {
    return value.length > limit ? value.substring(0, limit) + trail : value;
  }
}
