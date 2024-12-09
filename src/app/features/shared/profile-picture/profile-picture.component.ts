import {Component, OnDestroy, OnInit, signal, WritableSignal} from '@angular/core';
import {ProfilePictureService} from './service/ProfilePictureService';
import {NgIf} from '@angular/common';
import {RouterLink} from '@angular/router';
import {StorageService, StorageType} from '../service/StorageService';

@Component({
  selector: 'profile-picture',
  imports: [NgIf, RouterLink],
  templateUrl: './profile-picture.component.html',
  styleUrls: ['./profile-picture.component.scss']
})
export class ProfilePictureComponent implements OnInit, OnDestroy {
  profilePictureBase64: string | null = null;
  isDropdownPage: WritableSignal<boolean> = signal<boolean>(false);

  constructor(private service: ProfilePictureService, private storage: StorageService) {}

  ngOnInit() {
    this.loadProfilePicture();
  }

  ngOnDestroy(): void {
    if (this.profilePictureBase64) {
      URL.revokeObjectURL(this.profilePictureBase64);
    }
  }

  private loadProfilePicture(): void {
    this.service
      .getProfilePicture()
      .subscribe({
        next: (profilePictureUrl: string) => {
          this.profilePictureBase64 = profilePictureUrl;
        },
        error: () => {
          console.error(`Error when attempting to load profile picture.`);
        }
    });
  }

  putProfilePicture(imageFile: File): void {
    this.service.uploadProfilePicture(imageFile);
  }

  deleteProfilePicture(): void {
    this.service.deleteProfilePicture();
  }

  onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input?.files?.[0]) {
      this.putProfilePicture(input.files[0]);
    }
  }

  toggleDropdown(): void {
    this.isDropdownPage.set(!this.isDropdownPage);
    console.log("Function toggleDropdown() called:", this.isDropdownPage);
  }

  handleLogout(): void {
    this.storage.remove(StorageType.JWT_TOKEN);
    this.storage.remove(StorageType.REFRESH_TOKEN);

    this.isDropdownPage.set(false)
  }
}
