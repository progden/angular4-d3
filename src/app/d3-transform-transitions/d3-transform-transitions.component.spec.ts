import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { D3TransformTransitionsComponent } from './d3-transform-transitions.component';

describe('D3TransformTransitionsComponent', () => {
  let component: D3TransformTransitionsComponent;
  let fixture: ComponentFixture<D3TransformTransitionsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ D3TransformTransitionsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(D3TransformTransitionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
