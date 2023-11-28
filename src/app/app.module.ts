import { ErrorHandler, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NZ_I18N } from 'ng-zorro-antd/i18n';
import { en_US } from 'ng-zorro-antd/i18n';
import { registerLocaleData } from '@angular/common';
import en from '@angular/common/locales/en';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NzUploadModule } from 'ng-zorro-antd/upload';
import { NzLayoutModule } from 'ng-zorro-antd/layout';
import { NzDividerModule } from 'ng-zorro-antd/divider';

import {
  ApmErrorHandler,
  ApmModule,
  ApmService,
} from '@elastic/apm-rum-angular';

registerLocaleData(en);

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    NzUploadModule,
    NzLayoutModule,
    NzDividerModule,
    ApmModule,
  ],
  providers: [
    ApmService,
    { provide: NZ_I18N, useValue: en_US },
    {
      provide: ErrorHandler,
      useClass: ApmErrorHandler,
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {
  constructor(service: ApmService) {
    // Agent API is exposed through this apm instance
    const apm = service.init({
      serviceName: 'hello-world',
      serverUrl: 'http://localhost:8200',
      environment: 'dev',
    });

    apm.setUserContext({
      username: 'foo',
      id: 'bar',
    });
  }
}
