import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import DisplayAllProducts from "./DisplayAllProducts"
import AddNewProduct from "./AddNewProduct";

export default function ProductPage(){
    const [productData,setProductData]=useState([])
    // const history= useHistory()
    const navigate = useNavigate();
    
    //To Check weather user is authorized
    useEffect(()=>{
        const checkAuthorized=async()=>{
            const url="http://localhost:3001/check_authorized"
            const rawData=await fetch(url,{
                method:"GET",
                headers: {
                    "Content-Type": "application/json",
                    "x-auth-token": `${localStorage.getItem("x-auth-token")}`
                }
            })
            if(rawData.status==200){
                console.log("success");
                fetchAllProductData()
            }else{
                const jsonData=await rawData.json()
                if(jsonData=="JsonWebTokenError"){
                    navigate("/")
                    alert("Your Session has been Expired, Kindly Login again")
                }  
            }
        }
        checkAuthorized()
    },[])
    async function fetchAllProductData(){
        fetch("http://localhost:3001/all_products", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            "x-auth-token": `${localStorage.getItem("x-auth-token")}`
        }
        })
        .then((res) => res.json())
        .then((res) => {
            console.log(res)
            setProductData(res);
        });
    }
    return(
        <>
            <AddNewProduct fetchAllProductData={fetchAllProductData}/>
            <DisplayAllProducts inputData={productData} fetchAllProductData={fetchAllProductData}/>
        </>
    )
}