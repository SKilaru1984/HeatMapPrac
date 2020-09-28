import React, { Component } from 'react';
import './App.css';
import products from './products.json';
import $ from 'jquery';
import { process } from '@progress/kendo-data-query';
import { Grid, GridColumn } from '@progress/kendo-react-grid';
import { Tooltip } from '@progress/kendo-react-tooltip';
import '@progress/kendo-theme-default/dist/all.css';
class App extends Component {

  MyCustomCell = (props) => <CustomCell {...props} />
  constructor(props) {
    super(props);

    this.state = {
      gridDataState: {
        sort: [
          { field: "ProductName", dir: "asc" }
        ],
        page: { skip: 0, take: 20 }
      }
    }
  }
  render() {
    return (
      <div className="App">
        <h1>Hello KendoReact!</h1>
        <Tooltip openDelay={100} position="right" content={(props) => {

          return <TooltipContentTemplate title={props.title} data={products} />
        }} anchorElement="target">

          <Grid
            data={process(products, this.state.gridDataState)}
            pageable={true}
            sortable={true}
            {...this.state.gridDataState}

            style={{ height: "400px", width: "1200px" }}>
            <GridColumn width="400px" field="ProductName" title="Product Name" />
            <GridColumn
              field="UnitPrice"
              cell={this.MyCustomCell}
              title="Unit Price"
              width="400px"
            />
            <GridColumn field="UnitPrice" width="400px" title="Price" format="{0:c}" />
          </Grid>
        </Tooltip>
      </div>
    );
  }
}
class CustomCell extends React.Component {
  setBackgroudColor(columnValue, fieldName) {
    let colorValue = "purple";

    if (fieldName === "UnitPrice") {
      if (columnValue < 20) {
        colorValue = "red";
      }
    }
    return colorValue;
  }
  render() {
    const value = this.props.dataItem[this.props.field];

    const colorCode = this.setBackgroudColor(value, this.props.field);
    return (
      <td title={this.props.dataItem.ProductID} style={{ width: '100px', backgroundColor: colorCode }}></td>

    );
  }
}
class TooltipContentTemplate extends React.Component {
  render() {
    const id = this.props.title;
    const result = this.props.data.find(({ ProductID }) => ProductID == id);

    return (
      <React.Fragment>{
        result &&
        <div style={{ display: "flex", justifyContent: "flex-start", alignItems: "flex-start" }}>
          <div style={{
            display: "flex", flexDirection: "column",
            justifyContent: "flex-start", alignItems: "flex-start",
            wordBreak: "break-word"
          }}> A template for: <strong>{result.ProductName}</strong>
        A template for: <strong>{result.QuantityPerUnit}</strong></div>



          <div style={{ marginLeft: "15px" }}> <img height="100" width="100" alt={result.ProductName} src={
            result.imageUrl
          } /></div>
        </div>
      }
      </React.Fragment>
    );
  }
}
export default App;