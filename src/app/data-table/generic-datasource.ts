import { DataSource } from '@angular/cdk/table';
import { BehaviorSubject, merge } from 'rxjs';
import { MatPaginator, MatSort } from '@angular/material';
import { map } from 'rxjs/operators';

export class GenericDatasource extends DataSource<any> {
    filteredData: any[] = []
    renderedData: any[] = []

    private filterChange = new BehaviorSubject('')

    constructor(
        private dataBase: any,
        private paginator: MatPaginator,
        private sort: MatSort
    ) {
        super()
    }

    get filter() {
        return this.filterChange.value
    }

    set filter(filter: string) {
        this.filterChange.next(filter)
    }
    
    connect() {
        const displayDataChanges = [
            this.dataBase.dataChange,
            this.sort.sortChange,
            this.filterChange,
            this.paginator.page
        ]

        return merge(...displayDataChanges).pipe(
            map( () => {
                this.filteredData = this.filterData(this.dataBase.data)
                const sortedData = this.getSortedData(this.filteredData.slice())

                const startIndex = this.paginator.pageIndex * this.paginator.pageSize
                this.renderedData = sortedData.splice(startIndex, this.paginator.pageSize)
                return this.renderedData
            })
        )
    }
    
    disconnect(): void { }

    private filterData(data: any[]) {
        this.filteredData = !this.filter ? data : data.filter(obj => {            
            const accumulator = (currentTerm, key) => currentTerm + obj[key]
            const dataStr = Object.keys(obj).reduce(accumulator, '').toLowerCase();
            const transformedFilter = this.filter.trim().toLowerCase()
            
            return dataStr.indexOf(transformedFilter) !== -1
        })

        return this.filteredData
    }

    private getSortedData(data: any[]) {
        if (!this.sort.active || this.sort.direction === '') {
            return data;
        }

        return data.sort((a, b) => {
            const isAsc = this.sort.direction === 'asc';
            if (isNaN(a[this.sort.active])) {
                return compare(a[this.sort.active], b[this.sort.active], isAsc)
            } else {
                return compare(+a[this.sort.active], +b[this.sort.active], isAsc)
            }
        });
    }
}

function compare(a, b, isAsc) {
    return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
}