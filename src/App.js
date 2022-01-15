import './App.css';
import React, { useState, useEffect } from 'react';

function App() {
  const [repositories, setRepositories] = useState([]);


  //como não é passado um parametro para verificar se uma variavel foi alterada só executa 1 vez
  useEffect(() => {
    async function getRepositories(){
      const response = await fetch('https://api.github.com/users/viniciusdiniz21/repos');
      const data = await response.json();
      setRepositories(data);
    }
    getRepositories();
  }, []);

  useEffect(()=>{
    const filtered = repositories.filter((repo) => repo.favorite)
    document.title = `Você tem ${filtered.length} favoritos`
  }, [repositories])




  function handleFavorite(id){
    const newRepo = repositories.map((repo)=>{
      return repo.id === id ? {...repo, favorite: !repo.favorite} : repo
    })
    setRepositories(newRepo)
  }

  return (
    <ul>
      {repositories.map((repo)=>(
        <li key = {repo.id}>
        {repo.name}
        {repo.favorite && <span>(Favorito)</span>}
        <button onClick={() => handleFavorite(repo.id)}>Favoritar</button>
        </li>
      ))}
    </ul>
  );

}
export default App;
