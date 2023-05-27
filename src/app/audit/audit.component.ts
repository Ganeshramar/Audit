import { Component, OnInit } from '@angular/core';
import { first } from 'rxjs/operators';

import { AccountService } from '@app/_services';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { ViewChild } from '@angular/core';
import { DatePipe } from '@angular/common';
import { FormControl } from '@angular/forms';

export interface UserData{
    firstName: string;
    lastName: string;
    userName: string;
    role: string;
    createdDate: string;
}

export const DATE_FORMAT_12HR = 'dd/MM/yyyy hh:mm:ss a';
export const DATE_FORMAT_24HR = 'dd/MM/yyyy HH:mm:ss';

export const FORMAT_OPTIONS = [
  { value: '12hr', label: '12-Hour Format' },
  { value: '24hr', label: '24-Hour Format' }
];


@Component({ 
    templateUrl: 'audit.component.html',
    styleUrls: ['./audit.component.css']    
})

export class AuditComponent implements OnInit {
    users?: any[];
    displayedColumn: string[] =['firstName', 'lastName', 'userName', 'role', 'dateTime'];
    dataSource !: MatTableDataSource<UserData>;
    @ViewChild(MatPaginator) paginator !: MatPaginator;
    @ViewChild(MatSort) sort !: MatSort;
    formatControl = new FormControl('12hr');
    formatOptions = FORMAT_OPTIONS;

    constructor(
        private accountService: AccountService,
        private datePipe: DatePipe
        ) { }

    ngOnInit() {
        this.accountService.getAll()
            .pipe(first())
            .subscribe(users => {
             this.users = users,
             this.dataSource = new MatTableDataSource(this.users),
             this.dataSource.paginator = this.paginator,
             this.dataSource.sort = this.sort
            });
        
            this.formatControl.valueChanges.subscribe(value => {
                this.applyDateFormat();
              });
             console.log(this.dataSource, this.users);
    }

    applyDateFormat() {
        const format = this.formatControl.value === '12hr' ? DATE_FORMAT_12HR : DATE_FORMAT_24HR;
        this.dataSource.data.forEach(item => {
          item.createdDate != this.datePipe.transform(item.createdDate, format);
        });
      }  

    checkFilter(event: Event){
        const filterVal = (event.target as HTMLInputElement).value;
        this.dataSource.filter = filterVal.trim().toLowerCase();
        if(this.dataSource.paginator){
            this.dataSource.paginator.firstPage()
        } 
    }      

    deleteUser(id: string) {
        const user = this.users!.find(x => x.id === id);
        user.isDeleting = true;
        this.accountService.delete(id)
            .pipe(first())
            .subscribe(() => this.users = this.users!.filter(x => x.id !== id));
    }
}
