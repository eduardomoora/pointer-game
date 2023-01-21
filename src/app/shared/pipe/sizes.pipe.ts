import { Pipe, PipeTransform } from '@angular/core';
import { sizesMap } from './sizes.model';

@Pipe({
  name: 'sizes'
})


export class SizesPipe implements PipeTransform {

  transform(value: number): string {



    return sizesMap.get(value);
  }

}
