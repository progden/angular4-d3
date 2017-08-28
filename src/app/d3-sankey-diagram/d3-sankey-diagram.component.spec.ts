import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { D3SankeyDiagramComponent } from './d3-sankey-diagram.component';

describe('D3SankeyDiagramComponent', () => {
  let component: D3SankeyDiagramComponent;
  let fixture: ComponentFixture<D3SankeyDiagramComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ D3SankeyDiagramComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(D3SankeyDiagramComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
