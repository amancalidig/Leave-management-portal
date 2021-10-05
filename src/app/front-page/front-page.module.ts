import { NgModule } from '@angular/core';

import { CommonModule } from '@angular/common';
import { FrontPageRoutingModule } from './front-page-routing.module';

import { FrontPageComponent } from './front-page.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { HeaderComponent } from './header/header.component';

import { SidenavComponent } from './sidenav/sidenav.component';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatMenuModule } from '@angular/material/menu';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatTabsModule } from '@angular/material/tabs';
import { MatDividerModule } from '@angular/material/divider';
import { MatListModule } from '@angular/material/list';
import { MatInputModule } from '@angular/material/input';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { environment } from 'src/environments/environment';
import { AngularFireModule } from 'angularfire2';
import { AngularFireAuthModule } from 'angularfire2/auth';
import {MatGridListModule} from '@angular/material/grid-list';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatRadioModule} from '@angular/material/radio';
import {MatSelectModule} from '@angular/material/select';
import {MatDatepickerModule} from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import {MatButtonModule} from '@angular/material/button';
import {MatTableModule} from '@angular/material/table';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import { MatPaginatorModule } from '@angular/material/paginator';
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { DatePipe } from '@angular/common';


import { EmployeeService } from '../shared/employee.service';
import { NotificationService } from '../shared/notification.service';
import { MatDialogModule ,MatDialogRef} from '@angular/material/dialog';




@NgModule({
  declarations: [
    FrontPageComponent,
    DashboardComponent,
    HeaderComponent,
    DashboardComponent,
    SidenavComponent,
  ],
  imports: [
    FrontPageRoutingModule,
    CommonModule,
    MatSidenavModule,
    MatToolbarModule,
    MatSnackBarModule,
    MatPaginatorModule,
    MatDialogModule,
    FormsModule,
    MatMenuModule,
    MatInputModule,
    MatCheckboxModule,
    MatIconModule,
    MatTabsModule,
    MatDividerModule,
    MatCardModule,
    MatListModule,
    AngularFireDatabaseModule ,
    NgbModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFireAuthModule,
    ReactiveFormsModule,
    MatToolbarModule,
    MatGridListModule,
    MatFormFieldModule,
    MatRadioModule,
    MatSelectModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatButtonModule,
    MatTableModule,
  ],
  providers: [EmployeeService,NotificationService, DatePipe, {
    provide: MatDialogRef,
    useValue: {}
  },],
})
export class FrontPageModule {}
