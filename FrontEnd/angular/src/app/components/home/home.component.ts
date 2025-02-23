import { Component } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {

  close() {
    // Lógica para cerrar la aplicación o redirigir
    console.log('Close button clicked');
  }

}
