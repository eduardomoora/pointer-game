import { Pipe, PipeTransform } from '@angular/core';
import { sizesMap } from './sizes.model';

@Pipe({
  name: 'sizes'
})


export class SizesPipe implements PipeTransform {

  transform(value: any): string {



    //return sizesMap.get(value);

    return value;
  }

}
