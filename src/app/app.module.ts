import {NgModule, CUSTOM_ELEMENTS_SCHEMA} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {HttpClientModule} from '@angular/common/http';

import {NgxsModule} from '@ngxs/store';
import {NgxsStoragePluginModule} from '@ngxs/storage-plugin';
import {NgxsLoggerPluginModule} from '@ngxs/logger-plugin';
import {NgxsReduxDevtoolsPluginModule} from '@ngxs/devtools-plugin';
import {NgxsFormPluginModule} from '@ngxs/form-plugin';
import {MaterialModule} from './shared/material.module';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {TasksListComponent} from './tasks-list/tasks-list.component';
import {GetdataService} from './getdata.service';
import {TaskState} from './states/task.state';
import {LoginFormComponent} from './login-form/login-form.component';
import {TaskDialogComponent} from './task-dialog/task-dialog.component';

@NgModule({
  declarations: [
    AppComponent,
    TasksListComponent,
    LoginFormComponent,
    TaskDialogComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    NgxsModule.forRoot([TaskState]),
    NgxsStoragePluginModule.forRoot({key: TaskState}),
    NgxsLoggerPluginModule.forRoot(),
    NgxsReduxDevtoolsPluginModule.forRoot(),
    NgxsFormPluginModule.forRoot(),
    BrowserAnimationsModule,
    MaterialModule,
  ],
  providers: [GetdataService],
  entryComponents: [TaskDialogComponent],
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class AppModule { }
