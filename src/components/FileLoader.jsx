import React from "react";
import CSVReader from "react-csv-reader";

import Chart, {
  ArgumentAxis,
  CommonSeriesSettings,
  Legend,
  Series,
  Tooltip,
  ValueAxis,
  ConstantLine,
  Label,
  ZoomAndPan,
  Crosshair
} from "devextreme-react/chart";
import { SeriesTemplate } from "devextreme-react/range-selector";

import Button from "devextreme-react/button";

export default class FileLoader extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      selectedFiles: [],
      data: []
    };
    this.saveChartInstance = e => {
      this.chartInstance = e.component;
    };
    this.resetZoom = () => {
      this.chartInstance.resetVisualRange();
    };

    this.onCsvLoaded = this.onCsvLoaded.bind(this);
    this.onCsvError = this.onCsvError.bind(this);
    this.renderIncomeVsExpChart = this.renderIncomeVsExpChart.bind(this);
  }

  onCsvLoaded(e) {
    //console.log("onCsvLoaded", e);

    let data = this.mapKiwiBank(e).filter(x => x != null);

    this.setState({ data });
    console.log("data", data);
  }

  mapKiwiBank(data) {
    return data.map((row, i) => {
      if (i === 0) {
        return null;
      }
      return {
        sdate: row[0],
        date: Date.parse(row[0]),
        description: row[1],
        amount: parseFloat(row[3]),
        category: parseFloat(row[3]) > 0 ? "Income" : "Expense",
        inamount: parseFloat(row[3]) > 0 ? parseFloat(row[3]) : 0,
        outamount: parseFloat(row[3]) <= 0 ? parseFloat(row[3]) : 0
      };
    });
  }

  onCsvError(e) {
    console.log("onCsvError", e);
    this.setState({ data: null });
  }

  renderIncomeVsExpChart() {
    const { data } = this.state;
    if (data == null || data.length === 0) {
      return null;
    }
    return (
      <div>
        <Chart
          title={"Income Vs Expense"}
          dataSource={data}
          id={"chartIvE"}
          onInitialized={this.saveChartInstance}
        >
          <CommonSeriesSettings
            argumentField={"sdate"}
            valueField={"amount"}
            type={"stackedBar"}
            hoverMode={"allArgumentPoints"}
          >
            <Label visible={false} />
            <ArgumentAxis
              argumentType={"date"}
              aggregationInterval={"month"}
              valueMarginsEnabled={false}
            />
          </CommonSeriesSettings>
          <SeriesTemplate
            nameField={"category"}
            aggregationInterval={"month"}
            argumentType={"datetime"}
          />
          <ZoomAndPan
            valueAxis={"both"}
            argumentAxis={"both"}
            dragToZoom={true}
            allowMouseWheel={true}
            panKey={"shift"}
          />
          <Crosshair enabled={false}>
            <Label visible={true} />
          </Crosshair>
          <Legend visible={true} />
          <Tooltip enabled={true} shared={true} />
        </Chart>
        <Button
          id={"reset-zoom"}
          text={"Reset Zoom"}
          onClick={this.resetZoom}
        />
      </div>
    );
  }

  render() {
    return (
      <div>
        <CSVReader
          label="Select CSV File"
          onFileLoaded={this.onCsvLoaded}
          onError={this.onCsvError}
          inputId="FileId"
        />
        {this.renderIncomeVsExpChart()}
      </div>
    );
  }
}
