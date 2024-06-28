import styled from "styled-components"
import {AiFillEye, AiOutlineArrowLeft, AiOutlineArrowRight} from "react-icons/ai"
import { useState } from "react"
import banana from './imagens/Banana_Levada.jpg'
import cabeca from './imagens/Cabeça_de_Cogumelo.jpg'
import dente from './imagens/Dente_de_Alho.jpg'
import morango from './imagens/Morango_Bundinha.jpg'
import queixada from './imagens/Queixada_Pepper.jpg'
import tomato from './imagens/Tomato_Tomate.jpg'
import { useNavigate } from 'react-router-dom'
import axios from 'axios';
export default function Registro(){
    const navigate=useNavigate()
    const [name, setname] = useState("")
    const [email, setEmail] = useState("")
    const [password, setpassword] = useState("")
    const [amost1,setAmost1]=useState(true)
    const [amost2,setAmost2]=useState(true)
    const [amost3,setAmost3]=useState(true)
    const [amost4,setAmost4]=useState(false)
    const [amost5,setAmost5]=useState(false)
    const [amost6,setAmost6]=useState(false)
    const [aviso,setAviso]=useState(false)
    const [escolhido,setEscolhido]=useState(0)
    const [senhosa,setSenhosa]=useState('password')
    function setaEsquerda(){
        if(amost3&&amost5){
            setAmost5(false)
            setAmost2(true)
        }
        if(amost2&&amost4){
            setAmost4(false)
            setAmost1(true)
        }
        if(amost4&&amost6){
            setAmost6(false)
            setAmost3(true)
        }
    }
    function setaDireita(){
        if(amost1&&amost3){
            setAmost1(false)
            setAmost4(true)
        }
        if(amost2&&amost4){
            setAmost2(false)
            setAmost5(true)
        }
        if(amost3&&amost5){
            setAmost3(false)
            setAmost6(true)
        }
    }
    function register(){
        return navigate('/')
        const formData={name,email,password}
        const promise=axios.post(`http://localhost:5000/cadastro`,formData)
        promise.then(res=>{
          navigate('/')
        })
        promise.catch(e=>{
          console.log(e)
        })
      }
    function mostrarAviso(){
        setAviso(!aviso)
    }

    function mostrarSenha(){
        if(senhosa=='password'){
            setSenhosa('text')
        }else{
            setSenhosa('password')
        }
    }
    
    return (
        <Tudo>
            <Tabua>
            <Saida><ion-icon name="close"></ion-icon></Saida>
            <Titulo>
            <h1>Registro do Viajante</h1>
            </Titulo>
            
            <Acessar onClick={()=>navigate('/')}>
            <h2>Já é registrado? <strong><em>Acessar</em></strong></h2>
            </Acessar>
            <input type="text" placeholder="Nome fantasia / Apelido" value={name} onChange={e => setname(e.target.value)}  />
            <Caixa1>
            <Viz2 onClick={mostrarAviso}>
            <small>{'(?)'}</small>
            </Viz2>
            <article>
            <Aviso amostra={aviso}>
                <Balao>
                    O e-mail servirá como uma forma de recuperar sua senha, caso necessário. Apenas!
                    Para outros fins comunicativos temos nosso Correio Viajante no próprio aplicativo.
                </Balao>
                <Indicacao>

                </Indicacao>
            </Aviso>
            <input type="email" placeholder="E-mail" value={email} onChange={e => setEmail(e.target.value)}  /> 
            </article>
            </Caixa1><Caixa1>
            <input type={senhosa} placeholder="Senha viajante" value={password} onChange={e => setpassword(e.target.value)}  />
            <Viz onClick={mostrarSenha}>
            <AiFillEye/>
            </Viz>
                </Caixa1>
            <Escolha>
                Escolha um <strong>ícone</strong> pra te representar:
            </Escolha>
            <Container>
                <Setinha onClick={()=>{setaEsquerda()}}>
                <ion-icon name="chevron-back-outline"></ion-icon>                </Setinha>
                <Icone onClick={()=>setEscolhido(1)} esco={escolhido==1} amostra={amost1} >
                    <img src={banana}/>
                </Icone>
                <Icone onClick={()=>setEscolhido(2)} esco={escolhido==2} amostra={amost2} >
                    <img src={cabeca}/>
                </Icone>
                <Icone onClick={()=>setEscolhido(3)} esco={escolhido==3} amostra={amost3} >
                    <img src={dente}/>
                </Icone>
                <Icone onClick={()=>setEscolhido(4)} esco={escolhido==4} amostra={amost4} >
                    <img src={morango}/>
                </Icone>
                <Icone onClick={()=>setEscolhido(5)} esco={escolhido==5} amostra={amost5} >
                    <img src={queixada}/>
                </Icone>
                <Icone onClick={()=>setEscolhido(6)} esco={escolhido==6} amostra={amost6} >
                    <img src={tomato}/>
                </Icone>
                <Setinha onClick={()=>{setaDireita()}}>
                <ion-icon name="chevron-forward-outline"></ion-icon>                </Setinha>
            </Container>
            <Possivel>
                É possível conquistar novos ícones e alterá-lo depois
            </Possivel>
            <Sombra>
            <Sombra2>
            <Sombra3>
                <button onClick={()=>register()}>Registrar</button>
            </Sombra3>
            </Sombra2>
            </Sombra>
            </Tabua>
        </Tudo>
    )
}
const Titulo=styled.div`
height:50px;
`
const Saida=styled.div`
height:50px;
width:50px;
display:flex;justify-content:center;
align-items:center;
color:#5B5B5B;ion-icon{font-size:38px;}
position:absolute;right:0;
box-sizing:border-box;
`
const Tabua=styled.div`position:relative;
background-color:#2F2F2F;width:92%;height:90%;
display:flex;flex-direction:column;align-items:center;
justify-content:;border-radius:30px;
`
const Aviso=styled.div`
position:absolute;display:${props=>props.amostra?'':'none'};
top:-50px;;z-index:1;right:50px;
width:250px;height:120px;
`
const Indicacao=styled.div`
position:absolute;
right:0;top:50px;
width: 0; 
  height: 0; 
  border-top: 20px solid transparent;
  border-bottom: 20px solid transparent;
  border-left: 35px solid white;

`
const Balao=styled.div`border-radius:10px;
font-size:12px;padding:12px;box-sizing:border-box;
position:absolute;width:215px;height:150px;background-color:white;
`
const Acessar=styled.div`cursor:pointer;
`

const Icone=styled.div`
display:${props=>props.amostra?'':'none'};
img{height:70px;}
padding:5px 5px 0 5px;
border:${props=>props.esco?'2px solid #B16234;':''} 
border-radius:5px;
box-sizing:border-box;
cursor:pointer;
`
const Setinha=styled.button`
width:30px;height:30px;background-color:transparent;
border:0;color:white;font-size:25px;
cursor:pointer
`

const Container=styled.div`display:flex;align-items:center;justify-content:space-around;
width:80%;height:80px
`
const Viz = styled.div`
position:absolute;right:35px;font-size:30px;
top:10px;width:5px;height:5px;color:white;
small{font-size:23px;}
cursor:pointer
`
const Viz2 = styled.div`
position:absolute;right:33px;font-size:30px;
top:0px;width:5px;height:5px;color:white;
small{font-size:20px;}
cursor:pointer
`

const Possivel = styled.button`
color:white;font-size:14px;font-weight:500;
height:30px;width:100%;margin:15px;
margin:10px;border:0;background-color:#2F2F2F;line-height:20px;
`
const Escolha = styled.button`
color:white;border:0;height:30px;
strong{
    color:#B16234;
}
background-color:#2F2F2F;
font-size:17px;font-weight:500;
margin:12px;
`


const Tudo = styled.div`
display:flex;flex-direction:column;align-items:center;
justify-content:center;
width:100vw;height:100vh;background-color:#202020;
box-sizing:border-box;

input{
    width:80%;min-height:45px;
    border-radius:12px;
    background-color:transparent;
    margin:6px;font-size:17px;
    font-weight:500;
    border:2.5px solid white;
    color:white;
    padding-left:10px;
    box-sizing:border-box;
}
article{
}
h1{
    color:white;
    font-size:27px;
    font-weight:700;
    
}
h2{
color:white;font-weight:400;font-size:16px;
strong{font-weight:700;color:#B16234;margin-left:10px;}
}
h3{
    color:#B16234;
}

`
const Caixa1 = styled.div`
position:relative;width:80%;
input{width:100%;margin:0}width:80%;
height:50px;margin:6px;
`

const Sombra=styled.div`
box-shadow: -5px -5px 5px rgba(255, 255, 255, 0.2);
border-radius:20px;background-color:red;
width:80%;height:50px;display:flex;
justify-content:center;
margin:20px;
button{
    width:100%;height:50px;background-color:white;
    color:#202020;font-size:19px;
    border-radius:20px;
    ;border:0;backdrop-filter: blur(10px);
    box-shadow: 5px 5px 5px rgba(255, 255, 255, 0.2);cursor:pointer;
}
`
const Sombra2=styled.div`
box-shadow: 5px -5px 5px rgba(255, 255, 255, 0.2);
border-radius:20px;background-color:red;
width:100%;height:50px;display:flex;
justify-content:center;
`
const Sombra3=styled.div`
box-shadow: -5px 5px 5px rgba(255, 255, 255, 0.2);
border-radius:20px;background-color:red;
width:100%;height:50px;display:flex;
justify-content:center;
`