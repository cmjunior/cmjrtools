import { Component, ViewChild } from '@angular/core';
import { Observable, BehaviorSubject } from 'rxjs';
import { FileuploadService } from '../service/fileupload.service';

import * as _ from 'lodash';
import { MatSnackBar, MatSelectionList } from '@angular/material';

@Component({
  selector: 'cmjr-file-upload',
  templateUrl: './file-upload.component.html',
  styleUrls: ['./file-upload.component.scss']
})
export class FileUploadComponent {
  @ViewChild(MatSelectionList, {static: false}) filesToUpload: MatSelectionList
  percentage: Observable<number>
  isHovering: boolean
  private hasFiles = new BehaviorSubject<boolean>(false)
  hasFiles$ = this.hasFiles.asObservable()

  files: File[] = []
  selectedFiles: File[] = []

  constructor(
    private snackBar: MatSnackBar
  ) { }

  toggleHover(event: boolean) {
    this.isHovering = event
  }

  addToUpload(files: FileList) {
    let filesIndex = _.range(files.length)
    _.each(filesIndex, (idx) => {
      if ( this.files.length > 0 ) {
        let i = this.files.findIndex( (f: File) => f.name == files[idx].name )
        if ( i >= 0 ) {
          this.snackBar.open('Ignorando arquivo(s) repetidos', 'OK', {duration: 3000})
        } else {
          this.files.push(files[idx])
        }
      } else {
        this.files.push(files[idx])        
      }      
      this.hasFiles.next(true)
    })
  }

  removeSelected() {
    this.selectedFiles.forEach( file => {
      let idx = this.files.findIndex( f => f == file )
      this.files.splice(idx, 1)
    })
    this.hasFiles.next(this.files.length > 0)
  }
}