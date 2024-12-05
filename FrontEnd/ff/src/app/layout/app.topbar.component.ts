import { Component, ElementRef, ViewChild } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { LayoutService } from "./service/app.layout.service";
import { CustomService } from "../../app/recorder/service/custom.service";

@Component({
    selector: 'app-topbar',
    templateUrl: './app.topbar.component.html'
})
export class AppTopBarComponent{

    showDialog: boolean = false;
    submitted: boolean = false;
    public ServerApiStatus: Boolean = true;
    public mysqlStatus: Boolean = false;
    public totalMsg: number = 0;
    public MultifonoStatus: Boolean = false;
    
    items!: MenuItem[];

    @ViewChild('menubutton') menuButton!: ElementRef;

    @ViewChild('topbarmenubutton') topbarMenuButton!: ElementRef;

    @ViewChild('topbarmenu') menu!: ElementRef;

    constructor(public customService: CustomService, public layoutService: LayoutService) { }

    openNew() {
        this.submitted = false;
        this.showDialog = true;
    }

    saveProduct() {
        this.showDialog = false;
    }

    hideDialog() {
        this.showDialog = false;
        this.submitted = false;
    }

    checkServices(){
        this.checkMysql();
        this.isActiveMultifono();
    }

    checkMysql(){
        this.customService.getStatus().subscribe({
            next: (data) => {
            this.mysqlStatus = data;
            }, error: (e) => {
            console.error("API error in /gethd - Data not found" + e);
            }
        });
    }

    isActiveMultifono(){
        this.customService.checkMultifono().subscribe({
            next: (data) => {
            this.MultifonoStatus = data;
            }, error: (e) => {
            console.error("API error in /gethd - Data not found" + e);
            }
        });
    }

}
