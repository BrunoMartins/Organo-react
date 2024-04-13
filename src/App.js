import React, { useState, useEffect } from 'react';
import Banner from './componentes/Banner';
import Formulario from './componentes/Formulario';
import Time from './componentes/Time';
import Rodape from './componentes/Rodape';
import { v4 as uuidv4 } from 'uuid';


function App() {

  const [times, setTimes] = useState([
    {
      id: uuidv4(),
      nome: 'Programação',
      corPrimaria: '#57C278',
      corAnterior: '#57C278'
    },
    {
      id: uuidv4(),
      nome: 'Front-End',
      corPrimaria: '#82CFFA',
      corAnterior: '#82CFFA'

    },
    {
      id: uuidv4(),
      nome: 'Data Sciense',
      corPrimaria: '#A6D157',
      corAnterior: '#A6D157'

    },
    {
      id: uuidv4(),
      nome: 'Devops',
      corPrimaria: '#E06B69',
      corAnterior: '#E06B69'

    },
    {
      id: uuidv4(),
      nome: 'UX e Design',
      corPrimaria: '#D86EBF',
      corAnterior: '#D86EBF'

    },
    {
      id: uuidv4(),
      nome: 'Mobile',
      corPrimaria: '#FEBA05',
      corAnterior: '#FEBA05'

    },
    {
      id: uuidv4(),
      nome: 'Inovação e Gestão',
      corPrimaria: '#FF8A29',
      corAnterior: '#FF8A29'

    }
  ]);

  const [colaboradores, setColaboradores] = useState([])
  const [nomeTime, setNomeTime] = useState('')
  const [corTime, setCorTime] = useState('#000000')// Se não definir uma cor inicial ele considera vazio e da erro


  useEffect(() => {
    // Carregar colaboradores salvos na localStorage ao carregar a página
    const savedColaboradores = localStorage.getItem('colaboradores');
    if (savedColaboradores) {
      setColaboradores(JSON.parse(savedColaboradores));
    }
  }, []);

  const colaboradorAdicionado = (colaborador) => {
    const updatedColaboradores = [...colaboradores, colaborador];
    setColaboradores(updatedColaboradores);
    // Salvar os colaboradores na localStorage
    localStorage.setItem('colaboradores', JSON.stringify(updatedColaboradores));
  };

  function deletarColaborador(id) {
    const savedColaboradores = JSON.parse(localStorage.getItem('colaboradores'));
    const colaboradoresFiltrados = savedColaboradores.filter(colaborador => colaborador.id !== id)
    setColaboradores(colaboradoresFiltrados);
    localStorage.setItem('colaboradores', JSON.stringify(colaboradoresFiltrados));

  }

  function deletarTime(id) {
    const savedTimes = JSON.parse(localStorage.getItem('times'));
    if (savedTimes) {
      const timesFiltrados = savedTimes.filter(savedTime => savedTime.id !== id);
      setTimes(timesFiltrados);
      localStorage.setItem('times', JSON.stringify(timesFiltrados));
    } else {
      const timesFiltrados = times.filter(time => time.id !== id);
      setTimes(timesFiltrados);
      localStorage.setItem('times', JSON.stringify(timesFiltrados));
    }
    const timeParaExcluir = times.find(time => time.id === id).nome;
    const colaboradoresAtualizados = colaboradores.filter(colaborador => colaborador.time !== timeParaExcluir);
    setColaboradores(colaboradoresAtualizados);
    localStorage.setItem('colaboradores', JSON.stringify(colaboradoresAtualizados));

  }

  function limparTime(id){
    const timeParaLimpar = times.find(time => time.id === id).nome;
    const colaboradoresAtualizados = colaboradores.filter(colaborador => colaborador.time !== timeParaLimpar);
    setColaboradores(colaboradoresAtualizados);
    localStorage.setItem('colaboradores', JSON.stringify(colaboradoresAtualizados));

  }

  function mudarCorDoTime(cor, id) {
    setTimes(times.map(time => {
      if (time.id === id) {
        time.corPrimaria = cor;
      }
      return time;
    }));
  }

  function salvarAlteracoes(id) {
    // Salvar os times atualizados na localStorage
    (times.map(time => {
      if (time.id === id) {
        time.corAnterior = time.corPrimaria;
      }
      return time;
    }));
    localStorage.setItem('times', JSON.stringify(times));
  }

  useEffect(() => {
    // Carregar times salvos na localStorage ao carregar a página
    const savedTimes = localStorage.getItem('times');
    if (savedTimes) {
      setTimes(JSON.parse(savedTimes));
    }
  }, []);

  function cancelarAlteracao(id) {
    const savedTimes = localStorage.getItem('times');
    if (savedTimes) {
      const timesArray = JSON.parse(savedTimes);
      setTimes(timesArray.map(time => {
        if (time.id === id) {
          time.corPrimaria = time.corAnterior;
        }
        return time;
      }));
    }

    setTimes(times.map(time => {
      if (time.id === id) {
        time.corPrimaria = time.corAnterior;
      }
      return time;
    }));
  }

  function cadastrarTime(novoTime) {
    const updatedTimes = [...times, { id: uuidv4(), ...novoTime, corAnterior: novoTime.corPrimaria }];
    setTimes(updatedTimes);
    // Salvar os times na localStorage
    localStorage.setItem('times', JSON.stringify(updatedTimes));
    setNomeTime('');
    setCorTime('#000000');
  }

  function verificaFavorito(id) {
    const updateFavoritos = colaboradores.map(colaborador => {
      if (colaborador.id === id) colaborador.favorito = !colaborador.favorito;
      return colaborador;
    })
    setColaboradores(updateFavoritos);
    localStorage.setItem('colaboradores', JSON.stringify(updateFavoritos));

  }

  return (
    <div className="App">
      <Banner />
      <Formulario
        cadastrarTime={cadastrarTime}
        nomeTime={nomeTime}
        setNomeTime={setNomeTime}
        corTime={corTime}
        setCorTime={setCorTime}
        times={times.map(time => time.nome)}
        colaboradorCadastrado={colaborador => colaboradorAdicionado(colaborador)} />
      <section className="times">
        <h1>Minha organização</h1>
        {times.map(time => <Time
        botaoLimparTime={limparTime}
          botaoApagarTime={deletarTime}
          id={time.id}
          mudarCor={mudarCorDoTime}
          botaoSalvar={salvarAlteracoes}
          botaoCancelar={cancelarAlteracao}
          key={time.id}
          nome={time.nome}
          corPrimaria={time.corPrimaria}
          deletar={deletarColaborador}
          favoritar={verificaFavorito}
          colaboradores={colaboradores.filter(colaborador => colaborador.time === time.nome)}//filtrando para que para cada time durante a interação apareça somente o colaborador que esteja nesse time
        />)}
      </section>
      <Rodape />
    </div>
  );
}

export default App;
