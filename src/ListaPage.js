import React, { useState, useMemo } from 'react';
import Header from './Header';
import api from './api';
import { Table, TableRow, TableCell, Button, Dialog, DialogTitle, DialogContent, DialogActions, TextField } from '@material-ui/core';
import DeleteIcon from '@material-ui/icons/Delete';

function ListaPage() { 

    const [ carros, setCarros ] = useState([]);
    const [ cor, setCor ] = useState('');
    const [ open, setOpen ] = useState(false);
    const [ modelo, setModelo ] = useState(0);
    const [ placa, setPlaca ] = useState('');
    const [ id, setId ] = useState(0);
    

    async function loadData() { 

       const response = await api.get('/carros');
            const carros = response.data;
            setCarros(carros);
    }

    useMemo(loadData, []);

    function openDialog() { 
        setOpen(true);
    }

     function closeDialog() {
        setOpen(false);
    }

    async function salvar() { 
        if(id === 0) {
        await api.post('/carros', { cor, modelo, placa }); 
        }
        else {
             await api.put(`/carros/${id}`, { cor, modelo, placa });
        }

        loadData();
        setCor('');
        setModelo();
        setPlaca('');
        setId(0);
        closeDialog();
    }

      async function apagar(id) {
        await api.delete(`/carros/${id}`);
        loadData();
    }

    async function editar(carros) {
        setCor(carros.cor);
        setModelo(carros.modelo);
        setPlaca(carros.placa);
        setId(carros.id);
        openDialog();
    }

  return (
        <>
            <Header />
            <Table style={{ marginTop: '80px' }}>

                {
                carros.map(carro => (
                    <TableRow>
                        <TableCell>{carro.id}</TableCell>
                        <TableCell>{carro.cor}</TableCell>
                        <TableCell>{carro.modelo}</TableCell>
                        <TableCell>{carro.placa}</TableCell>
                         <TableCell>
                             <Button variant="outlined"
                                    color="secondary"
                                    size="small"
                                    onClick={() => apagar(carro.id)}>
                                    <DeleteIcon />Apagar
                                    </Button>
                         </TableCell>
                            <TableCell>
                                <Button variant="outlined"
                                    color="secondary"
                                    size="small"
                                    onClick={() => editar(carro)}>
                                    Editar
                                </Button>
                            </TableCell>
                        </TableRow>
                    ))
                }
            </Table>
        <Button
                onClick={openDialog}
                variant="contained"
                color="primary">Adicionar</Button>

        <Dialog open={open} onClose={closeDialog}>
            <DialogTitle>{id === 0 ? 'Novo': 'Editar'} carro </DialogTitle>
            <DialogContent>{id === 0 ? 'Cadastrar': 'Edita'} Novo carro:
                <TextField
                    autoFocus
                    margin="dense"
                    id="cor"
                    label="cor"
                    type="text"
                    fullWidth
                    value={item}
                    onChange={e => setCor(e.target.value)}
                />
                <TextField
                    margin="dense"
                    id="modelo"
                    label="modelo"
                    type="text"
                    fullWidth
                    value={valor}
                    onChange={e => setModelo(e.target.value)}
                />
                <TextField
                    margin="dense"
                    id="placa"
                    label="placa"
                    type="text"
                    fullWidth
                    value={placa}
                    onChange={e => setPlaca(e.target.value)}
                />
            </DialogContent>
            <DialogActions>
                <Button onClick={closeDialog}>Cancelar</Button>
                <Button onClick={salvar}>{id === 0 ? 'Salvar' : 'Atualizar'}</Button>
            </DialogActions>
        </Dialog>
    </>
  )

}
export default ListaPage;