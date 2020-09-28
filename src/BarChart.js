import React, { useRef, useEffect } from "react";
import { select, scaleLinear, scaleBand, axisLeft, axisBottom } from "d3";

function BarChart(props) {
  const d3Element = useRef(null);

  const getDaysInMonth = (month, year) => {
    var date = new Date(year, month, 1);
    var days = [];
   

    while (date.getMonth() === month) {
      let dd = date.getDate();
      let date_output = month + "-" + dd + "-" + year;
      let dd1, month1;
      let itchLevel = 0;

      dd1 = dd;
      if (dd < 10) {
        dd1 = "0" + dd;
      }

      month1 = month;
      if (month < 10) {
        month1 = "0" + month;
      }
      let date_yyyy_mm_dd = year + "-" + month1 + "-" + dd1;

      let itchLevelForDay = props.graphData.filter(
        (graph) => graph.date === date_yyyy_mm_dd
      );
    
  
      if (itchLevelForDay.length !=0) {
        itchLevel = itchLevelForDay[0].itchLevel;
      }
      

      
      // itchLevel = itchLevelForDay.map((itch) => {
      //   console.log(itch);
      //   return itch.itchLevel});

      days.push({ day: `${date_output}`, itch: itchLevel });
      date.setDate(date.getDate() + 1);
    }

    console.log(days);
    return days;
  };

  const renderD3 = (dataset) => {
    const svg = select(d3Element.current);
    //  .attr("class", "chart-svg-component");
    //  .attr("viewBox", "0 0 800 500");

    const titleText = "Allergy Symptoms for the month";
    const xAxisLabelText = "Days";
    const yAxisLabelText = "Itch Level";

    const width = +svg.attr("width");
    const height = +svg.attr("height");

    const margin = { top: 50, right: 20, bottom: 100, left: 80 };

    const innerWidth = width - margin.left - margin.right;
    const innerHeight = height - margin.top - margin.bottom;

    const xValue = (d) => d.day;
    const yValue = (d) => d.itch;

    const xScale = scaleBand()
      .domain(dataset.map(xValue))
      .range([0, innerWidth])
      .padding(0.4);

    const yScale = scaleLinear().domain([10, 0]).range([0, innerHeight]);

    const xAxis = axisBottom(xScale);
    const yAxis = axisLeft(yScale);

    const g = svg
      .append("g")
      .attr("transform", `translate(${margin.left},${margin.top})`);

    const xAxisG = g
      .append("g")
      .call(xAxis)
      .attr("transform", `translate(0,${innerHeight})`);

    xAxisG
      .selectAll("text")
      .style("text-anchor", "end")
      .attr("dx", "-.8em")
      .attr("dy", ".15em")
      .attr("transform", function (d) {
        return "rotate(-65)";
      });
    // xAxisG
    //   .append("text")
    //   .attr("class", "axis-label")
    //   .attr("y", 85)
    //   .attr("x", innerWidth / 2)
    //   .attr("fill", "black")
    //   .text(xAxisLabelText);

    const yAxisG = g.append("g").call(yAxis);
    yAxisG
      .append("text")
      .attr("class", "axis-label")
      .attr("y", -40)
      .attr("x", -innerHeight / 2)
      .attr("fill", "black")
      .text(yAxisLabelText)
      .attr("transform", "rotate(-90)");

    g.selectAll("rect")
      .data(dataset)
      .enter()
      .append("rect")
      .attr("x", (d) => xScale(xValue(d)))
      .attr("y", (d) => yScale(yValue(d)))
      .attr("width", xScale.bandwidth())
      .attr("height", (d) => innerHeight - yScale(yValue(d)))
      .attr("fill", "#9D6C19");

    g.append("text")
      .attr("class", "d3-title")
      .attr("x", 100)
      .attr("y", -20)
      .text(titleText);
  };

  useEffect(() => {
    let yyyy_mm = props.date_yyyy_mm.split("-");
    console.log(typeof props.date_yyyy_mm);
    console.log(yyyy_mm);
    console.log(props.graphData);
    const dataset = getDaysInMonth(+yyyy_mm[1], +yyyy_mm[0]);
    renderD3(dataset);
  });

  return (
    <div className="d3-chart">
      <svg ref={d3Element} width="850" height="500"></svg>
    </div>
  );
}

export default BarChart;
