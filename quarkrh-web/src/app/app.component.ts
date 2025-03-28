import { Component } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { HeaderComponentComponent } from "./components/header-component/header-component.component";

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, HeaderComponentComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'quarkrh-web';

  constructor(private router: Router){}

  ngOnInit(){
    const token = localStorage.getItem('token');

    if(!token){
      this.router.navigate(['/signUp']);
    }
  }
}
