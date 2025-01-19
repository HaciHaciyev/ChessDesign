import {Component, ElementRef, OnDestroy, OnInit, signal, ViewChild, WritableSignal} from '@angular/core';
import {ProfilePictureService} from './service/ProfilePictureService';
import {NgIf} from '@angular/common';
import {Router} from '@angular/router';
import {StorageService, StorageType} from '../../service/StorageService';
import {debounceTime, Subject} from 'rxjs';
import {UserProperties} from './IUserProperties';
import {UserPropertiesService} from '../../service/UserPropertiesService';
import {SettingsComponent} from './settings/settings.component';

@Component({
  selector: 'profile',
  imports: [NgIf, SettingsComponent],
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit, OnDestroy {
  @ViewChild('fileInput', {static: false}) fileInput!: ElementRef<HTMLInputElement>;

  protected isFileInputActive: WritableSignal<boolean> = signal<boolean>(false);
  protected isTouchDevice: WritableSignal<boolean> = signal<boolean>(false);
  protected isDropdownPage: WritableSignal<boolean> = signal<boolean>(false);
  private isInsideDropdown: WritableSignal<boolean> = signal<boolean>(false);
  private isTouchActive: WritableSignal<boolean> = signal<boolean>(false);
  protected isSettingsDisplayed: WritableSignal<boolean> = signal<boolean>(false);

  private closeSubject: Subject<void> = new Subject<void>();
  private hoverSubject: Subject<void> = new Subject<void>();

  protected profilePictureBase64: string | null = null;
  protected userProperties: UserProperties | null = null;

  constructor(private userService: UserPropertiesService,
              private pictureService: ProfilePictureService,
              private storage: StorageService,
              private router: Router) {}

  ngOnInit(): void {
    this.loadUserProperties();
    this.loadProfilePicture();

    this.isTouchDevice.set('ontouchstart' in window || navigator.maxTouchPoints > 0);
    console.log(`Is touch device: ${this.isTouchDevice()}`);

    this.closeSubject.pipe(debounceTime(700)).subscribe((): void => {
      if (this.isInsideDropdown() || this.isFileInputActive()) {
        return;
      }
      this.isDropdownPage.set(false);
    });

    this.hoverSubject.subscribe((): void => {
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

  private loadUserProperties(): void {
    this.userService
      .getUserProperties()
      .subscribe({
        next: (userProperties: UserProperties): void => {
          this.userProperties = userProperties;
        },
        error: (): void => {
          console.error("Error loading user properties");
        }
      })
  }

  private loadProfilePicture(): void {
    this.pictureService
      .getProfilePicture()
      .subscribe({
        next: (profilePictureUrl: string): void => {
          this.profilePictureBase64 = profilePictureUrl;
        },
        error: (): void => {
          console.error("Error when attempting to load profile picture.");
        }
    });
  }

  deleteProfilePicture(): void {
    console.log("Trying to delete profile picture.")
    this.pictureService.deleteProfilePicture();
  }

  onFileInputClick(): void {
    console.log("On file input click.")

    this.isFileInputActive.set(true);
    this.fileInput.nativeElement.click();

    console.log("File input click opened.")
  }

  onFileSelected(event: Event): void {
    console.log("On file selected.")
    event.stopPropagation();
    this.isFileInputActive.set(false);

    const file: File | undefined = (event.target as HTMLInputElement).files?.[0];

    if (file) {
      this.pictureService.uploadProfilePicture(file).subscribe({
        next: (success: boolean): void => {
          if (success) {
            console.log("Image uploaded successfully!");
            return;
          }

          console.error("Image upload failed.");
        },
        error: (): void => console.error("An unexpected error occurred.")
      });

      return;
    }

    console.error("No file selected.");
  }

  handleLogout(): void {
    this.storage.remove(StorageType.JWT_TOKEN);
    this.storage.remove(StorageType.REFRESH_TOKEN);

    this.router.navigate(['/entrance']).then();
    this.isDropdownPage.set(false);
  }

  toggleSettings(): void {
    this.isSettingsDisplayed.set(!this.isSettingsDisplayed);
  }

  onMouseEnter(): void {
    if (this.isTouchDevice() || this.isTouchActive()) {
      return;
    }

    this.isDropdownPage.set(true);
  }

  onMouseLeave(): void {
    if (this.isTouchDevice() || this.isTouchActive()) {
      return;
    }

    this.closeSubject.next();
  }

  onDropdownMouseEnter(): void {
    if (this.isTouchDevice() || this.isTouchActive()) {
      return;
    }

    this.isInsideDropdown.set(true);
    this.hoverSubject.next();
  }

  onDropdownMouseLeave(): void {
    if (this.isTouchDevice() || this.isTouchActive()) {
      return;
    }

    this.isInsideDropdown.set(false)
    this.closeSubject.next();
  }

  onProfileClick(): void {
    if (this.isDropdownPage()) {
      this.onTouchEnd();
      return;
    }

    this.isDropdownPage.set(true);
    this.isInsideDropdown.set(true);
    this.hoverSubject.next();
  }

  onTouchEnd(): void {
    setTimeout((): void => {
      this.isDropdownPage.set(false);
      this.isInsideDropdown.set(false);
      this.closeSubject.next();

      this.isTouchActive.set(false);
    }, 300);
  }
}
