import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'listFilter'
})
export class ListFilterPipe implements PipeTransform {

  transform(list: string[], filter: string): string[] {
    if ( ! list ) return []
    if ( ! filter ) return list

    filter = filter.toLowerCase()

    return list.filter( (item: string) => 
      item.toLowerCase().indexOf(filter.toLowerCase()) > -1
    )
  }
}
