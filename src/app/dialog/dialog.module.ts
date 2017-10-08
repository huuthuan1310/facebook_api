// Angular Imports
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

// This Module's Components
import { DialogComponent } from './dialog.component';
import { MatDialogModule, MatCardModule, MatButtonModule } from '@angular/material';
import { Ng2EmojiModule } from 'ng2-emoji';
import { PerfectScrollbarModule, PerfectScrollbarConfigInterface } from 'ngx-perfect-scrollbar';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

const PERFECT_SCROLLBAR_CONFIG: PerfectScrollbarConfigInterface = {
    suppressScrollX: true
};

@NgModule({
    imports: [
        MatDialogModule,
        MatCardModule,
        CommonModule,
        Ng2EmojiModule,
        MatButtonModule,
        PerfectScrollbarModule.forRoot(PERFECT_SCROLLBAR_CONFIG),
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
