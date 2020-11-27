import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { GroupsManagementComponent } from './groups-management/groups-management.component';

const routes: Routes = [
    {
        path: '',
        component: GroupsManagementComponent,
        data: {
            title: 'Chat'
        },

    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class GroupsRoutingModule { }

export const routedComponents = [GroupsManagementComponent];