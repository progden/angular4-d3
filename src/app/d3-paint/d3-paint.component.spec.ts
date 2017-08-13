import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { D3PaintComponent } from './d3-paint.component';

describe('D3PaintComponent', () => {
  let component: D3PaintComponent;
  let fixture: ComponentFixture<D3PaintComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ D3PaintComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(D3PaintComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
