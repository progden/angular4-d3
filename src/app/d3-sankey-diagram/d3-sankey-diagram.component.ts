import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import * as d3 from 'd3';
import { sankey, sankeyLinkHorizontal } from 'd3-sankey';
import {DataService} from '../data-service.service';
import {Graph} from "../d3-force-dragging-i/model/Graph";

@Component({
  selector: 'app-d3-sankey-diagram',
  templateUrl: './d3-sankey-diagram.component.html',
  styleUrls: ['./d3-sankey-diagram.component.css'],
  providers: [DataService]
})
export class D3SankeyDiagramComponent implements OnInit {
  @ViewChild('container') private d3svg: ElementRef;

  constructor(private dataService: DataService) { }

  ngOnInit() {

    const svgElement = this.d3svg.nativeElement;
    const svg = d3.select(svgElement),
      width = +svg.attr("width"),
      height = +svg.attr("height");

    const formatNumber = d3.format(",.0f"),
      format = function(d) { return formatNumber(d) + " TWh"; },
      color = d3.scaleOrdinal(d3.schemeCategory10);

    const fnSankey = sankey()
      .nodeWidth(15)
      .nodePadding(10)
      .extent([[1, 1], [width - 1, height - 6]]);

    let link = svg.append("g")
      .attr("class", "links")
      .attr("fill", "none")
      .attr("stroke", "#000")
      .attr("stroke-opacity", 0.2)
      .selectAll("path");

    let node = svg.append("g")
      .attr("class", "nodes")
      .attr("font-family", "sans-serif")
      .attr("font-size", 10)
      .selectAll("g");

    this.dataService.getEnergy().then(function(energy: Graph) {

      fnSankey(energy);

      link = link
        .data(energy.links)
        .enter().append("path")
        .attr("d", sankeyLinkHorizontal())
        .attr("stroke-width", function(d) { return Math.max(1, d.width); });

      link.append("title")
        .text(function(d) { return d.source.name + " → " + d.target.name + "\n" + format(d.value); });

      node = node
        .data(energy.nodes)
        .enter().append("g");

      node.append("rect")
        .attr("x", function(d) { return d.x0; })
        .attr("y", function(d) { return d.y0; })
        .attr("height", function(d) { return d.y1 - d.y0; })
        .attr("width", function(d) { return d.x1 - d.x0; })
        .attr("fill", function(d) { return color(d.name.replace(/ .*/, "")); })
        .attr("stroke", "#000");

      node.append("text")
        .attr("x", function(d) { return d.x0 - 6; })
        .attr("y", function(d) { return (d.y1 + d.y0) / 2; })
        .attr("dy", "0.35em")
        .attr("text-anchor", "end")
        .text(function(d) { return d.name; })
        .filter(function(d) { return d.x0 < width / 2; })
        .attr("x", function(d) { return d.x1 + 6; })
        .attr("text-anchor", "start");

      node.append("title")
        .text(function(d) { return d.name + "\n" + format(d.value); });
    });
  }
}
