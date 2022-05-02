import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SoupGameComponent } from './soup-game.component';

describe('SoupGameComponent', () => {
  let component: SoupGameComponent;
  let fixture: ComponentFixture<SoupGameComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SoupGameComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SoupGameComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
