import {Component} from '@angular/core';
import {IRegistration} from './IRegistration';
import {FormsModule} from '@angular/forms';
import {EntranceService} from '../service/EntranceService';
import {Router} from '@angular/router';
import {MessageService} from '../service/MessageService';

@Component({
  selector: "registration",
  templateUrl: "./registration.component.html",
  imports: [FormsModule]
})
export class Registration {
  formData: IRegistration = {username: "", email: "", password: "", passwordConfirmation: ""};

  constructor(private service: EntranceService,
              private router: Router,
              private messageService: MessageService) {}

  handleSubmit() {
    this.service.registration(this.formData).subscribe({
      next: response => {
        console.log(response);
        this.messageService.changeMessage("Registration successful. Please verify you email.");

        this.router.navigate(["/"]).then();
      },
      error: errorResponse => {
        let errorMessage = errorResponse.error!;
        console.log("Error: " + errorMessage);
        console.log(errorMessage);
        this.messageService.changeMessage(errorMessage);
      }
    });
  }
}
