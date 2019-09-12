import React from "react";

//UI-Components
import {Table,Button} from 'react-bootstrap'
import { Container } from "@material-ui/core";

export default function TableSplitter(){
  
  return(
      <Container>
        
        <h2 style={{color:'#F5DA81',textAlign:'center'}}>Informações do splitter</h2>

        <Table responsive>
          
          <thead>
            <tr style={{backgroundColor:'#fff',color:'#6E6E6E'}}>
              <th>Nome</th>
              <th>Modelo</th>
              <th>Balanc.</th>
              <th>Fibra Aliment.</th>
            </tr>
          </thead>
          
          <tbody>
          
          </tbody>

        </Table>

        <Button style={{color:'#fff',marginTop:'20px'}} 
                variant="warning" 
                size="lg" block>
          
          Adicionar splitter
        
        </Button>

      </Container>
  );
}

/* OBS: chamada da api para pega o splitter.  
{splitters.map((splitter, index) => (
  <tr style={{color:'#BDBDBD',backgroundColor:'#fff'}}>
    <td>{splitter.nome}</td>
    <td>{splitter.modelo}</td>
    <td>{splitter.balanceamento}</td>
    <td>Em const.</td>
  </tr>
))}
*/