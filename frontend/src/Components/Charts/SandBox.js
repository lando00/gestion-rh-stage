// app.js
import React, { useLayoutEffect, useRef } from "react";
import "./styles.css";
import * as am5 from "@amcharts/amcharts5";
import * as am5xy from "@amcharts/amcharts5/xy";
import am5themes_Animated from "@amcharts/amcharts5/themes/Animated";

export default function App(props) {
  const series1Ref = useRef(null);
  const series2Ref = useRef(null);
  const xAxisRef = useRef(null);

  // This code will only run one time
  useLayoutEffect(() => {
    let root = am5.Root.new("chartdiv");

    root.setThemes([am5themes_Animated.new(root)]);

    let chart = root.container.children.push(
      am5xy.XYChart.new(root, {
        panY: false,
        layout: root.verticalLayout
      })
    );

    // Create Y-axis
    let yAxis = chart.yAxes.push(
      am5xy.ValueAxis.new(root, {
        renderer: am5xy.AxisRendererY.new(root, {})
      })
    );

    // Create X-Axis
    let xAxis = chart.xAxes.push(
      am5xy.CategoryAxis.new(root, {
        renderer: am5xy.AxisRendererX.new(root, {}),
        categoryField: "category"
      })
    );

    // Create series
    let series1 = chart.series.push(
      am5xy.ColumnSeries.new(root, {
        name: "Series",
        xAxis: xAxis,
        yAxis: yAxis,
        valueYField: "value1",
        categoryXField: "category"
      })
    );

    let series2 = chart.series.push(
      am5xy.ColumnSeries.new(root, {
        name: "Series",
        xAxis: xAxis,
        yAxis: yAxis,
        valueYField: "value2",
        categoryXField: "category"
      })
    );

    // Add legend
    let legend = chart.children.push(am5.Legend.new(root, {}));
    legend.data.setAll(chart.series.values);

    // Add cursor
    chart.set("cursor", am5xy.XYCursor.new(root, {}));

    xAxisRef.current = xAxis;
    series1Ref.current = series1;
    series2Ref.current = series2;

    return () => {
      root.dispose();
    };
  }, []);

  // This code will only run when props.data changes
  useLayoutEffect(() => {
    xAxisRef.current.data.setAll(props.data);
    series1Ref.current.data.setAll(props.data);
    series2Ref.current.data.setAll(props.data);
  }, [props.data]);

  return <div id="chartdiv" style={{ width: "100%", height: "500px" }}></div>;
}

// index.js

import { StrictMode } from "react";
import ReactDOM from "react-dom";

import App from "./App";

let data = [
  {
    category: "Research",
    value1: 1000,
    value2: 588
  },
  {
    category: "Marketing",
    value1: 1200,
    value2: 1800
  },
  {
    category: "Sales",
    value1: 850,
    value2: 1230
  }
];

const rootElement = document.getElementById("root");
ReactDOM.render(
  <StrictMode>
    <App data={data} />
  </StrictMode>,
  rootElement
);
