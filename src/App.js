import React from 'react';
import './style.css';
import Select from './components/Select';
import useApi from './hooks/useApi';
import { URLs } from './services/settings';
import { fetchData } from './services/fetch';

export default function App() {
  const { data, isLoading, error } = useApi(URLs.provincias);
  const [provinciaSelected, setProvinciaSelected] = React.useState('');
  const [municipios, setMunicipios] = React.useState([]);

  const provinciasFormatted =
    !isLoading &&
    data.map((prov) => {
      return {
        value: prov.nombre.toLowerCase().split(' ').join('-'),
        label: prov.nombre,
        id: prov.id,
      };
    });

  const municipiosFormatted =
    municipios.length &&
    municipios.map((muni) => {
      return {
        value: muni.nombre.toLowerCase().split(' ').join('-'),
        label: muni.nombre,
        id: muni.id,
      };
    });

  const handleProvincias = (e) => {
    const provincia = provinciasFormatted.find(
      (prov) => prov.id === e.target.value
    );

    setProvinciaSelected(provincia);

    const urlProvincia = `https://apis.datos.gob.ar/georef/api/municipios?provincia=${provincia.id}&campos=id,nombre&max=1000`;

    async function getData() {
      try {
        const data = await fetchData(urlProvincia);
        setMunicipios(data.municipios);
      } catch (error) {
        console.log(error);
      }
    }

    getData();
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

          {Boolean(municipios.length) ? (
            <Select
              options={municipiosFormatted}
              valueSelected={''}
              handleChange={() => ''}
            />
          ) : (
            <h4>
              {' '}
              No hay localidades para la provincia {
                provinciaSelected.label
              }{' '}
            </h4>
          )}
        </>
      )}
    </div>
  );
}
