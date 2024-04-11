import React, { useState } from 'react';
import Botao from '../Botao';
import CampoTexto from '../CampoTexto';
import ListaSuspensa from '../ListaSuspensa';
import './Formulario.css';
import { v4 as uuidv4 } from 'uuid';

const Formulario = (props) => {


    const [nome, setNome] = useState('')
    const [cargo, setCargo] = useState('')
    const [imagem, setImagem] = useState('')
    const [time, setTime] = useState('')
    



    const salvar = (evento) => {
        evento.preventDefault()
        props.colaboradorCadastrado({
            id: uuidv4(),
            nome,
            cargo,
            imagem,
            time
        })
        //limpando o formulário
        setNome('')
        setCargo('')
        setImagem('')
        setTime('')

    }

    return (
        <section className="formulario-container">
            <form className="formulario" onSubmit={salvar}>
                <h2>Preencha os dados para criar o card do colaborador</h2>
                <CampoTexto
                    obrigatorio={true}
                    label="Nome"
                    placeholder="Digite seu nome"
                    valor={nome}
                    alterado={valor => setNome(valor)}
                />
                <CampoTexto
                    obrigatorio={true}
                    label="Cargo"
                    placeholder="Digite seu cargo"
                    valor={cargo}
                    alterado={valor => setCargo(valor)}
                />
                <CampoTexto
                    label="Imagem"
                    placeholder="Digite o endereço da imagem"
                    valor={imagem}
                    alterado={valor => setImagem(valor)}
                />

                <ListaSuspensa
                    obrigatorio={true}
                    label="Time"
                    itens={props.times}
                    valor={time}
                    alterado={valor => setTime(valor)}
                />
                <Botao>
                    Criar card
                </Botao>
            </form>
            <form className="formulario" onSubmit={(evento) => {
                 evento.preventDefault();
                 props.cadastrarTime({nome: props.nomeTime, corPrimaria: props.corTime});
            }}>
                <h2>Preencha os dados para criar um novo time.</h2>
                <CampoTexto
                    obrigatorio={true}
                    label="Nome"
                    placeholder="Digite o nome do time"
                    valor={props.nomeTime}
                    alterado={valor => props.setNomeTime(valor)}
                />
                <CampoTexto
                    obrigatorio={true}
                    label="Cor"
                    placeholder="Digite a cor do time"
                    valor={props.corTime}
                    alterado={valor => props.setCorTime(valor)}
                />
                <Botao>
                    Criar um novo time
                </Botao>
            </form>
        </section>
    )

}

export default Formulario