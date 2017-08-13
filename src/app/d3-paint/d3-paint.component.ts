import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import * as d3 from 'd3';

@Component({
  selector: 'app-d3-paint',
  templateUrl: './d3-paint.component.html',
  styleUrls: ['./d3-paint.component.css']
})
export class D3PaintComponent implements OnInit {
  @ViewChild('container') private d3Container: ElementRef;
  svg: any;
  width: any;
  height: any;
  link: any;
  node: any;
  simulation: any;
  that: any;
  constructor() { }

  ngOnInit() {
    const element = this.d3Container.nativeElement;
    this.svg = d3.select(element).append('svg')
      .attr('width', 800)
      .attr('height', 600);
    this.width = this.svg.attr('width');
    this.height = this.svg.attr('height');
    this.simulation = d3.forceSimulation()
      .force('link', d3.forceLink().id(function(d) { return d.id; }))
      .force('charge', d3.forceManyBody())
      .force('center', d3.forceCenter(this.width / 2, this.height / 2));
    this.that = this;
    const that = this;
    d3.json('assets/miserable.json', function(error, graph) {
      if (error) {
        throw error;
      }
      that.link = that.svg.append('g')
        .attr('class', 'links')
        .selectAll('line')
        .data(graph.links)
        .enter().append('line')
            .attr('class', 'link');
      that.node = that.svg.append('g')
        .attr('class', 'nodes')
        .selectAll('circle')
        .data(graph.nodes)
        .enter().append('circle')
          .attr('class', 'node')
          .attr('r', 2.5)
          .call(d3.drag()
            .on('start', function (d) {
              that.dragstarted(that, d);
            })
            .on('drag',  function (d) {
              that.dragged(that, d);
            })
            .on('end',  function (d) {
              that.dragended(that, d);
            }));
      that.node.append('title')
        .text(function(d) { return d.id; });
      that.simulation
        .nodes(graph.nodes)
        .on('tick', function(){
          that.ticked(that);
        });
      that.simulation.force('link')
        .links(graph.links);
    });
  }

  ticked(that: D3PaintComponent) {
    that.link
      .attr('x1', function (d) {return d.source.x; })
      .attr('y1', function (d) {return d.source.y; })
      .attr('x2', function (d) {return d.target.x; })
      .attr('y2', function (d) {return d.target.y; });
    that.node
      .attr('cx', function (d) {return d.x; })
      .attr('cy', function (d) {return d.y; });
  }
  dragstarted(that: D3PaintComponent, d) {
    if (!d3.event.active) {
      that.simulation.alphaTarget(0.3).restart();
    }
    d.fx = d.x;
    d.fy = d.y;
  }
  dragged(that: D3PaintComponent, d) {
    d.fx = d3.event.x;
    d.fy = d3.event.y;
  }

  dragended(that: D3PaintComponent, d) {
    if (!d3.event.active) {
      that.simulation.alphaTarget(0);
    }
    d.fx = null;
    d.fy = null;
  }
}
