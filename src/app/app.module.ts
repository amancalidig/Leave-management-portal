import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

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
import { LoginComponent } from './login/login.component';
import { AuthService } from './sevices/auth.service';
import { AngularFirestore } from 'angularfire2/firestore';
import {MatTableModule} from '@angular/material/table';
import { EmployeeLeaveComponent } from './front-page/employee-leave/employee-leave.component';
import { MatConfirmDialogComponent } from './mat-confirm-dialog/mat-confirm-dialog.component';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatDialogModule } from '@angular/material/dialog';
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { DashboardComponent } from './front-page/dashboard/dashboard.component';
import { AdminComponent } from './front-page/admin/admin.component';



@NgModule({
  declarations: [AppComponent, LoginComponent, EmployeeLeaveComponent, MatConfirmDialogComponent, AdminComponent ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MatSidenavModule,
    AngularFireDatabaseModule,
    MatToolbarModule,
    FormsModule,
    MatMenuModule,
    MatInputModule,
    MatCheckboxModule,
    MatIconModule,
    MatTableModule,
    MatTabsModule,
    MatDialogModule,
    MatDividerModule,
    MatPaginatorModule,
    MatCardModule,
    MatListModule,
    NgbModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFireAuthModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
  ],
  providers: [AuthService,AngularFirestore],
  bootstrap: [AppComponent],
  entryComponents:[DashboardComponent,MatConfirmDialogComponent]
})
export class AppModule {}
