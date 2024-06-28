import styled from "styled-components"
import { useState } from "react"
import { useNavigate } from 'react-router-dom'
import dente from './imagens/Dente_de_Alho.jpg'
import rodape from './imagens/rodape.png'
export default function Menu(){
    const navigate=useNavigate()
    const [moedas,setMoedas]=useState(420)
    const [nome,setNome]=useState('AlquimistaTG')
    const [titulo,setTitulo]=useState('Viajante desconhecido')
    return (
        <Tudo>
          <Topo>
            <section><ion-icon name="home"></ion-icon></section>
            <h1><em>{moedas} "moedas"</em></h1>
            <article><ion-icon name="power"></ion-icon></article>
          </Topo>
          <Container>
          <img src={dente}></img>
            <h2>{nome}</h2>
            <h1><em>{titulo}</em></h1>
            <Linha>
            </Linha>
            <section>
                <ion-icon name="create"></ion-icon>
                <h3>Editar perfil</h3>
            </section>
          </Container>
          <h4>Escolha seu portal</h4>
          <Principal>
            
            <Escolha>
              <ion-icon name="fast-food-outline"></ion-icon>
              <h5>Perfil</h5>
              <h6><em>Fidelidade</em></h6>
            </Escolha>
            <Escolha>
              <ion-icon name="fast-food-outline"></ion-icon>
              <h5>Registro</h5>
              <h6><em>do Viajante</em></h6>
            </Escolha>
            <Escolha>
              <ion-icon name="fast-food-outline"></ion-icon>
              <h5>Fome?</h5>
              <h6><em>Peça aqui!</em></h6>
            </Escolha>
            <Escolha>
              <ion-icon name="fast-food-outline"></ion-icon>
              <h5>Feira</h5>
              <h6><em>Fidelidade</em></h6>
            </Escolha>
            <Escolha>
              <ion-icon name="fast-food-outline"></ion-icon>
              <h5>Correio</h5>
              <h6><em>Viajante</em></h6>
            </Escolha>
            <Escolha>
              <ion-icon name="fast-food-outline"></ion-icon>
              <h5>Jornal</h5>
              <h6><em>The Garage</em></h6>
            </Escolha>
          </Principal>
          <img src={rodape}></img>
        </Tudo>
    )
}
const Escolha=styled.div`
width:30%;height:200px;display:flex;flex-direction:column;
justify-content:center;align-items:center;
ion-icon{font-size:50px;}
h5{font-weight:400;margin:5px;font-size:17px;}
h6{color:#BABABA;font-weight:400;font-size:18px;margin:5px;}
`
const Principal=styled.div`
color:white;display:flex;width:100%;
flex-wrap:wrap;justify-content:center;
`
const Linha=styled.div`
background-color:#2A2A2A;
height:2.5px;width:300px;
margin:10px;

`
const Container=styled.div`
display:flex;flex-direction:column;
align-items:center;
color:white;
h2{font-weight:300;font-size:28px;margin:15px 0 0 0}
img{height:180px;
border-radius:50%;

}
ion-icon{color:#F2784A;margin-right:10px;font-size:28px;}
h1{
    font-size:18px;font-weight:200;
    color:#F2784A;
    margin:0px;
}
section{
    display:flex;align-items:center;
   
}
h3{font-weight:300;font-size:18px;}
`
const Topo=styled.div`
display:flex;width:100%;justify-content:space-between;
section{color:#AC3535;font-size:45px;}
color:#F2784A;
h1{
    font-size:20px;font-weight:400;
}
article{color:white;font-size:45px;}
padding:15px;box-sizing:border-box;
`
const Tudo=styled.div`
h4{font-size:40px;font-weight:600;margin:20px;color:white;}

display:flex;flex-direction:column;align-items:center;
width:100vw;height:100vh;background-color:#202020;
box-sizing:border-box;
overflow:hidden;overflow-y:scroll;
::-webkit-scrollbar {
    width: 0px;
  };
 
`