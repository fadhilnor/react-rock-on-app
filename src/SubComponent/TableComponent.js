import React, { Component } from 'react';
import MaterialTable from 'material-table';

let table_width = {
  margin: '20px 10px 50px 25px',
};

class TableComponent extends Component {
  render() {
    return (
      <MaterialTable
        title=""
        style={table_width}
        columns={this.props.columns}
        data={this.props.data}
        options={{
          headerStyle: {
            backgroundColor: '#01579b',
            color: '#FFF',
          },
        }}
      />
    );
  }
}

export default TableComponent;
