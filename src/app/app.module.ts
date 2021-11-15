import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { DragDropModule } from '@angular/cdk/drag-drop'
import {MatCheckboxModule} from '@angular/material/checkbox';
import {MatCardModule} from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatSelectModule } from '@angular/material/select';
import { FormsModule} from '@angular/forms';
import { InputComponent } from './components/form-builder/fields/input/input.component';
import { ButtonComponent } from './components/form-builder/fields/button/button.component';
import { SelectComponent } from './components/form-builder/fields/select/select.component';
import { CheckboxComponent } from './components/form-builder/fields/checkbox/checkbox.component';
import { TextareaComponent } from './components/form-builder/fields/textarea/textarea.component';
import { PortalModule } from '@angular/cdk/portal';
import { StoreModule } from '@ngrx/store'
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import * as fromReducer from './store/fields.reducer';
import { FieldStylingFormComponent } from './components/form-builder/field-styling-form/field-styling-form.component'
import { ReactiveFormsModule } from '@angular/forms';
import { ReactiveComponentModule } from '@ngrx/component';
import { HttpClientModule, HTTP_INTERCEPTORS }   from '@angular/common/http';
import { ReqInterceptor } from './reqInterceptor';
import { LoginComponent } from './components/auth/login/login.component';
import { FormBuilderComponent } from './components/form-builder/form-builder.component';
import { AppRoutingModule } from './app-routing.module';
import { RouterModule } from '@angular/router';
import { SignupComponent } from './components/auth/signup/signup.component';


@NgModule({
  declarations: [
    AppComponent,
    InputComponent,
    ButtonComponent,
    SelectComponent,
    CheckboxComponent,
    TextareaComponent,
    FieldStylingFormComponent,
    LoginComponent,
    FormBuilderComponent,
    SignupComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    MatExpansionModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatCardModule,
    DragDropModule,
    MatCheckboxModule,
    MatIconModule,
    MatSelectModule,
    PortalModule,
    ReactiveFormsModule,
    ReactiveComponentModule,
    HttpClientModule,
    StoreModule.forRoot({fields: fromReducer.reducer}),
    StoreDevtoolsModule.instrument({
      maxAge: 25, // Retains last 25 states
      autoPause: true, // Pauses recording actions and state changes when the extension window is not open
    }),
    AppRoutingModule,
    RouterModule,
  ],
  providers: [{
    provide: HTTP_INTERCEPTORS,
    useClass: ReqInterceptor,
    multi: true,
  },
   FormBuilderComponent,
],
  bootstrap: [AppComponent]
})
export class AppModule { }
