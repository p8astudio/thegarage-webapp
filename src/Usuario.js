import { useEffect, useState } from 'react'
import banana from './imagens/Banana_Levada.jpg'
import cabeca from './imagens/Cabeça_de_Cogumelo.jpg'
import dente from './imagens/Dente_de_Alho.jpg'
import morango from './imagens/Morango_Bundinha.jpg'
import queixada from './imagens/Queixada_Pepper.jpg'
import tomato from './imagens/Tomato_Tomate.jpg'
import styled from 'styled-components'
import { getUsuarioInfos } from './api'
export default function Usuario(){
    const imagens=[banana,cabeca,dente,morango,queixada,tomato]
    const [escolhido,setEscolhido]=useState(1)
    const [nome,setNome]=useState('AlquimistaTG')
    const [titulo,setTitulo]=useState('Viajante desconhecido')
    const [nivel,setNivel]=useState(1)
    const [pontos,setPontos]=useState(570)
    const [saborSalgada,setSaborSalgada]=useState('Quatro Queijos')
    const [saborDoce,setSaborDoce]=useState('Nutella com Morango')
    const [saborFavorito,setSaborFavorito]=useState('Bacon com Ovos')
    const [moedas,setMoedas]=useState(420)
    function getUserInfos(){
        const promise=getUsuarioInfos()
        promise.then(res=>{
          const {
            name,title,chosen,level,points,
            saltedFlavor,sweetFlavor,preferredFlavor,coins
        }=res.data
        setEscolhido(chosen)
        setNome(name)
        setTitulo(title)
        setNivel(level)
        setPontos(points)
        setSaborSalgada(saltedFlavor)
        setSaborDoce(sweetFlavor)
        setSaborFavorito(preferredFlavor)
        setMoedas(coins)
        })
        promise.catch(e=>{
          console.log(e)
        })
    }
    useEffect(getUserInfos,[])
    return(
        <Tudo>
            <Perfil>
                <Imagem>
                <img src={imagens[escolhido-1]}>
                    
                    </img>
                <button><ion-icon name="settings"></ion-icon> </button>
                </Imagem>
                
                <section>
                    <h1>{nome}</h1>
                    <h3><em>{titulo}</em></h3>
                    <aside>
                        <Barra>
                            
                            <ColoridoCima width={pontos>10?(pontos/6):10}>
                                <Colorido/>
                            </ColoridoCima>
                            <PontinhaCima complete={pontos>585}>
                                <Pontinha complete={pontos>585}/>
                            </PontinhaCima>
                        </Barra>
                       <em> Lvl. {nivel}</em>
                    </aside>
                    <h2><em>{pontos}/600</em></h2>
                </section>
            </Perfil>
            <Pedidos>
                <h1>Sabores mais pedidos do mês:</h1>
                <Divisoria1/>
                <Principais>
                    <Titulo>
                        <h2><strong>TOP 1 |</strong> Pizza Salgada</h2>
                        <Sabor>{saborSalgada}</Sabor>
                    </Titulo>
                    <Titulo>
                        <h2><strong>TOP 1 |</strong> Pizza Doce</h2>
                        <Sabor>{saborDoce}</Sabor>
                    </Titulo>
                    
                </Principais>
            </Pedidos>
            <SaborF>
        <h1>Sabor favorito:</h1>
        <h2>{saborFavorito}</h2>
        <button>
            <ion-icon name="settings"></ion-icon>
            Alterar favorito
         </button>

            </SaborF>
            <Carteira>
                <h1>Carteira do Viajante:</h1>
                <section>
                    <article>
                        <h2>{moedas}</h2>
                        <h3><em>"moedas"</em></h3>
                    </article>
                    <Divisoria2/>
                    <main>
                        <button>
                            <ion-icon name="fast-food-outline"></ion-icon>
                            <h1>Transferir para um viajante</h1>
                        </button>
                        <button>
                            <ion-icon name="fast-food-outline"></ion-icon>
                            <h1>Loja de Recompensas</h1>
                        </button>
                    </main>
                </section>
            </Carteira>
        </Tudo>
    )
}
const Carteira=styled.div`
color:white;
section{
    display:flex;
}
h1{
    font-weight:600
}
article{color:#EB7549;
h2{font-size:80px;font-weight:500;margin:0 0 0 0}
h3{font-size:25px;font-weight:400;margin:0 0 0 0}
}
main{
    button{display:flex;align-items:center;
        width:200px;color:white;
        h1{font-weight:200;font-size:22px;}
        background-color:transparent;border:0;
        ion-icon{font-size:60px;}
    }
}
`
const Imagem=styled.div`
position:relative;margin-right:10px;
button{
    position:absolute;top:0;
    left:0;border:0;background-color:transparent;
    color:white;font-size:30px;
}
`
const SaborF=styled.div`
display:flex;
flex-direction:column;
align-items:flex-start;
color:white;
padding:30px;
box-sizing:border-box;
width:100%;
h1{
    font-weight:500;margin:15px 0 0 0;
}
h2{margin:5px 0 0 0;
    color:#EB7549;
    font-weight:400;
    font-size:29px;
}
button{
    background-color:transparent;
    color:white;border:0;font-size:20px;
    display:flex;align-items:center;
    ion-icon{font-size:30px;margin:0 10px 0 0}
}
`
const Sabor=styled.div`
border:2px solid #494949;
color:white;
border-radius:8px;
padding:5px;
width:220px;
box-sizing:border-box;
`
const Titulo=styled.div`
display:flex;flex-direction:column;
align-items:center;width:100%;
margin:0 20px 0 20px;;
h2{font-size:18px;
color:white;font-weight:400;
    strong{
        color:#EB7549
    }
}
`
const Principais=styled.div`
display:flex;justify-content:space-between;
width:100%;align-items:center;
`
const Pedidos=styled.div`
display:flex;flex-direction:column;
h1{
    font-size:20px;color:white;font-weight:500
}align-items:center;
`

const PontinhaCima=styled.div`
width: 0; 
  height: 0; 
  border-right: 5px solid transparent;
  border-top: 20px solid #fcb48b;
position:relative;
  `
const Pontinha=styled.div`

width: 0; 
  height: 0; 
  border-right: 4px solid transparent;
  border-top: 17px solid #F2784A;
  position:absolute;
  bottom:0;
`
const Tudo=styled.div`
display:flex;flex-direction:column;align-items:center;
justify-content:;
width:100vw;height:100vh;background-color:#202020;
box-sizing:border-box;
overflow:hidden;overflow-y:scroll;
::-webkit-scrollbar {
    width: 0px;
  };
`
const Perfil=styled.div`
img{height:150px;border-radius:10px;margin:10px}
display:flex;justify-content:center;
width:100%;
h1{
    color:white;
    font-size:23px;
    font-weight:500;
    strong{font-weight:700;}
    margin:5px;
}
h2{
color:#656565;font-weight:400;font-size:16px;
}
h3{
     color:#B16234;font-weight:200;margin:5px;
}
section{
    display:flex;flex-direction:column;
    align-items:center;
    aside{
        display:flex;color:white;
    }
}

`
const Barra=styled.div`
width:200px;height:20px;border:3px solid #242424;
border-radius:12px;
display:flex;
`

const Colorido=styled.div`
width:100%;
height:85%;background-color:#F2784A;
position:absolute;bottom:0;
border-top-left-radius:8px;
border-bottom-left-radius:8px;
`
const ColoridoCima=styled.div`
background-color:#fcb48b;
width:${props=>props.width}%;height:100%;
position:relative;
border-top-left-radius:8px;
border-bottom-left-radius:8px;
`
const Divisoria1=styled.div`
background-color:#6D6D6D;
width:400px;height:1.5px;
box-shadow: 0px 0px 5px rgb(109, 109, 109);
`
const Divisoria2=styled.div`
background-color:#6D6D6D;
width:2px;height:150px;margin:20px;
box-shadow: 0px 0px 3px rgb(109, 109, 109);
`

