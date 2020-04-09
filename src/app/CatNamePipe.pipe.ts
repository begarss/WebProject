import {Pipe, PipeTransform} from '@angular/core';
import {CategoriesService} from './categories.service';

@Pipe({name: 'getCatName', pure: true})

export class CatNamePipePipe implements PipeTransform{
  transform(category: any, ...args: any[]): any {
      return category.name;
  }

}
