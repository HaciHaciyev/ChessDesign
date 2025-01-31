import {Component, OnDestroy, OnInit, signal, ViewEncapsulation, WritableSignal} from '@angular/core';
import {Registration} from './registration/registration.component';
import {Login} from './login/login.component';
import {RouterLink} from '@angular/router';
import {CommonModule, NgClass} from '@angular/common';
import {MessageService} from './service/MessageService';
import {Subscription} from 'rxjs';

@Component({
  selector: 'entrance',
  templateUrl: './entrance.component.html',
  styleUrls: ['./entrance.component.scss'],
  imports: [Login, Registration, RouterLink, NgClass, CommonModule],
  encapsulation: ViewEncapsulation.None
})
export class Entrance implements OnInit, OnDestroy {
  private messageSubscription: Subscription = Subscription.EMPTY;
  message: WritableSignal<string> = signal("");
  isSigningUp: WritableSignal<boolean> = signal(false);
  containerClass: WritableSignal<string> = signal("container");
  isPhoneScreenExtension: WritableSignal<boolean> = signal(window.innerWidth < 799);

  constructor(private readonly messageService: MessageService) {}

  ngOnInit(): void {
    this.messageSubscription = this.messageService.currentMessage.subscribe(message => {
      this.message.set(message);
    });

    localStorage.removeItem("entrance-message");
  }

  ngOnDestroy(): void {
    this.messageSubscription.unsubscribe();
  }

  handleTogglePanel = () => {
    this.isSigningUp.set(!this.isSigningUp());
    this.containerClass.set(this.containerClass() === 'container' ? 'container right-panel-active' : 'container');
  };
}
