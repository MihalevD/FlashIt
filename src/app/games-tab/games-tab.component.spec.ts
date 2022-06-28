import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GamesTabComponent } from './games-tab.component';

describe('GamesTabComponent', () => {
  let component: GamesTabComponent;
  let fixture: ComponentFixture<GamesTabComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GamesTabComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GamesTabComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
