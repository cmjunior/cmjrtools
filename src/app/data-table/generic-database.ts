import { BehaviorSubject, Subject } from 'rxjs';
import { Injector } from '@angular/core';
import { UIService } from '../service/ui.service';

export abstract class GenericDatabase<T> {
    dataChange = new BehaviorSubject<T[]>([])
    
    protected dataChanged = new Subject<boolean>()
    dataChanged$ = this.dataChanged.asObservable()

    protected filterData = new Subject<string>()
    filterData$ = this.filterData.asObservable()

    dialogData: T

    protected loadingData = new BehaviorSubject<boolean>(false)
    public loadingData$ = this.loadingData.asObservable()

    protected uiService: UIService

    constructor(private injector: Injector) {
      this.uiService = this.injector.get(UIService)
    }

    initialize() {
      this.dataChange.next([])
      this.loadData()  
    }

    abstract loadData(): void ;

    get data() {
      return this.dataChange.value
    }

    getDialogData() {
      return this.dialogData
    }

    getUsuarioIndex(id) {
      return this.dataChange.value.findIndex( d => d['id'] == id )
    }

    refreshData() {
      this.dataChanged.next(true)
    }

    setfilterData(filter: string) {
      this.filterData.next(filter)
    }
}