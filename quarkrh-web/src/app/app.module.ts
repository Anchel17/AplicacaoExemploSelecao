import { NgModule } from "@angular/core";
import { AppComponent } from "./app.component";
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { HttpClient, HttpClientModule } from '@angular/common/http'
import { SignUpService } from "./components/sign-up/sign-up.service";

@NgModule({
  declarations: [
    // AppComponent,
  ],
  imports: [
    MatCardModule,
    MatButtonModule,
    MatSelectModule,
    MatFormFieldModule,
    FormsModule,
    MatInputModule,
    HttpClientModule
  ],
  providers: [SignUpService, HttpClient],
  // bootstrap: [AppComponent]
})
export class AppModule { }
