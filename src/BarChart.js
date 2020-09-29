import React, { useRef, useState, useEffect } from "react";
import { select, scaleLinear, scaleBand, axisLeft, axisBottom } from "d3";

function BarChart(props) {
  const d3Element = useRef(null);
  // const [dataset, setDataset] = useState([]);
  let dataset = [];

  const getDaysInMonth = (month, year) => {
    let date = new Date(year, month, 1);
    let days = [];

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

      if (itchLevelForDay.length !== 0) {
        itchLevel = itchLevelForDay[0].itchLevel;
      }

      days.push({ day: `${date_output}`, itch: itchLevel });
      date.setDate(date.getDate() + 1);
    }
    //setDataset(days);
    return days;
  };

  // const responsiveD3 = (svg) => {
  //   const resize = () => {
  //     const w = parseInt(container.style("width"));
  //     svg.attr("width", w);
  //     svg.attr("height", Math.round(w / aspect));
  //   };

  //   const container = select("#div-for-chart"),
  //     width = parseInt(svg.style("width"), 10),
  //     height = parseInt(svg.style("height"), 10),
  //     aspect = width / height;

  //   console.log(`Svg style width ${width}`);
  //   console.log(`Svg style height ${height}`);
  //   console.log(aspect);
  //   const svgwidth = +svg.attr("width");
  //   const svgheight = +svg.attr("height");

  //   console.log(`Svg attr width ${svgwidth}`);
  //   console.log(`Svg attr height ${svgheight}`);

  //   // set viewBox attribute to the initial size
  //   // control scaling with preserveAspectRatio
  //   // resize svg on inital page load
  //   //svg.attr("viewBox", `0 0 ${width} ${height}`);
  //   //  .attr("preserveAspectRatio", "xMinYMid")
  //   //  .call(resize);

  //   // add a listener so the chart will be resized
  //   // when the window resizes

  //   // select(window).on("resize." + container.attr("id"), resize);
  // };

  const renderD3 = (dataset) => {
    const svg = select(d3Element.current).attr("class", "d3-chart");
    // .call(responsiveD3);

    const width = parseInt(svg.style("width"), 10),
      height = parseInt(svg.style("height"), 10);

    svg.attr("viewBox", `0 0 ${width} ${height}`);

    svg.attr("width", width);
    svg.attr("height", height);

    // console.log(`in render Svg attr width ${width}`);
    // console.log(` in render Svg attr height ${height}`);

    const titleText = "Allergy Symptoms for the month";
    //const xAxisLabelText = "Days";
    const yAxisLabelText = "Itch Level";

    const margin = { top: 50, right: 20, bottom: 100, left: 60 };

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
      .attr("class", "axis-tick-text")
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
    dataset = getDaysInMonth(+yyyy_mm[1], +yyyy_mm[0]);
    renderD3(dataset);
    // Add an event listener that run the function when dimension change
    //  window.addEventListener("resize", renderD3(dataset));

    // // this will clean up the event every time the component is re-rendered
    // return () => {
    //   window.removeEventListener("resize", renderD3);
    // };
  }, [props]);

  return (
    <div id="div-for-chart" className="chart-container">
      <svg ref={d3Element}></svg>
    </div>
  );
}

export default BarChart;