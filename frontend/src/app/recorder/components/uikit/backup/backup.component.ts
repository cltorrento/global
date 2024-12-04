import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { CustomService } from "../../../service/custom.service";
import { MessageService } from 'primeng/api';
import { DatePipe } from '@angular/common';

@Component({
    templateUrl: './backup.component.html',
    providers: [MessageService]
})
export class BackupComponent implements OnInit{
    
    DateForm!: FormGroup;
    rangeDate?: any = null;
    startTime: any = null;
    endTime: any = null;
    loading: boolean = false;
    showBtn: boolean = false;

    dropdownItems = [
        { value: 'Select Time', db: '-1'},
        { value: '00:00', db: '00'}, { value: '01:00', db: '01'}, { value: '02:00', db: '02'}, { value: '03:00', db: '03'}, { value: '04:00', db: '04'}, 
        { value: '05:00', db: '05'}, { value: '06:00', db: '06'}, { value: '07:00', db: '07'}, { value: '08:00', db: '08'}, { value: '09:00', db: '09'}, 
        { value: '10:00', db: '10'}, { value: '11:00', db: '11'}, { value: '12:00', db: '12'}, { value: '13:00', db: '13'}, { value: '14:00', db: '14'},
        { value: '15:00', db: '15'}, { value: '16:00', db: '16'}, { value: '17:00', db: '17'}, { value: '18:00', db: '18'}, { value: '19:00', db: '19'}, 
        { value: '20:00', db: '20'}, { value: '21:00', db: '21'}, { value: '22:00', db: '22'}, { value: '23:00', db: '23'}
    ];

    constructor(private service: MessageService, private customService: CustomService, private datePipe: DatePipe) {}

    ngOnInit(){
        this.DateForm = new FormGroup({
            startDate: new FormControl(''), endDate: new FormControl(''), 
            startTime: new FormControl(''), endTime: new FormControl('')
        });
    }

    setStartTime(data: any){
        this.startTime = data;
    }

    setEndTime(data: any){
        this.endTime = data;
    }
    
    xport() {
        if(this.rangeDate != null){
            this.loading = true;

            let sd = new Date(this.rangeDate[0]);
            let ed = new Date(this.rangeDate[1]);

            let fullsd = this.datePipe.transform(sd,"dd/MM/yyyy");
            let fulled = this.datePipe.transform(ed,"dd/MM/yyyy");

            this.DateForm.patchValue({ 
                startDate: fullsd,  endDate: fulled, startTime: this.startTime['db'], endTime: this.endTime['db']
            });

            this.customService.export(this.DateForm.value).subscribe({
                next: (data) => {
                    this.loading = false;
                    this.showBtn = true;
                    this.service.add({ key: 'tst', severity: 'success', summary: 'Success Message', detail: 'Backup Completed' });
                }, error: (e) => {
                    console.error("API error in /export - Data not found" + e);
                }
            });
        }else{
            this.service.add({ key: 'tst', severity: 'error', summary: 'Error Message', detail: 'Select Date Range Or Time' });
        }
    }

    download(){
        this.customService.downloadFile().subscribe((blob: Blob) => {
            const url = window.URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = url;
            a.download = 'compressed_bk.zip';
            document.body.appendChild(a);
            a.click();
            document.body.removeChild(a);
            window.URL.revokeObjectURL(url);
          });
    }


}      

