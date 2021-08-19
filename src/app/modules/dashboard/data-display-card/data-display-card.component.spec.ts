import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AppModule } from '../../../app.module';
import { DataDisplayCardComponent } from './data-display-card.component';

describe('DataDisplayCardComponent', () => {
  let component: DataDisplayCardComponent;
  let fixture: ComponentFixture<DataDisplayCardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [AppModule]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DataDisplayCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
