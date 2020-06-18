import React, { useEffect, useState } from 'react';
import Header from './Header';
import api from './Api';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import DeleteIcon from '@material-ui/icons/Delete';
import CreateIcon from '@material-ui/icons/Create';
import Switch from '@material-ui/core/Switch';
import {Dialog,DialogActions,TextField,DialogContentText,DialogContent,DialogTitle, MenuItem} from '@material-ui/core';

function ListaPage() { 

    const [ carros, setCarros ] = useState([]);
    const [ open , setOpen ] = useState(false);
    const [ openUpdate , setOpenUpdate ] = useState(false);

    const [ cor, setCor ] = useState('');
    const [ modelo, setModelo ] = useState('');
    const [ placa, setPlaca ] = useState('');
    const [ id, setId ] = useState();
    

    async function loadData() { 

       const response = await api.get('/');
            const carros = response.data;
            setCarros(carros);
    }

    useEffect(loadData, []);

    function openDialog() { 
        setOpen(true);
    }

     function closeDialog() {
        setOpen(false);
    }

    
     function openDialogUpdate(cor,modelo,placa,id)
    {
        setCor(cor);
        setModelo(modelo);
        setPlaca(placa);
        setId(id);


        setOpenUpdate(true);
    }

    function closeDialogUpdate()
    {
        setOpenUpdate(false);
    }

     async function salvar() { 

        await api.post('/', { cor, modelo, placa }); 
        loadData();
        closeDialog();

        setCor('');
        setModelo('');
        setPlaca('');
    }

    async function salvarUpdate() { 
        await api.put(`/${id}`, {id, cor, modelo, placa });
          
        loadData();
        closeDialogUpdate();

        setCor('');
        setModelo('');
        setPlaca('');
        setId();
    }


      async function apagar(id) {
        await api.delete(`/carros/${id}`);
        loadData();
    }

    return <div style={{marginTop: '70px'}}>
        <Header/>
        <TableContainer component={Paper}>
      <Table  aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Id</TableCell>
            <TableCell align="center">Cor</TableCell>
            <TableCell align="center">Modelo</TableCell>
            <TableCell align="center">Placa</TableCell>
            <TableCell align="center"></TableCell>
            <TableCell align="center"></TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {carros.map(item => (
            <TableRow key={item.id}>
              <TableCell component="th" scope="row">
                {item.id}
              </TableCell>
              <TableCell align="center">{item.cor}</TableCell>
              <TableCell align="center">{item.modelo}</TableCell>
              <TableCell align="center">{item.placa}</TableCell>
              <TableCell align="center" style={{width: '15px'}}>  <Button variant="outlined" color="primary" onClick={() => openDialogUpdate(item.cor,item.modelo,item.placa,item.id)}>  <CreateIcon /> &nbsp;Editar </Button> </TableCell>
              <TableCell align="center" style={{width: '15px'}}>  <Button variant="outlined" color="secondary" onClick={() => apagar(item.id)}> <DeleteIcon /> &nbsp;Apagar </Button> </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>

    <Button  style={{marginTop: '20px'}}
        onClick={openDialog}
        variant="contained" 
        color="primary">
            Adicionar
    </Button>

    <Dialog open ={open}>
         <DialogTitle>Novo Carro</DialogTitle>
            <DialogContent>
                <DialogContentText>Preencha os dados.</DialogContentText>
                <TextField
                    margin="dense"
                    id="cor"
                    label="Cor"
                    type="text"
                    fullWidth
                    onChange={e => setCor(e.target.value)}
                />
                <TextField
                    margin="dense"
                    id="modelo"
                    label="Modelo"
                    type="text"
                    fullWidth
                    onChange={e => setModelo(e.target.value)}
                />
                 <TextField
                    margin="dense"
                    id="placa"
                    label="Placa"
                    type="text"
                    fullWidth
                    onChange={e => setPlaca(e.target.value)}
                />
                
            </DialogContent>
            <DialogActions>
                <Button onClick={closeDialog}>Cancelar</Button>
                <Button onClick={salvar}>Salvar</Button>
            </DialogActions>
    </Dialog>

    <Dialog open ={openUpdate}>
         <DialogTitle>Atualizar Carro</DialogTitle>
            <DialogContent>
                <DialogContentText>Preencha os dados.</DialogContentText>
                <TextField
                    margin="dense"
                    id="cor"
                    label="Cor"
                    type="text"
                    value={cor}
                    fullWidth
                    onChange={e => setCor(e.target.value)}
                />
                <TextField
                    margin="dense"
                    id="modelo"
                    label="Modelo"
                    type="text"
                    value={modelo}
                    fullWidth
                    onChange={e => setModelo(e.target.value)}
                />
                 <TextField
                    margin="dense"
                    id="placa"
                    label="Placa"
                    type="text"
                    value={placa}
                    fullWidth
                    onChange={e => setPlaca(e.target.value)}
                />
                
            </DialogContent>
            <DialogActions>
                <Button onClick={closeDialogUpdate}>Cancelar</Button>
                <Button onClick={salvarUpdate}>Salvar</Button>
            </DialogActions>
    </Dialog>
    
        </div>
    
  
}
export default ListaPage;