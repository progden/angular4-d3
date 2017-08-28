import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { D3ForceDraggingIComponent } from './d3-force-dragging-i.component';

describe('D3ForceDraggingIComponent', () => {
  let component: D3ForceDraggingIComponent;
  let fixture: ComponentFixture<D3ForceDraggingIComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ D3ForceDraggingIComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(D3ForceDraggingIComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
