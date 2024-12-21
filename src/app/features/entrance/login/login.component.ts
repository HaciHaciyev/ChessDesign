import {Component} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {ILogin} from './ILogin';
import {AuthService, ILoginResponse, LoginResponse} from '../../shared/service/AuthService';
import {Router} from '@angular/router';
import {StorageService, StorageType} from '../../shared/service/StorageService';
import {MessageService} from '../service/MessageService';

@Component({
  selector: "login",
  templateUrl: "./login.component.html",
  imports: [FormsModule]
})
export class Login {
  formData: ILogin = {username: "", password: ""};

  public constructor(private service: AuthService,
                     private router: Router,
                     private storage: StorageService,
                     private messageService: MessageService) {}

  handleSubmit() {
    this.service.login(this.formData).subscribe({
      next: response => {

        if (this.isLoginResponse(response)) {
          this.storage.set(StorageType.JWT_TOKEN, response.refreshToken);
          this.storage.set(StorageType.REFRESH_TOKEN, response.token);

          this.messageService.changeMessage("Login Successful");
          this.router.navigate(['/home']).then();
          return;
        }

        console.log("Unexpected response.");
      },
      error: errorResponse => {
        let errorMessage = errorResponse.error!;
        console.log(errorMessage);
        this.messageService.changeMessage(errorMessage);
      }
    });
  }

  private isLoginResponse(response: LoginResponse): response is ILoginResponse {
    return (response as ILoginResponse).token !== undefined;
  }
}
