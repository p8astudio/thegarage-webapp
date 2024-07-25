import styled from "styled-components"
import { useState } from "react"
import alquimista from './imagens/Alquimista.png'
import logo from './imagens/TG_Logo_branca.png'
import { useNavigate } from 'react-router-dom'
import { postLoginUsuario } from "./api"
import tick from './imagens/tick.png'
export default function First({context}){
    const {setUsuario}=context
    const navigate=useNavigate()
    const [nome, setNome] = useState("")
    const [senha, setSenha] = useState("")
    const [mantido,setMantido]=useState(false)
    function entrar(){
        const promise=postLoginUsuario(nome,senha)
        promise.then(res=>{
            const user=res.data
            setUsuario(user)
            navigate('/menu')
        })
        promise.catch(e=>{
          console.log(e)
        })
    }
    function manter(){
        setMantido(!mantido)
    }
    return (
        <Tudo>
            <Bloco>
            
            <section>
            <img src={alquimista}></img>
            </section>
            <article>
            <img src={logo}/>
            </article>

            </Bloco>
            <h1><strong>Saudações,</strong> Viajante!</h1>
            <input type="text" placeholder="Nome Fantasia ou E-mail" value={nome} onChange={e => setNome(e.target.value)}  />
            <input type="senha" placeholder="Senha Viajante" value={senha} onChange={e => setSenha(e.target.value)}  />
            <Manter>
                <div>
                    <Quadradinho onClick={manter}>
{mantido?<img src={tick}/>:''}
                    </Quadradinho>
                    <h2>Manter-me conectado</h2>
                </div>
                
                <h3>{mantido?'YeAh!':''}</h3>
            </Manter>
            <Sombra>
            <Sombra2>
            <Sombra3>
                <button onClick={entrar}>Entrar</button>
            </Sombra3>
            </Sombra2>
            </Sombra>
            <Esqueci>
                <em>Esqueci minha senha</em>
            </Esqueci>
            <Registrese onClick={()=>navigate('/registro')}>
                Primeira viagem? <strong>Registre-se</strong>
            </Registrese>
        </Tudo>
    )
}
const Bloco=styled.div`
position:relative;width:320px;height:280px;

article{
img{height:80px;
    position:absolute;
    bottom:0;
    left:80px;
    z-index:1
}
}
section{
    img{height:350px;
    z-index:2;
    position:absolute;
    left:10px;
    bottom:-65px;
    }  
}

`
const Esqueci = styled.button`
color:white;font-size:14px;height:30px;
margin:10px;border:0;background-color:#202020;
`
const Registrese = styled.button`
color:white;border:0;
strong{
    color:#e87c3a;
}
background-color:#202020;
font-size:18px;
cursor:pointer;
`


const Manter=styled.div`
background-color:;width:80%;height:30px;margin:0 0 10px 0;
display:flex;justify-content:space-between;align-items:center;
div{
    display:flex;align-items:center;
}
`
const Quadradinho=styled.div`
width:28px;height:28px;background-color:#202020;
    border:2px solid white;border-radius:8px;margin-right:10px;
    display:flex;justify-content:center;align-tems:center;
    color:#e87c3a;font-size:25px;
    img{width:70%;}
`
const Tudo = styled.div`
display:flex;flex-direction:column;align-items:center;
justify-content:;
width:100vw;
max-width:600px;height:100vh;
box-sizing:border-box;
form{
    width:100%;
    display:flex;flex-direction:column;
    align-items:center;
};
input{
    width:80%;height:50px;
    border-radius:10px;
    background-color:transparent;
    margin-bottom:15px;font-size:17px;font-weight:500;
    border:2px solid white;
    color:white;
    padding-left:10px;
    box-sizing:border-box;
}
input::placeholder {
            text-align: center;
            color: #999;}
h1{
    color:white;
    font-size:22px;
    font-weight:500;
    strong{font-weight:700;}
}
h2{
color:white;font-weight:400;font-size:16px;
}
h3{
    color:#e87c3a;
}
section{

}
article{

}
`

const Sombra=styled.div`
box-shadow: -5px -5px 5px rgba(255, 255, 255, 0.1);
border-radius:20px;background-color:red;
width:80%;height:50px;display:flex;
justify-content:center;
margin:10px;
button{
    width:100%;height:50px;background-color:white;
    color:#202020;font-size:19px;
    border-radius:20px;
    ;border:0;cursor:pointer;
    box-shadow: 5px 5px 5px rgba(255, 255, 255, 0.1);
}
`
const Sombra2=styled.div`
box-shadow: 5px -5px 5px rgba(255, 255, 255, 0.1);
border-radius:20px;background-color:red;
width:100%;height:50px;display:flex;
justify-content:center;
`
const Sombra3=styled.div`
box-shadow: -5px 5px 5px rgba(255, 255, 255, 0.1);
border-radius:20px;background-color:red;
width:100%;height:50px;display:flex;
justify-content:center;
`