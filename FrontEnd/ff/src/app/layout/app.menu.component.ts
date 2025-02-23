import { OnInit } from '@angular/core';
import { Component } from '@angular/core';
import { LayoutService } from './service/app.layout.service';
import { CustomService } from "../recorder/service/custom.service";

@Component({
    selector: 'app-menu',
    templateUrl: './app.menu.component.html'
})
export class AppMenuComponent implements OnInit {

    model: any[] = [];
    public MultifonoStatus: Boolean = false;

    constructor(public customService: CustomService, public layoutService: LayoutService) { }

    ngOnInit() {
        this.isActiveMultifono();
        this.getLeftMenu();
    }


    getLeftMenu(){
        this.model = [];
        this.customService.getMenu().subscribe({
            next: (data) => {
                console.log(data);
                this.model = data;
            }, error: (e) => {
                console.error("API error in /getMenu - Data not found" + e);
            }
        });
    }


    isActiveMultifono(){
        this.customService.checkMultifono().subscribe({
            next: (data) => {
            this.MultifonoStatus = data;
            }, error: (e) => {
            console.error("API error in /isActiveMultifono - Data not found" + e);
            }
        });
    }
}