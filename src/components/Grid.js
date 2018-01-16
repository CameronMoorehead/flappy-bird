import React from 'react';

const GridCell = ({ cell }) => {
  const style = {
    width: 20,
    height: 20,
    backgroundColor: cell,
  }
  return (
    <div style={style}>
    </div>
  )
}

const GridRow = ({ row }) => {
  const style = {
    display: 'flex'
  }
  return (
    <div style={style}>
      {
        row.map(cell => {
          return <GridCell cell={cell} />
        })
      }
    </div>
  )
}

const Grid = ({ grid }) => {
  return (
    <div>
      {
        grid.map(row => {
          return <GridRow row={row} />
        })
      }
    </div>
  )
}

export default Grid;
