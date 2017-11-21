import { Component, Inject, OnInit } from '@angular/core';
import { Http, Response } from '@angular/http';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { environment } from '../../environments/environment.prod';

@Component({
    selector: 'dialog-image',
    templateUrl: 'dialog.component.html',
    styleUrls: ['dialog.component.scss']
})
export class DialogComponent implements OnInit {
    constructor(
        public dialogRef: MatDialogRef<DialogComponent>,
        public http: Http,
        @Inject(MAT_DIALOG_DATA) public data: any) { }

    ngOnInit() { }

    onNoClick(): void {
        this.dialogRef.close();
    }
}
