import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import * as d3 from 'd3';
import {DataService} from '../data-service.service';
import {Graph} from './model/Graph';

@Component({
  selector: 'app-d3-force-dragging-i',
  templateUrl: './d3-force-dragging-i.component.html',
  styleUrls: ['./d3-force-dragging-i.component.css'],
  providers: [DataService]
})
export class D3ForceDraggingIComponent implements OnInit {

  @ViewChild('container') private d3svg: ElementRef;
  svg: any;

  // data
  link: any;
  node: any;

  // d3 force simulation
  simulation: any;

  constructor(private dataService: DataService) { }

  ngOnInit() {
    const svgElement = this.d3svg.nativeElement;
    this.svg = d3.select(svgElement);
    const width = this.svg.attr('width');
    const height = this.svg.attr('height');
    this.simulation = d3.forceSimulation()
      .force('link', d3.forceLink().id(function(d) { return d.id; }))
      .force('charge', d3.forceManyBody())
      .force('center', d3.forceCenter(width / 2, height / 2));

    const that = this; // 給 callback 用的 this object reference
    this.dataService.getMiserable()
      .then(function(graph: Graph) {
        function ticked() {
          that.link
            .attr('x1', function (d) {return d.source.x; })
            .attr('y1', function (d) {return d.source.y; })
            .attr('x2', function (d) {return d.target.x; })
            .attr('y2', function (d) {return d.target.y; });
          that.node
            .attr('cx', function (d) {return d.x; })
            .attr('cy', function (d) {return d.y; });
        }
        function dragstarted(d) {
          if (!d3.event.active) {
            that.simulation.alphaTarget(0.3).restart();
          }
          d.fx = d.x;
          d.fy = d.y;
        }
        function dragged(d) {
          d.fx = d3.event.x;
          d.fy = d3.event.y;
        }

        function dragended(d) {
          if (!d3.event.active) {
            that.simulation.alphaTarget(0);
          }
          d.fx = null;
          d.fy = null;
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
              .on('start', dragstarted)
              .on('drag', dragged)
              .on('end', dragended))
          // .enter().append("text")
          //   .attr("x", function(d) { return d.x; })
          //   .attr("y", function(d) { return d.y; })
          //   .attr("text-anchor", "end")
          //   .text(function(d) { return d.name; })
          ;
        that.node.append('title')
          .text(function(d) { return d.id; });
        that.simulation
          .nodes(graph.nodes)
          .on('tick', ticked);
        that.simulation.force('link')
          .links(graph.links);
      });
  }
}
