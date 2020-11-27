import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GroupsRoutingModule } from './group-routing.module';
import { GroupsManagementComponent } from './groups-management/groups-management.component';
import { FormsModule } from '@angular/forms';

//primeng
import {TableModule} from 'primeng/table';
import {InputTextModule} from 'primeng/inputtext';
import {ButtonModule} from 'primeng/button';
import {DialogModule} from 'primeng/dialog';
import {ToastModule} from 'primeng/toast';
import { ConfirmationService, MessageService } from 'primeng/api';
import {ToolbarModule} from 'primeng/toolbar';
import {DropdownModule} from 'primeng/dropdown';
import {ConfirmDialogModule} from 'primeng/confirmdialog';
import { GroupsService } from './groups.service';

@NgModule({
  declarations: [GroupsManagementComponent],
  imports: [
    CommonModule,
    GroupsRoutingModule,
    FormsModule,

    //primeng
    TableModule,
    InputTextModule,
    ButtonModule,
    DialogModule,
    ToastModule,
    ToolbarModule,
    DropdownModule,
    ConfirmDialogModule
  ],
  providers:[GroupsService,MessageService,ConfirmationService]
})
export class GroupsModule { }
