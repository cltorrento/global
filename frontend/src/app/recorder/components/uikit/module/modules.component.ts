import { Component, OnInit } from '@angular/core';
import { ConfirmationService, MessageService } from 'primeng/api';
import { CustomService } from "../../../service/custom.service";
import { FormControl, FormGroup } from '@angular/forms';
import { DialogService } from 'primeng/dynamicdialog';

interface expandedRows {
    [key: string]: boolean;
}

@Component({
    templateUrl: './modules.component.html',
    providers: [ConfirmationService, MessageService, DialogService]
})
export class ModulesComponent implements OnInit {
    public moduleForm!: FormGroup;
    public optionForm!: FormGroup;
    public showDialog: boolean = false;
    public showOptionDialog: boolean = false;
    public isExpanded: boolean = false;
    public valSwitch: boolean = false;
    public showNewIcon: boolean = false;
    public expandedRows: expandedRows = {};
    public records = [];
    public idModule?:string;
    public idOption?:string;
    public module?:string;
    public order?:number;
    public icon?:string;
    public option?:string;
    public settedIcon?: string;
    
    constructor(private service: MessageService, public dialogService: DialogService, public customService: CustomService) {}

    selectModule(param: any){
        this.idModule = param.id;
        this.module = param.module;
        this.order = param.order;
        this.valSwitch = param.active;
        this.showDialog = true;
    }

    selectOption(param: any){
        this.idOption = param.id;
        this.module = param.module;
        this.icon = param.icon;
        this.valSwitch = param.active;
        this.order = param.order;
        this.option = param.option;
        this.showOptionDialog = true;
    }

    dropdownIcons = [
        { value: 'Select Icon...', db: '-1'},
        { value: 'pi pi-fw pi-home',  db: 'pi pi-fw pi-home text-2xl'},
        { value: 'pi pi-building',  db: 'pi pi-building text-2xl'},
        { value: 'pi pi-align-center',  db: 'pi pi-align-center text-2xl'},
        { value: 'pi pi-align-justify', db: 'pi pi-align-justify'},
        { value: 'pi pi-align-left', db: 'pi pi-align-left text-2xl'},
        { value: 'pi pi-align-right', db: 'pi pi-align-right text-2xl'},
        { value: 'pi pi-angle-double-down', db: 'pi pi-angle-double-down text-2xl'},
        { value: 'pi pi-angle-double-left', db: 'pi pi-angle-double-left text-2xl'},
        { value: 'pi pi-angle-double-right', db: 'pi pi-angle-double-right text-2xl'},
        { value: 'pi pi-angle-double-up', db: 'pi pi-angle-double-up text-2xl'},
        { value: 'pi pi-angle-down', db: 'pi pi-angle-down text-2xl'},
        { value: 'pi pi-angle-left', db: 'pi pi-angle-left text-2xl'},
        { value: 'pi pi-bolt', db: 'pi pi-bolt text-2xl'},
        { value: 'pi pi-box', db: 'pi pi-box text-2xl'},
        { value: 'pi pi-briefcase', db: 'pi pi-briefcase text-2xl'},
        { value: 'pi pi-calendar', db: 'pi pi-calendar text-2xl'},
        { value: 'pi pi-chart-pie', db: 'pi pi-chart-pie text-2xl'},
        { value: 'pi pi-check-square', db: 'pi pi-check-square text-2xl'},
        { value: 'pi pi-cog', db: 'pi pi-cog text-2xl'},
        { value: 'pi pi-file-edit', db: 'pi pi-file-edit text-2xl'},
        
    ];

    setIcon(data: any){
        this.showNewIcon = true;
        this.settedIcon = data.value;
    }

    closeOptionModal() { 
        this.settedIcon = '';
        this.showNewIcon = false;
    }

    getMenu(){
        this.customService.getMenuForUpdate().subscribe({
            next: (data) => {
                this.records = data;
            }, error: (e) => {
                console.error("API error in /UpdateMenu - Data not found" + e);
            }
        });
    }

    ngOnInit() {
      this.setValues();
    }

    setValues(){
        this.getMenu();
        this.moduleForm = new FormGroup({
            _id: new FormControl(''), module: new FormControl(''), order: new FormControl(''), active: new FormControl('')
        });
        this.optionForm = new FormGroup({
            _id: new FormControl(''), module: new FormControl(''),  option: new FormControl(''), active: new FormControl(''), 
            icon: new FormControl(''),  order: new FormControl('')
        });
    }

    updateModule(){
        this.moduleForm.patchValue({ 
            _id: this.idModule, module: this.module, order: this.order, active: this.valSwitch 
        });

        this.customService.updateModule(this.moduleForm.value).subscribe({
            next: () => {
                this.showDialog = false;
                this.setValues();
                this.service.add({ key: 'tst', severity: 'success', summary: 'Success Message', detail: 'Data Update Completed' });
            }, error: (e) => {
                this.service.add({ key: 'tst', severity: 'error', summary: 'Error Message', detail: 'Data Error!' });
            }
        });
    }

    updateOption(){
        this.optionForm.patchValue({ 
            _id: this.idOption, module: this.module, option: this.option, order: this.order, active: this.valSwitch, 
            icon: this.settedIcon != '' && this.settedIcon != undefined?this.settedIcon:this.icon
        });

        this.customService.updateOption(this.optionForm.value).subscribe({
            next: () => {
                this.showOptionDialog = false;
                this.setValues();
                this.service.add({ key: 'tst', severity: 'success', summary: 'Success Message', detail: 'Data Update Completed' });
            }, error: (e) => {
                this.service.add({ key: 'tst', severity: 'error', summary: 'Error Message', detail: 'Data Error!' });
            }
        });
    }
    
}
