import { Button, Container } from '@mui/material';
import * as React from 'react';
// import { Container } from '@material-ui/core';
import { experimentalStyled as styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';

const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#e5d0ff',
    ...theme.typography.body2,
    padding: theme.spacing(2),
    textAlign: 'center',
    color: theme.palette.text.secondary,
  }));

export default function DisplayAllProducts({inputData,fetchAllProductData}) {
  let rows=[]
  for(let ele of inputData){
    const obj={...ele,id:ele._id}
    rows.push(obj)
  }
  const handleDeleteProduct=(id)=>{
    // alert(id)
    async function deleteSelectedProduct(){
        fetch(`http://localhost:3001/product/${id}/`, {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            "x-auth-token": `${localStorage.getItem("x-auth-token")}`
        }
        })
        .then((res) => res.json())
        .then((res) => {
            console.log(res)
            fetchAllProductData();
        });
    }
    deleteSelectedProduct()
  }
  return (
    <Container>
      <br/>
      {/* <div style={{ height: 400, width: '100%' ,background:"#918d89", color:"#575149"}}> */}
      <Box sx={{ flexGrow: 1 }}>
      <Grid container spacing={{ xs: 2, md: 3 }} columns={{ xs: 4, sm: 8, md: 12 }}>
       {rows?.map((product,index)=>{
        return(
            <Grid item xs={2} sm={4} md={4} key={index}>
                <Item>{product.id}</Item>
                <Item>{product.productName}</Item>
                <Item>{product.productDesc}</Item>
                <Button color='secondary' onClick={()=>{handleDeleteProduct(product.id)}}>Delete This Product</Button>
            </Grid>
            
        )
       })}
       </Grid>
      
      </Box>
    </Container>
  );
}