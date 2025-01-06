import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CBDesignComponent } from './cbdesign.component';

describe('CBDesignComponent', () => {
  let component: CBDesignComponent;
  let fixture: ComponentFixture<CBDesignComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CBDesignComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CBDesignComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
