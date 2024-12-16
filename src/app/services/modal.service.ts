import { Injectable } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { AddVideoModalComponent } from '../components/modals/add-video-modal/add-video-modal.component';

@Injectable({
  providedIn: 'root'
})
export class ModalService {

  constructor(private dialog: MatDialog) { }

  openAddVideoModal(): MatDialogRef<AddVideoModalComponent> {
    return this.dialog.open(AddVideoModalComponent, {
      data: {
        title: ""
      },
      panelClass: 'custom-dialog-surface'
    });
  }
}
