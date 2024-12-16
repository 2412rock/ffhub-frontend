import { Injectable } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { AddVideoModalComponent } from '../components/modals/add-video-modal/add-video-modal.component';
import { NotificationModalComponent } from '../components/modals/notification-modal/notification-modal.component';

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

  openNotifactionModal(success: boolean, message: string): MatDialogRef<NotificationModalComponent> {
    return this.dialog.open(NotificationModalComponent, {
      data: {
        success,  // Pass success status
        message,    // Pass the message to display in the modal
      },
      panelClass: 'custom-dialog-surface'
    });
  }
}
