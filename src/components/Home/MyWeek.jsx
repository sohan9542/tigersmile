import React from 'react';
import { PieChart, Pie, Cell, } from 'recharts';

const data = [
  { name: 'Group A', value: 400 },
  { name: 'Group B', value: 300 },
  { name: 'Group C', value: 300 },
  { name: 'Group D', value: 200 },
];
const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];
const MyWeek = () => {
  return (
 <div className='w-full flex flex-col items-center'>
    <h1 className='text-[26px] font-semibold text-center'>My Week</h1>
      <div >
      <PieChart width={200} height={200} >
        <Pie
          data={data}
          cx={100}
          cy={100}
          innerRadius={60}
          outerRadius={80}
          fill="#8884d8"
          paddingAngle={5}
          dataKey="value"
        >
          {data.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
          ))}
        </Pie>
    
      </PieChart>
      </div>
 </div>
  )
}

export default MyWeek