import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { CustomService } from "../../../service/custom.service";
import { MessageService } from 'primeng/api';
import { ConfirmationService } from 'primeng/api';

@Component({
    templateUrl: './config.component.html',
    providers: [MessageService, ConfirmationService]
})
export class ConfigComponent implements OnInit{
    
    public ConfigForm!: FormGroup;
    public loading: boolean = false;

    public xdayScheduled: any;
    public xminuteScheduled: any;
    public xbackupFolder: any
    public xcronSeconds: any;
    public xcronMinutes: any;
    public xcronHours: any;
    public xcronDays: any;
    public xcronMonth: any;
    public xcronDow: any;
    
    constructor(private service: MessageService, private customService: CustomService, private confirmationService: ConfirmationService) {}

    ngOnInit(){
        this.ConfigForm = new FormGroup({
            day_scheduled: new FormControl(''), minute_Scheduled: new FormControl(''), backup_folder: new FormControl(''), 
            cron_seconds: new FormControl(''), cron_minutes: new FormControl(''), cron_hours: new FormControl(''), cron_days: new FormControl(''), 
            cron_month: new FormControl(''), cron_dow: new FormControl('')
        });
        this.getConfigData();
    }

    getConfigData(){
        this.customService.getConfigData().subscribe({
            next: (data) => {
                this.assignValues(data);
            }, error: (e) => {
                console.error("API error in /configData - Data not found" + e);
            }
        });
    }

    assignValues(data: any){
        this.xbackupFolder = data[0]['backup_folder'];
        this.xdayScheduled = data[0]['day_scheduled'];
        this.xminuteScheduled = data[0]['minute_Scheduled'];
        this.xcronSeconds = data[0]['cron_seconds'];
        this.xcronMinutes = data[0]['cron_minutes'];
        this.xcronHours = data[0]['cron_hours'];
        this.xcronDays = data[0]['cron_days'];
        this.xcronMonth = data[0]['cron_month'];
        this.xcronDow = data[0]['cron_dow'];
    }

    confirm2(event: Event) {

        this.ConfigForm.patchValue({ 
            day_scheduled: this.xdayScheduled, minute_Scheduled: this.xminuteScheduled, backup_folder: this.xbackupFolder, 
            cron_seconds: this.xcronSeconds, cron_minutes: this.xcronMinutes, cron_hours: this.xcronHours, cron_days: this.xcronDays, 
            cron_month: this.xcronMonth, cron_dow: this.xcronDow
        });
        
        this.loading = true;
        this.confirmationService.confirm({
            key: 'confirm2',
            target: event.target || new EventTarget,
            message: 'Save all information modified?',
            icon: 'pi pi-exclamation-triangle',
            accept: () => {
                this.customService.configData(this.ConfigForm.value).subscribe({
                    next: (data) => {
                        this.loading = false;
                        this.service.add({ key: 'tst', severity: 'success', summary: 'Success Message', detail: 'Configuration saved' });
                    }, error: (e) => {
                        this.loading = false;
                    }
                });
            },
            reject: () => {
                this.loading = false;
                this.service.add({ severity: 'error', summary: 'Rejected', detail: 'You have rejected' });
            }
        });
    }


}      

