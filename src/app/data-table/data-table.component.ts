import { Component, OnInit, ViewChild, Input, TemplateRef, Output, EventEmitter } from '@angular/core';
import { trigger, state, style, transition, animate, sequence } from '@angular/animations';
import { GenericDatasource } from './generic-datasource';
import { MatPaginator, MatSort } from '@angular/material';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { shareReplay } from 'rxjs/operators';

@Component({
  selector: 'cmjr-data-table',
  templateUrl: './data-table.component.html',
  styleUrls: ['./data-table.component.css'],
  animations: [
    trigger('detailExpand', [
      state('void', style({ height: '0px', minHeight: '0', visibility: 'hidden' })),
      state('*', style({ height: '*', visibility: 'visible' })),
      transition('void <=> *', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
    trigger('rowsAnimation', [
      transition('void => *', [
        style({ height: '*', opacity: '0', transform: 'translateX(-550px)', 'box-shadow': 'none' }),
        sequence([
          animate(".35s ease", style({ height: '*', opacity: '.2', transform: 'translateX(0)', 'box-shadow': 'none'  })),
          animate(".35s ease", style({ height: '*', opacity: 1, transform: 'translateX(0)' }))
        ])
      ])
    ])
  ],
})
export class DataTableComponent implements OnInit {
  dataSource: GenericDatasource

  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  @ViewChild(MatSort, {static: true}) sort: MatSort;

  @Input() displayedColumns: string[] = []
  @Input() displayedHeaders: string[] = []
  @Input() columnType: string[] = []
  @Input() columnSize: number[] = []
  @Input() columnMask: string[] = []
  @Input() dataBase: any
  @Input() actionsTemplate: TemplateRef<any>
  
  @Output() equipamentoSelecionado = new EventEmitter<any>()

  isMobile: boolean;

  constructor(
    private breakpointObserver: BreakpointObserver) {
    this.breakpointObserver.observe([
      Breakpoints.Handset,
      Breakpoints.HandsetPortrait,
      Breakpoints.HandsetLandscape,
    ]).subscribe(result => {
      this.isMobile = result.matches
    })
  }

  ngOnInit() {
    this.dataSource = new GenericDatasource(this.dataBase, this.paginator, this.sort)
    this.dataBase.dataChanged$
      .pipe( shareReplay() )
      .subscribe( () => {
        this.refreshTable()
      })
    this.dataBase.filterData$
      .pipe( shareReplay() )
      .subscribe( (filter) => {
        filter == '' ? this.clearFilter() : this.dataSource.filter = filter.trim().toLowerCase()
      })
  }

  onSelectElement(element: any) {
    this.equipamentoSelecionado.emit(element)
  }

  clearFilter() {
    this.dataSource.filter = ''
  }

  private refreshTable() {
    this.paginator._changePageSize(this.paginator.pageSize)
  }

  getClassName(columnSize: number) {
    let result: string = 'column'
    switch (columnSize) {
      case 4:
        result += ' four'
        break;
      case 6:
        result += ' six'
        break;
      case 10:
        result += ' ten'
        break;
      case 15:
        result += ' fifteen'
        break;
      case 20:
        result += ' twenty'
        break;
      default:
        break;
    }

    return result;
  }
}
