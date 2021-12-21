import "./featuredInfo.css";
import { ArrowDownward, ArrowUpward } from "@material-ui/icons";
import { useEffect, useState } from "react";
import {userRequest} from "../../axios/requestMethods";

export default function FeaturedInfo() {

  const [income, setIncome] = useState([]);
  const [percentage, setPercentage] = useState(0);

  useEffect(() => {
    const getIncome = async() => {
      try{
        const res = await userRequest.get("orders/income");
        setIncome(res.data);
        setPercentage(((res.data[0].total*100) / res.data[0].total) -100);
      }
      catch{}
    }
    getIncome();
  }, []);

// console.log("income: ", income);
// console.log("percentage: ", percentage);


  return (
    <div className="featured">
      <div className="featuredItem">
        <span className="featuredTitle">Revenue</span>
        <div className="featuredMoneyContainer">
          <span className="featuredMoney"> ₹ {income[1]?.total} </span>
          <span className="featuredMoneyRate">
            {Math.floor(percentage)} % {percentage<0 ? <ArrowDownward  className="featuredIcon negative"/> : <ArrowUpward className="featuredIcon"/> }
            
          </span>
        </div>
        <span className="featuredSub">Compared to last month</span>
      </div>
      <div className="featuredItem">
        <span className="featuredTitle">Sales</span>
        <div className="featuredMoneyContainer">
          <span className="featuredMoney">
            ₹ {
              income.reduce((sum, curr) => sum + curr.total , 0)
            } 
          </span>
        </div>
        <span className="featuredSub">Till date total</span>
      </div>
      
    </div>
  );
}
