import React from 'react'
import { PieChart, Pie, Cell } from 'recharts'
import Item from './Item'

function toNumber(value) {
  if (value) {
    return parseFloat(value)
  }
  return 0
}

const COLORS = ['#00C49F', '#0088FE', '#FF8042', '#FFBB28'];

const RADIAN = Math.PI / 180;
const renderCustomizedLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent, index }) => {
  const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
  const x = cx + radius * Math.cos(-midAngle * RADIAN);
  const y = cy + radius * Math.sin(-midAngle * RADIAN);

  return (
      <text x={ x } y={ y } fill="white" textAnchor={ x > cx ? 'start' : 'end' } dominantBaseline="central">
        { `${(percent * 100).toFixed(0)}%` }
      </text>
  );
};

export default ({ data, ...rest }) => {
  const items = [
    {
      name: 'FreeMemory',
      value: toNumber(data['FreeMemory (Not Formatted)'])
    },
    {
      name: 'Inactive Memory',
      value: toNumber(data['InactiveMemory (Not Formatted)'])
    },
    {
      name: 'Wired Memory',
      value: toNumber(data['WiredMemory (Not Formatted)'])
    },
    {
      name: 'Purgable Memory',
      value: toNumber(data['PurgableMemory (Not Formatted)'])
    }
  ]

  return (<section className="bordered" { ...rest }>
    <h3 style={ { color: '#d6dae1' } }>Memory</h3>
    <div className="control">
      <div className="control-rendered">
        { items.map((looper, idx) => <Item key={ idx } { ...looper } />) }
        <br />
        <PieChart width={ 400 } height={ 120 }>
          <Pie data={ items }
               dataKey="value"
               nameKey="name"
               labelLine={ false }
               cx="50%" cy="50%" outerRadius={ 50 } fill="#8884d8"
               label={ renderCustomizedLabel }
          >
            {
              items.map((entry, index) => <Cell key={index} fill={ COLORS[index % COLORS.length] } />)
            }
          </Pie>
        </PieChart>
      </div>
    </div>
  </section>)
}
