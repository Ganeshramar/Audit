import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

import { AuditComponent } from './audit.component';
import { AuditRoutingModule } from './audit-routing.module';

import { MatTableModule } from '@angular/material/table';
import {MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { MatFormFieldModule } from '@angular/material/form-field'; 
import {MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';

import { DatePipe } from '@angular/common';


@NgModule({
  imports: [
            CommonModule, 
            ReactiveFormsModule,
            AuditRoutingModule,
            MatTableModule,
            MatPaginatorModule,
            MatSortModule,
            MatFormFieldModule,
            MatInputModule,
            MatSelectModule
        ],
  providers: [DatePipe],
  declarations: [AuditComponent],
})
export class AuditModule {}
