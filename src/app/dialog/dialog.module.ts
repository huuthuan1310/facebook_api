// Angular Imports
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

// This Module's Components
import { DialogComponent } from './dialog.component';
import { MatDialogModule, MatCardModule, MatButtonModule, MatIconModule } from '@angular/material';
import { Ng2EmojiModule } from 'ng2-emoji';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';


@NgModule({
    imports: [
        MatDialogModule,
        MatCardModule,
        MatIconModule,
        CommonModule,
        Ng2EmojiModule,
        MatButtonModule,
        NgbModule.forRoot()
    ],
    declarations: [
        DialogComponent,
    ],
    exports: [
        DialogComponent,
    ],
    bootstrap: []
})
export class DialogModule {
    
}
