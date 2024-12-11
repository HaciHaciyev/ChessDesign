import {Component, OnDestroy, OnInit, signal, WritableSignal} from '@angular/core';
import {ProfilePictureService} from './service/ProfilePictureService';
import {NgIf} from '@angular/common';
import {Router, RouterLink} from '@angular/router';
import {StorageService, StorageType} from '../../service/StorageService';
import {debounceTime, Subject} from 'rxjs';

@Component({
  selector: 'profile-picture',
  imports: [NgIf, RouterLink],
  templateUrl: './profile-picture.component.html',
  styleUrls: ['./profile-picture.component.scss']
})
export class ProfilePictureComponent implements OnInit, OnDestroy {
  profilePictureBase64: string | null = null;
  private closeSubject: Subject<void> = new Subject<void>();
  private hoverSubject: Subject<void> = new Subject<void>();
  private isInsideDropdown: WritableSignal<boolean> = signal<boolean>(false);
  isDropdownPage: WritableSignal<boolean> = signal<boolean>(false);

  constructor(private service: ProfilePictureService,
              private storage: StorageService,
              private router: Router) {}

  ngOnInit() {
    this.loadProfilePicture();

    this.closeSubject.pipe(debounceTime(700)).subscribe(() => {
      if (this.isInsideDropdown()) {
        return;
      }
      this.isDropdownPage.set(false);
    });

    this.hoverSubject.subscribe(() => {
      if (this.closeSubject) {
        this.closeSubject.next();
      }
    });
  }

  ngOnDestroy(): void {
    if (this.profilePictureBase64) {
      URL.revokeObjectURL(this.profilePictureBase64);
    }

    this.closeSubject.unsubscribe();
    this.hoverSubject.unsubscribe();
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
    this.isDropdownPage.set(!this.isDropdownPage());
  }

  handleLogout(): void {
    this.storage.remove(StorageType.JWT_TOKEN);
    this.storage.remove(StorageType.REFRESH_TOKEN);

    this.router.navigate(['/entrance']).then();
    this.isDropdownPage.set(false);
  }

  handleKeyDown(event: KeyboardEvent, action?: string): void {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();

      if (action === 'logout') {
        this.handleLogout();
        return;
      }

      this.toggleDropdown();
    }
  }

  onMouseEnter(): void {
    this.isDropdownPage.set(true);
  }

  onMouseLeave(): void {
    this.closeSubject.next();
  }

  onDropdownMouseEnter(): void {
    this.isInsideDropdown.set(true);
    this.hoverSubject.next();
  }

  onDropdownMouseLeave(): void {
    this.isInsideDropdown.set(false)
    this.closeSubject.next();
  }
}
