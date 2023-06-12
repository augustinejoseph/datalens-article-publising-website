import React from 'react'
import "./HomeCategoryList.css"
import Button from '../SmallComponents/Button'

const HomeCategoryList = () => {
    const style = {
        margin: "0px 0px 0px 50px",
        cursor :"pointer",
        backgroundColor: "grey",
        color : "white",
        padding : "1px 15px 1px 15px",
        borderRadius : "20px"
    }
  return (
    <div className='homecategory_container'>

            <Button className="homecategory_single_category" style ={style}  data={{data : "Vehicles"}} />
            <Button className="homecategory_single_category" style ={style} data={{data : "Cosing"}} />
            <Button className="homecategory_single_category" style ={style} data={{data : "Technology"}} />
            <Button className="homecategory_single_category" style ={style} data={{data : "Art"}} />
            <Button className="homecategory_single_category" style ={style} data={{data : "Art"}} />
            <Button className="homecategory_single_category" style ={style} data={{data : "Art"}} />
            <Button className="homecategory_single_category" style ={style} data={{data : "Art"}} />
            <Button className="homecategory_single_category" style ={style} data={{data : "Art"}} />
            <Button className="homecategory_single_category" style ={style} data={{data : "Art"}} />
            <Button className="homecategory_single_category" style ={style} data={{data : "Art"}} />
            <Button className="homecategory_single_category" style ={style} data={{data : "Art"}} />
            <Button className="homecategory_single_category" style ={style} data={{data : "Art"}} />
            <Button className="homecategory_single_category" style ={style} data={{data : "Art"}} />
            <Button className="homecategory_single_category" style ={style} data={{data : "Art"}} />
            <Button className="homecategory_single_category" style ={style} data={{data : "Art"}} />
            <Button className="homecategory_single_category" style ={style} data={{data : "Art"}} />
            <Button className="homecategory_single_category" style ={style} data={{data : "Art"}} />
            <Button className="homecategory_single_category" style ={style} data={{data : "Art"}} />
            <Button className="homecategory_single_category" style ={style} data={{data : "Art"}} />
            <Button className="homecategory_single_category" style ={style} data={{data : "Art"}} />
            <Button className="homecategory_single_category" style ={style} data={{data : "Art"}} />
            <Button className="homecategory_single_category" style ={style} data={{data : "Cosing"}} />
            <Button className="homecategory_single_category" style ={style} data={{data : "Cosing"}} />
            <Button className="homecategory_single_category" style ={style} data={{data : "Cosing"}} />


            {/* <button className="homecategory_single_category">Coding</button>
            <button className="homecategory_single_category" >Coding</button>
            <button className="homecategory_single_category" >Coding</button>
            <button className="homecategory_single_category" >Coding</button>
            <button className="homecategory_single_category" >Coding</button> */}
        </div>

  )
}

export default HomeCategoryList
