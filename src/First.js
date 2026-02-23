import styled, { keyframes } from "styled-components"
import { useEffect, useState } from "react"
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai"
import alquimista from './imagens/Alquimista.png'
import logo from './imagens/TG_Logo_branca.png'
import { useNavigate } from 'react-router-dom'
import { postLoginUsuario } from "./api"
import tick from './imagens/tick.png'
export default function First({context}){
    const {usuario, setUsuario, setRememberMe, rememberMe}=context
    const navigate=useNavigate()
    const [nome, setNome] = useState("")
    const [senha, setSenha] = useState("")
    const [mantido,setMantido]=useState(()=>{
        if(rememberMe === undefined) return true
        return rememberMe
    })
    const [senhosa,setSenhosa]=useState('password')
    useEffect(()=>{
        const preload = new Image();
        preload.src = tick;
    },[]);
    useEffect(()=>{
        if(usuario){
            navigate('/perfil')
        }
    },[usuario,navigate])
    function entrar(){
        const promise=postLoginUsuario(nome,senha)
        promise.then(res=>{
            const user=res.data
            setRememberMe(mantido)
            setUsuario(user)
            navigate('/perfil')
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
            <SenhaBox>
            <input type={senhosa} placeholder="Senha Viajante" value={senha} onChange={e => setSenha(e.target.value)}  />
            <Viz onClick={()=>setSenhosa(senhosa==='password'?'text':'password')}>
            {senhosa==='password'?<AiFillEyeInvisible/>:<AiFillEye/>}
            </Viz>
            </SenhaBox>
            <Manter>
                <div>
                    <Quadradinho onMouseDown={manter}>
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
position:relative;width:290px;height:220px;

article{
img{height:80px;
    position:absolute;
    bottom:0;
    left:80px;
    z-index:1
}
}
section{

    img{height:300px;
    z-index:2;
    position:absolute;
    left:10px;
    bottom:-65px;
    }  
}

`
const Esqueci = styled.button`
color:white;font-size:14px;height:25px;
margin:10px 0 20px 0;border:0;background-color:#202020;
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
background-color:;width:85%;height:30px;margin:0 0 10px 0;
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

const SenhaBox = styled.div`
width:85%;
position:relative;
margin-bottom:15px;
height:45px;
&& input{
    width:100%;
    height:45px;
    padding-right:52px;
    box-sizing:border-box;
    margin:0;
}
`

const Viz = styled.div`
position:absolute;
right:14px;
top:50%;
transform: translateY(-50%);
font-size:22px;
width:26px;
height:26px;
color:white;
display:flex;
align-items:center;
justify-content:center;
cursor:pointer;
opacity:0.7;
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
    width:85%;height:45px;
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
    font-size:20px;
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

const portalPulse = keyframes`
  0% {
    box-shadow: 0 0 0 0 rgba(232, 124, 58, 0.35), 0 0 0 0 rgba(255, 255, 255, 0.12);
    transform: translateY(0) scale(1);
  }
  50% {
    box-shadow: 0 0 0 10px rgba(232, 124, 58, 0), 0 0 0 18px rgba(255, 255, 255, 0);
    transform: translateY(-1px) scale(1.02);
  }
  100% {
    box-shadow: 0 0 0 0 rgba(232, 124, 58, 0);
    transform: translateY(0) scale(1);
  }
`;

const Sombra=styled.div`
box-shadow: -5px -5px 5px rgba(255, 255, 255, 0.1);
border-radius:20px;background-color:red;
width:85%;height:40px;display:flex;
justify-content:center;
margin:10px;
button{
    width:100%;height:40px;background-color:white;
    color:#202020;font-size:19px;
    border-radius:20px;
    ;border:0;cursor:pointer;
    box-shadow: 5px 5px 5px rgba(255, 255, 255, 0.1);
    transition: transform 0.2s ease;
}
button:hover{
    animation: ${portalPulse} 1.2s ease-in-out infinite;
}
button:active{
    transform: translateY(1px);
}
`
const Sombra2=styled.div`
box-shadow: 5px -5px 5px rgba(255, 255, 255, 0.1);
border-radius:20px;background-color:red;
width:100%;height:40px;display:flex;
justify-content:center;
`
const Sombra3=styled.div`
box-shadow: -5px 5px 5px rgba(255, 255, 255, 0.1);
border-radius:20px;background-color:red;
width:100%;height:40px;display:flex;
justify-content:center;
`
