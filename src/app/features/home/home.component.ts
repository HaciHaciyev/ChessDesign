import {Component} from '@angular/core';
import {RouterLink} from '@angular/router';
import {ProfilePictureComponent} from '../shared/profile-picture/profile-picture.component';

@Component({
  selector: 'app-home',
  imports: [ProfilePictureComponent, RouterLink],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {}
