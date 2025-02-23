import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { StatisticsService } from "../../../service/statistics.service";
import { MessageService } from 'primeng/api';
import { ResponseObject } from "../../../api/responseObject";
import { LabelType } from '@angular-slider/ngx-slider';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { SpinnerComponent } from "../../spinner/spinner.component";


@Component({
    templateUrl: './graphic.component.html',
    providers: [MessageService, DialogService]
})
export class GraphicComponent implements OnInit{
    public diffData: any;
    public pieOptions: any;
    public t1: any;
    public queryCall: number = 0;

    public DateForm!: FormGroup;
    public startTime: any = null;
    public endTime: any = null;

    public ln: any = null;
    public queryLabel: string = "";
    public system: string = "";
    public loading: boolean = false;
    public showDiv: boolean = false;
    public showDivQry3: boolean = false;
    public showTable: boolean = false;
    public showBtn: boolean = false;
    public showBar: boolean = false;

    public interfaceData: ResponseObject[] = [];

    public devList: any[] = [];
    public result: any[] = [];

    ref: DynamicDialogRef | undefined;

    public datosTabla: any[] = [];

    public selectedQueryType = '-1';
    public selectedSystems = '-1';

    public queryType = [
        { value: 'Select Query...', db: '-1', qry: 0},
        { value: 'Telephone Line Status', db: 'TEL', qry: 1},{ value: 'Load distribution by Telephone Interface Type', db: 'XX', qry: 2},
        { value: 'Calls Duration by Telephone Interface', db: 'TEL', qry: 3},{ value: 'Total Call Time by Telephone Interface', db: 'TEL', qry: 4}
    ];

    deviceList = [
        {logicalNumber: null, userClass: null, label: null, displayLabel: 'Select Device ...'}
    ];

    dropdownItems = [
        { value: 'Select Time...', db: '-1'}
    ];

    systemItems = [
        { label: 'Select System...', code: '-1'}
    ];

    minDate: number = new Date('2023-08-03').valueOf();
    maxDate: number = new Date('2023-12-31').valueOf();
    selectedRange: number[] = [this.minDate, this.maxDate];

    options = {
        floor: this.minDate, 
        ceil: this.maxDate,
        step: 24 * 60 * 60 * 1000,
        translate: (value: number, label: LabelType): string => {
            const date = new Date(value);
            return date.toLocaleDateString();
        },
    };

    constructor(
        private service: MessageService, private statisticsService: StatisticsService, public dialogService: DialogService
    ) {}
    
    show() {
        this.ref = this.dialogService.open(SpinnerComponent, { header: 'Working...', width: '70%', contentStyle: { overflow: 'auto' }, baseZIndex: 10000, closable: false });
    }

    ngOnInit(){
        this.DateForm = new FormGroup(
            { startDate: new FormControl(''), endDate: new FormControl(''), logicalNumber: new FormControl(''), 
              startTime: new FormControl(''), endTime: new FormControl(''), system: new FormControl('')
            });
        this.getSystemAvailable();
    }

    setStartTime(data: any){
        this.startTime = data;
    }

    setEndTime(data: any){
        this.endTime = data;
    }

    getSystemAvailable(){
        this.statisticsService.getSystemAvailable().subscribe({
            next: (data) => {
              this.systemItems = [
                { label: 'Select System...', code: '-1'},
                    ...data
                ];
            }, error: (e) => {
              console.error("error in getSystemAvailable() - Data not found"+e);
            }
        });
    }

    getDeviceList(device: string, sys: string){
        this.statisticsService.getDevices(device, sys).subscribe({
            next: (data) => {
                this.devList = data.map((data: any) => {
                    return {
                      logicalNumber: data.logicalNumber,
                      userClass: data.userClass,
                      label: data.label,
                      displayLabel: data.label + ' - ' + data.logicalNumber
                    };
                  });
                  this.deviceList = [
                    {logicalNumber: null, userClass: null, label: null, displayLabel: 'Select Device ...'},
                    ...this.devList
                ];
            }, error: (e) => {
              console.error("error in getDeviceList() - Data not found"+e);
            }
        });
    }

    setQuery(data: any){
        this.queryLabel = data.value;
        this.queryCall = data.qry;
        this.getDeviceList(data.db, this.system);
    }

    setSystem(data: any){
        this.system = data.code;
    }

    setLn(data: any){
        this.showBar = false;
        this.ln = data;
        this.statisticsService.getInfoData(this.ln.logicalNumber).subscribe({
            next: (data) => {
                this.showBar = true;
                this.minDate = new Date(data.mindate).valueOf();
                this.maxDate = new Date(data.maxdate).valueOf();
                this.selectedRange = [this.minDate, this.maxDate];
                
                this.options.floor = this.minDate;
                this.options.ceil = this.maxDate;
                this.result = data.result;
                this.dropdownItems = [
                    { value: 'Select Time...', db: '-1'},
                    ...this.result
                ];
            }, error: (e) => {
              console.error("error in getInfoData() - Data not found"+e);
            }
        });        
    }
    
    newsearch(){
        this.selectedQueryType = '-1';
        this.selectedSystems = '-1';
        this.showDiv = this.showBar = this.showDivQry3 = this.showBtn = false;
        this.deviceList = [
            {logicalNumber: null, userClass: null, label: null, displayLabel: 'Select Device ...'}
        ];
        this.dropdownItems = [
            { value: 'Select Time...', db: '-1'}
        ];
    }

    submit() {
        this.show();
        this.interfaceData = [];
        this.showDiv = this.showBtn = this.showDivQry3 = false;
        const myStaDate = new Date(this.minDate);
        const myEndDate = new Date(this.maxDate);
        
        const sd = myStaDate.toLocaleDateString('es-ES', { day: '2-digit', month: '2-digit', year: 'numeric' });
        const ed = myEndDate.toLocaleDateString('es-ES', { day: '2-digit', month: '2-digit', year: 'numeric' });
        
        if(this.startTime.db == -1 || this.endTime.db == -1){
            this.ref?.destroy();
            this.service.add({ key: 'tst', severity: 'error', summary: 'Error Message', detail: 'Please set Start Time / End Time!' });
            return;
        }

        this.loading = true;
        this.DateForm.patchValue({ 
            startDate: sd, endDate: ed, logicalNumber: this.ln.logicalNumber, startTime: this.startTime.db, endTime: this.endTime.db, system: this.system
        });

        switch (this.queryCall) {
            // @ts-ignore
            case 1:
                this.firstQueryCall();
                break;
            case 2:
                this.secondQueryCall();
                break;
            case 3:
                this.thirdQueryCall();
                break;
            case 4:
                this.fourthQueryCall();
                break;
            default:
                console.log("nf");
                break;
        }
        
    }

    chart(data: any){
        this.t1 = data[0]['totalSeconds'];
        const documentStyle = getComputedStyle(document.documentElement);
        const textColor = documentStyle.getPropertyValue('--text-color');

        this.diffData = {
            labels: ['Out of Service','Busy','Calling','Divert','Free','Hold', 'N/A'],
            datasets: [
                {
                    data: [0, 0, 0, 0, 0, 0],
                    backgroundColor: [
                        documentStyle.getPropertyValue('--indigo-500'),
                        documentStyle.getPropertyValue('--purple-500'),
                        documentStyle.getPropertyValue('--teal-500'),
                        documentStyle.getPropertyValue('--orange-500'),
                        documentStyle.getPropertyValue('--yellow-500'),
                        documentStyle.getPropertyValue('--pink-500'),
                        documentStyle.getPropertyValue('--green-500')
                    ],
                    hoverBackgroundColor: [
                        documentStyle.getPropertyValue('--indigo-400'),
                        documentStyle.getPropertyValue('--purple-400'),
                        documentStyle.getPropertyValue('--teal-400'),
                        documentStyle.getPropertyValue('--orange-400'),
                        documentStyle.getPropertyValue('--yellow-400'),
                        documentStyle.getPropertyValue('--pink-400'),
                        documentStyle.getPropertyValue('--green-400')
                    ]
                }]
        };

        this.pieOptions = {
            plugins: {
                legend: {
                    display: false,
                    labels: {
                        usePointStyle: false,
                        color: textColor
                    }
                }
            }
        };

        data.forEach((item: ResponseObject) => {
            switch (item.status) {
                case '4F':
                    this.diffData.datasets[0].data[0] = item.differenceInSeconds;
                    break;
                case '42':
                    this.diffData.datasets[0].data[1] = item.differenceInSeconds;
                    break;
                case '43':
                    this.diffData.datasets[0].data[2] = item.differenceInSeconds;
                    break;
                case '44':
                    this.diffData.datasets[0].data[3] = item.differenceInSeconds;
                    break;
                case '46':
                    this.diffData.datasets[0].data[4] = item.differenceInSeconds;
                    break;
                case '48':
                    this.diffData.datasets[0].data[5] = item.differenceInSeconds;
                    break;
                case 'na':
                    this.diffData.datasets[0].data[6] = item.differenceInSeconds;
                    break;
                default:
                    break;
            }
        });
    }

    calc(numero: number, total: number, mas: number): string {
        const porcentaje = (((numero / total) * 100)) + mas;
        return `${porcentaje.toFixed(2)}%`;
    }

    import(){
        this.newsearch();
        this.show();
        this.statisticsService.importData().subscribe({
            next: (data) => {
                this.service.add({ key: 'tst', severity: 'success', summary: 'Success Message', detail: 'Data Update Completed' });
                this.ref?.destroy();
            }, error: (e) => {
                this.service.add({ key: 'tst', severity: 'error', summary: 'Error Message', detail: 'No data found!' });
                this.ref?.destroy();
            }
        });  
        this.getSystemAvailable();
    }

    firstQueryCall(){
        this.statisticsService.processData(this.DateForm.value).subscribe({
            next: (data) => {
                this.loading = false;
                this.interfaceData = data;
                if(data.length>0){
                    this.ref?.destroy();
                    this.showDiv = this.showBtn = true;
                    this.chart(this.interfaceData);
                    this.service.add({ key: 'tst', severity: 'success', summary: 'Success Message', detail: 'Process Completed' });
                }else{
                    this.ref?.destroy();
                    this.service.add({ key: 'tst', severity: 'error', summary: 'Error Message', detail: 'No data found!' });
                    this.loading = false;
                }
            }, error: (e) => {
                this.ref?.destroy();
                console.error("API error in /export - Data not found" + e);
            }
        });
    }


    secondQueryCall(){

    }

    thirdQueryCall(){
        this.statisticsService.getCallsByInterface(this.DateForm.value).subscribe({
            next: (data) => {
                this.loading = false;
                this.datosTabla = data;
                console.log(data);
                if(data.length>0){
                    this.ref?.destroy();
                    this.showDivQry3 = true;
                    this.service.add({ key: 'tst', severity: 'success', summary: 'Success Message', detail: 'Process Completed' });
                }else{
                    this.ref?.destroy();
                    this.service.add({ key: 'tst', severity: 'error', summary: 'Error Message', detail: 'No data found!' });
                    this.loading = false;
                }
            }, error: (e) => {
                this.ref?.destroy();
                console.error("API error in /getCallsByInterface - Data not found" + e);
            }
        });
    }
  
    fourthQueryCall(){

    }


}