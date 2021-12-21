import React, {useState, useEffect, useMemo} from 'react';
import Chart from '../../adminComponents/chart/Chart';
import  {userRequest}  from "../../axios/requestMethods";
import "./analytics.css";

const Analytics = () => {

  const [userStats, setUserStats] = useState([]);

  const MONTHS = useMemo(() => [
    "Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec",
  ], []);

  useEffect(() => {
    const getStats = async() => {
      try{
        const res = await userRequest.get("/users/stats");
        res.data.map((item) => 
          setUserStats(prev => [
            ...prev, 
            {
              name: MONTHS[item._id - 1],
              "Active User": item.total
            }
          ])
        )
      }
      catch{}
    }
    getStats();
  }, [MONTHS]);


    return (
        <div className='analytics'>
            <Chart data={userStats} title="User Analytics" grid dataKey="Active User"/>
        </div>
    )
}

export default Analytics
