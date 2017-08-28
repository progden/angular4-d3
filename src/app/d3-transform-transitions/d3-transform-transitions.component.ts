import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import * as d3 from 'd3';

@Component({
  selector: 'app-d3-transform-transitions',
  templateUrl: './d3-transform-transitions.component.html',
  styleUrls: ['./d3-transform-transitions.component.css']
})
export class D3TransformTransitionsComponent implements OnInit {
  @ViewChild('container') private d3svg: ElementRef;

  constructor() { }

  ngOnInit() {
    const w = 960,
      h = 500,
      z = 20,
      x = w / z,
      y = h / z;

    const svgElement = this.d3svg.nativeElement;
    const svg = d3.select(svgElement)
      .attr("width", w)
      .attr("height", h);

    svg.selectAll("rect")
      .data(d3.range(x * y))
      .enter().append("rect")
      .attr("transform", translate)
      .attr("width", z)
      .attr("height", z)
      .style("fill", function(d) { return d3.hsl(d % x / x * 360, 1, Math.floor(d / x) / y); })
      .on("mouseover", mouseover);

    function translate(d) {
      return "translate(" + (d % x) * z + "," + Math.floor(d / x) * z + ")";
    }

    function mouseover(d) {
      this.parentNode.appendChild(this);

      d3.select(this)
        .style("pointer-events", "none")
        .transition()
        .duration(750)
        .attr("transform", "translate(480,480)scale(23)rotate(180)")
        .transition()
        .delay(1500)
        .attr("transform", "translate(240,240)scale(0)")
        .style("fill-opacity", 0)
        .remove();
    }
  }

}
