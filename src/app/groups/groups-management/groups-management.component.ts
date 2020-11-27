import { Component, OnInit } from "@angular/core";
import { ConfirmationService, MessageService } from "primeng/api";
import { GroupsService } from "../groups.service";
import { Group } from "../models/group";

@Component({
  selector: "app-groups-management",
  templateUrl: "./groups-management.component.html",
  styleUrls: ["./groups-management.component.scss"],
})
export class GroupsManagementComponent implements OnInit {
  groupTypes: any[] = [];
  groups: any[] = [];
  group: Group = {};

  groupDialog: boolean;
  submitted: boolean;
  newGroup: boolean = true;

  constructor(
    private groupsService: GroupsService,
    private messageService: MessageService,
    private confirmationService: ConfirmationService
  ) {}

  ngOnInit() {debugger
    this.loadData();
  }

  //#region groups actions
  openNew() {
    this.group = {};
    this.submitted = false;
    this.groupDialog = true;
    this.newGroup = true;
  }

  editGroup(group: Group) {
    this.group = { ...group };
    this.groupDialog = true;
    this.newGroup = false;
  }

  deleteGroup(group: Group) {debugger
    this.confirmationService.confirm({
      message: "Are you sure you want to delete " + group.name + "?",
      header: "Confirm",
      icon: "pi pi-exclamation-triangle",
      accept: () => {
        this.groupsService.deleteGroup(group.id).subscribe((d) => {
          this.groups = this.groups.filter((val) => val.id !== group.id);
          this.group = {};
          this.messageService.add({
            severity: "success",
            summary: "Successful",
            detail: "Group Deleted",
            life: 3000,
          });
        });
      },
    });
  }

  hideDialog() {
    this.groupDialog = false;
    this.submitted = false;
  }

  saveGroup() {debugger
    this.submitted = true;

    if (this.group.name.trim()) {
      if (!this.newGroup) {
        this.groupsService
          .editGroup(this.group.id, this.group)
          .subscribe((data) => {
            this.groups[this.findIndexById(this.group.id)] = this.group;
            this.messageService.add({
              severity: "success",
              summary: "Successful",
              detail: "Group Updated",
              life: 3000,
            });
            this.groupDialog = false;
          });
      } else {
        this.groupsService.addGroup(this.group).subscribe((d) => {
          this.getGroups();
          this.messageService.add({
            severity: "success",
            summary: "Successful",
            detail: "Group Created",
            life: 3000,
          });
          this.groupDialog = false;
        });
      }     
    }
  }

  findIndexById(id: number): number {
    let index = -1;
    for (let i = 0; i < this.groups.length; i++) {
      if (this.groups[i].id === id) {
        index = i;
        break;
      }
    }

    return index;
  }

  //#endregion

  //#region loading data
  loadData() {
    this.getGroupTypes();
    this.getGroups();
  }
  getGroups() {
    this.groupsService.getGroups().subscribe((data: any[]) => {
      this.groups = data;
    });
  }
  getGroupTypes() {
    this.groupsService.getGroupTypes().subscribe((data: any[]) => {
      this.groupTypes = data;
    });
  }
  //#endregion
}
