import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'nth'
})
export class NthPipe implements PipeTransform {

  transform(value: any, args?: any): any {
    if (value === 11 || value === 12 || value === 13) {
      return value + 'th';
    } else {
      switch (value % 10) {
        case 1:
          return value + 'st';
        case 2:
          return value + 'nd';
        case 3:
          return value + 'rd';
        default:
          return value + 'th';
      }
    }
  }
}
