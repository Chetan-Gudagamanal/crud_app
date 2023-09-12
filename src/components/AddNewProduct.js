import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import { useState } from 'react';
import { useNavigate } from "react-router-dom"

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

export default function AddNewProduct({fetchAllProductData}) {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const navigate = useNavigate();

  const [inputs, setInputs] = useState({});

  const handleChange = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setInputs(values => ({...values, [name]: value}))
  }
  const handleSubmit = (event) => {
    event.preventDefault();
    // alert(inputs);
    const addNewProduct=async()=>{
        const url="http://localhost:3001/add_product"
        const rawData=await fetch(url,{
            method:"POST",
            headers: {
                "Content-Type": "application/json",
                "x-auth-token": `${localStorage.getItem("x-auth-token")}`
            },
            body: JSON.stringify(inputs)
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
    addNewProduct()
    handleClose()
  }

  return (
    <div>
        <br/>
      <Button variant="contained" onClick={handleOpen}>Add New Product</Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <form onSubmit={handleSubmit}>
            <label>Enter Product name:
            <input 
                type="text" 
                name="productName" 
                value={inputs.productName || ""} 
                onChange={handleChange}
            />
            </label>
            <label>Enter Product Description:
                <input 
                type="text" 
                name="productDesc" 
                value={inputs.productDesc || ""} 
                onChange={handleChange}
                />
            </label>
            <input type="submit" />
          </form>
        </Box>
      </Modal>
    </div>
  );
}