import React from 'react'
import { Link }from "react-router-dom";

import { KeyboardBackspace } from '@material-ui/icons/';

import { TextField, Button , Grid} from "@material-ui/core" 

import  { stylePage } from "../styles";  

export default function Register(){
     const classes = stylePage();
    
    return(
        <Grid container 
              direction="column" 
              justify="center"  
              alignItems="center" 
              style={{color:"white"}}
              spacing={2}
              >
        <Grid item> 
            <h1 className={classes.logo}>SINGME</h1>
        </Grid>
        <Grid item> 
            <h2 >Preencha os dados para realizar seu cadastro</h2>
        </Grid>

            <form>
        <Grid container style={{maxWidth:500}}> 
            <Grid item xs={12}>
                <TextField
                    className={classes.input}
                    fullWidth
                    id="name"
                    variant="outlined"
                    name="name"
                    size="small"
                    placeholder="Nome"
                />
             </Grid>
             <Grid item xs={12}>
                <TextField
                    className={classes.input}
                    fullWidth
                    id="email"
                    size="small"
                    variant="outlined"
                    name="email"
                    placeholder="E-mail"
                />
             </Grid>
             <Grid item xs={12}>
             <TextField
                    className={classes.input}
                    fullWidth
                    id="whatsapp"
                    size="small"
                    variant="outlined"
                    name="Whatsapp"
                    placeholder="whatsapp"
                />
             </Grid>
             <Grid item xs={12}>
             <TextField
                    className={classes.input}
                    fullWidth
                    id="city"
                    size="small"
                    variant="outlined"
                    name="city"
                    placeholder="Cidade"
                />
             </Grid>
             <Grid item xs={12}>
             <TextField
                    className={classes.input}
                    fullWidth
                    id="uf"
                    size="small"
                    variant="outlined"
                    name="uf"
                    placeholder="UF"
                />
             </Grid>
             <Grid item xs={12}>
             <Button 
                    className={classes.button}
                    variant="contained" 
                    color="primary" 
                    fullWidth>
                    Cadastrar
                </Button>
             </Grid>   
            </Grid>
            <Grid item xs={6}>
                <Link to="/" className={classes.link} >
                    <Button className={classes.link} 
                            startIcon={<KeyboardBackspace />}>Retornar</Button> 
                </Link>
            </Grid>
        </form>   
        </Grid>
    );
}