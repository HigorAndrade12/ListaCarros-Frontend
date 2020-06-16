import React, { useState, useEffect, Icon } from 'react';
import api from './api';
import Header from './header';
import { 
    Container, 
    Table, 
    TableRow, 
    TableCell, 
    TableHead,
    Dialog, 
    Button, 
    DialogTitle, 
    DialogContent, 
    DialogContentText, 
    TextField, 
    DialogActions} from '@material-ui/core';
import './style.css';

function App() {
    const [ lista, setLista ] = useState([]); // imutabilidade
    const [ open, setOpen ] = useState(false);
    const [ id, setId] = useState('');
    const [ modelo, setModelo ] = useState('');
    const [ placa, setPlaca ] = useState('');
    const [ ano, setAno ] = useState('');
    const [ botaoEditar, setBotaoEditar ] = useState(false);
    const [ botaoAdicionar, setBotaoAdicionar ] = useState(false);
    
    function openModal() {
        setBotaoAdicionar(true);
        setBotaoEditar(false);
        setOpen(true);
    };

    function closeModal() {
        setOpen(false);
    };

    function listaCarros(){
         api.get('/carros').then((response) => {
           const itens = response.data;
              setLista(itens);
              setId('');
              setModelo('');
              setPlaca('');
              setAno('');
        });
    }

    useEffect(() => {
        listaCarros();
    }, []);
    
    function addCarro(){
        const model = modelo;
        const plac = placa;
        const year = ano;

        api.post('/carros', {modelo:model, placa:plac, ano:year}).then((response) => {
            setModelo('');
            setPlaca('');
            setAno('');
            setOpen(false);
            listaCarros();
        });
    }

    function deleteCarro(id){
        api.delete(`/carros/${id}`).then((response) => {
            listaCarros();
        });
    }
  

    function openEditar(id,modelo,placa,ano){
        setBotaoAdicionar(false);
        setBotaoEditar(true);
        setOpen(true);
        setId(id);
        setModelo(modelo);
        setPlaca(placa);
        setAno(ano);
    }

    function editarcarro(){
        api.put(`/carros/${id}`,{modelo:modelo,placa:placa,ano:ano}).then((response) => {
            setOpen(false);
            setId('');
            setModelo('');
            setPlaca('');
            setAno('');
            listaCarros();
        });
    }
   return (
        <>
         <Header />
         <Container maxWidth="lg" className="container"> 
            <Table>
                
                <TableHead>
                    <TableRow>
                        <TableCell>ID</TableCell>
                        <TableCell>Modelo</TableCell>
                        <TableCell>Placa</TableCell>
                        <TableCell>Ano</TableCell>
                        <TableCell>Ações</TableCell>
                    </TableRow>
                </TableHead>
                {lista.map(itens => (
                    <TableRow key={itens.id}>
                        <TableCell>{itens.id}</TableCell>
                        <TableCell>{itens.modelo}</TableCell>
                        <TableCell>{itens.placa}</TableCell>
                        <TableCell>{itens.ano}</TableCell>

                        <TableCell>
                           
                            &nbsp;
                            <Button 
                                color="primary"
                                variant="outlined" 
                                onClick={() => openEditar(itens.id,itens.modelo,itens.placa,itens.ano)}
                                size="small"> 
                                Editar Carro
                            </Button>
                            &nbsp;
                            <Button 
                                onClick={() => deleteCarro(itens.id)}
                                variant="outlined" 
                                size="small" 
                                color="secondary">Carro despachado</Button>
                        </TableCell>
                    </TableRow>
                ))}
            </Table>
            <Button 
                onClick={openModal}
                variant="contained" 
                color="primary" 
                style={{marginTop: '20px'}}>
                Adicionar
            </Button>
         </Container>
         <Dialog open={open} onClose={closeModal} fullWidth={true} maxWidth="sm">
            <DialogTitle id="form-dialog-title">Carro</DialogTitle>
            <DialogContent>
                <DialogContentText>
                    Digite as informações do Carro.
                </DialogContentText>
                <TextField
                    autoFocus
                    margin="dense"
                    id="modelo"
                    label="Modelo"
                    autoComplete="off"
                    type="text"
                    fullWidth
                    value={modelo}
                    onChange={e => setModelo(e.target.value)}
                />
                <TextField
                    margin="dense"
                    id="placa"
                    label="Placa"
                    autoComplete="off"
                    type="text"
                    fullWidth
                    value={placa}
                    onChange={e => setPlaca(e.target.value)}
                />
                <TextField
                    margin="dense"
                    id="ano"
                    label="Ano"
                    autoComplete="off"
                    type="text"
                    fullWidth
                    value={ano}
                    onChange={e => setAno(e.target.value)}
                />
               
            </DialogContent>
            <DialogActions>
                <Button onClick={closeModal} color="primary">
                    Cancelar
                </Button>
                <Button color="primary" onClick={botaoEditar ? editarcarro : addCarro }>
                    Salvar Carro
                </Button>
            </DialogActions>
         </Dialog>
        </>
    )
}

export default App;