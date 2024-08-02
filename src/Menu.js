import styled from "styled-components"
import { useState } from "react"
import { useNavigate } from 'react-router-dom'
import dente from './imagens/Dente_de_Alho.jpg'
import rodape from './imagens/rodape.png'
export default function Menu({context}){
    const {usuario,imagens}=context
    const navigate=useNavigate()
    const [titulo,setTitulo]=useState('Viajante desconhecido')
    const {moedas,nome,icone}=usuario
    return (
        <Tudo>
          <Topo>
            <section><ion-icon name="home"></ion-icon></section>
            <h1><em>{moedas} "moedas"</em></h1>
            <article><ion-icon name="power"></ion-icon></article>
          </Topo>
          <Container>
          <img src={imagens[icone]}></img>
            <section>
            <h2>{nome}</h2>
            <h1><em>{titulo}</em></h1>
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
          <Rodape>
          <img src={rodape}></img>
          </Rodape>
          
        </Tudo>
    )
}
const Rodape=styled.div`
position:fixed;bottom:0;
z-index:1
`
const Escolha=styled.div`
width:30%;height:90px;display:flex;flex-direction:column;
justify-content:center;align-items:center;
ion-icon{font-size:50px};margin:5px 0 20px 0;
h5{font-weight:400;margin:0px;font-size:17px;}
h6{color:#BABABA;line-height:18px;font-weight:400;font-size:18px;margin:0px}
`
const Principal=styled.div`
color:white;display:flex;width:100%;
position:fixed;top:250px;height:220px;z-index:2;
flex-wrap:wrap;justify-content:center;
`
const Container=styled.div`
display:flex;
align-items:center;
color:white;
h2{font-weight:300;font-size:28px;margin:0px 0 0 0}
img{height:100px;
border-radius:50%;
margin-right:20px;
}
ion-icon{color:#F2784A;margin-right:10px;font-size:28px;}
h1{
    font-size:18px;font-weight:200;
    color:#F2784A;
    margin:0px;
}
section{
flex-direction:column;height:100px;justify-content:space-evenly;
    display:flex;align-items:center;
   
}
article{color:white;font-size:45px;}
h3{font-weight:300;font-size:18px;}
`
const Topo=styled.div`
display:flex;width:100%;justify-content:space-between;
section{color:#AC3535;font-size:40px;background-color:transparent;}
color:#F2784A;background-color:transparent;
h1{
    font-size:20px;font-weight:400;
}
article{color:white;font-size:40px;background-color:transparent;}
padding:15px 15px 0 15px;box-sizing:border-box;
`
const Tudo=styled.div`
h4{font-size:27px;font-weight:600;margin-top:20px;color:white;}

display:flex;flex-direction:column;align-items:center;
width:100vw;height:100vh;background-color:#202020;
box-sizing:border-box;
overflow:hidden;overflow-y:scroll;
::-webkit-scrollbar {
    width: 0px;
  };
 
`