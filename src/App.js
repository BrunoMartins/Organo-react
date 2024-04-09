import React, { useState, useEffect } from 'react';
import Banner from './componentes/Banner';
import Formulario from './componentes/Formulario';
import Time from './componentes/Time';
import Rodape from './componentes/Rodape';


function App() {

  const [times, setTimes] = useState([
    {
      nome: 'Programação',
      corPrimaria: '#57C278'

    },
    {
      nome: 'Front-End',
      corPrimaria: '#82CFFA'

    },
    {
      nome: 'Data Sciense',
      corPrimaria: '#A6D157'

    },
    {
      nome: 'Devops',
      corPrimaria: '#E06B69'

    },
    {
      nome: 'UX e Design',
      corPrimaria: '#D86EBF'

    },
    {
      nome: 'Mobile',
      corPrimaria: '#FEBA05'

    },
    {
      nome: 'Inovação e Gestão',
      corPrimaria: '#FF8A29'

    }
  ]);

  const [colaboradores, setColaboradores] = useState([])

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

  function deletarColaborador() {
    console.log('deletando colaborador');
  }

  function mudarCorDoTime(cor, nome) {
    setTimes(times.map(time => {
        if(time.nome === nome) {
            time.corPrimaria = cor;
        }
        return time;
    }));
}

function salvarAlteracoes() {
  // Salvar os times atualizados na localStorage
  localStorage.setItem('times', JSON.stringify(times));
}

  useEffect(() => {
    // Carregar times salvos na localStorage ao carregar a página
    const savedTimes = localStorage.getItem('times');
    if (savedTimes) {
      setTimes(JSON.parse(savedTimes));
    }
  }, []);

  return (
    <div className="App">
      <Banner />
      <Formulario times={times.map(time => time.nome)} ColaboradorCadastrado={colaborador => colaboradorAdicionado(colaborador)} />
      <section className="times">
        <h1>Minha organização</h1>
        {times.map(time => <Time
          mudarCor={mudarCorDoTime}
          botaoSalvar={salvarAlteracoes}
          key={time.nome}
          nome={time.nome}
          corPrimaria={time.corPrimaria}
          deletar={deletarColaborador}
          colaboradores={colaboradores.filter(colaborador => colaborador.time === time.nome)}//filtrando para que para cada time durante a interação apareça somente o colaborador que esteja nesse time
        />)}
      </section>
      <Rodape />
    </div>
  );
}

export default App;
