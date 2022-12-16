import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'sort'
})
export class SortPipe implements PipeTransform {

  transform(value: string[], propName: string): any {

    if (value.length === 0 || propName.length === 0) {
      return value;
    }

    return value.sort((a, b) => (a[propName] > b[propName]) ? 1 : -1)
  }
}
