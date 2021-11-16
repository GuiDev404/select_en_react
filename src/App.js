import React from 'react';
import './style.css';
import Select from './components/Select';
import useApi from './hooks/useApi';
import { URLs } from './services/settings';
import { fetchData } from './services/fetch';

export default function App() {
  const { data, isLoading, error } = useApi(URLs.provincias);
  const [provinciaSelected, setProvinciaSelected] = React.useState('');

  const provinciasFormatted =
    !isLoading &&
    data.map((prov) => {
      return {
        value: prov.nombre.toLowerCase().split(' ').join('-'),
        label: prov.nombre,
        id: prov.id,
      };
    });

  const handleProvincias = (e) => {
    setProvinciaSelected(e.target.value);
   
      const urlProvincia = `https://apis.datos.gob.ar/georef/api/municipios?provincia=${e.target.value}&campos=id,nombre&max=1000`;
    
      async function getData() {
        try {
          const data = await fetchData(urlProvincia);
          console.log(data)
        } catch (error) {
          console.log(error)
        } 
      }

      getData()
    

  };

  return (
    <div>
      <h1>Provincias</h1>

      {error && <p> {error} </p>}
      {isLoading ? (
        <p> Cargando... </p>
      ) : (
        <>
          <Select
            options={provinciasFormatted}
            valueSelected={provinciaSelected}
            handleChange={handleProvincias}
          />

          <Select
            options={provinciasFormatted}
            valueSelected={provinciaSelected}
            handleChange={handleProvincias}
          />
        </>
      )}
    </div>
  );
}
