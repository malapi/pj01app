import { Button } from '@hilla/react-components/Button.js';
import { TextField } from '@hilla/react-components/TextField.js';
import {  useEffect, useState } from 'react';
import { EdificioEndpoint } from 'Frontend/generated/endpoints';
import Edificio from 'Frontend/generated/com/example/application/model/Edificio';
import { Details } from '@hilla/react-components/Details.js';
import { VerticalLayout } from '@hilla/react-components/VerticalLayout.js';


export default function HomeView() {
  const [edificios, setEdificios] = useState(Array<Edificio>());
  const [name, setName] = useState('');

  useEffect(() => {
    (async () => {
      setEdificios(await EdificioEndpoint.findAll());
    })();

    return () => {};
  }, []);


  async function filtrarEdificio(filterText: string ) {
    console.log("Estoy filtrando Edificio");
    const edificios = await EdificioEndpoint.findAll(); 
    setEdificios(edificios);
    if(filterText.trim().length > 0) {
      const edificiosfiltr = edificios.filter((t) => t.nombre 
        && ( (typeof t.nombre === 'string' && t.nombre.toLowerCase().includes(filterText.toLowerCase())) 
          || (typeof t.direccion  === 'string' && t.direccion.toLowerCase().includes(filterText.toLowerCase())) ) );
          setEdificios(edificiosfiltr);
    } 
  }
 
  return (
    <>
     <section className="flex p-m gap-m items-end">
        <TextField
          label="Filtrar Edificio"
          placeholder="Filtrar usando Edificio"
          onChange={(e: any) => filtrarEdificio(e.target.value)}
          onBlur={(e: any) => setName(e.target.value)}
         
        />
        <Button theme='success' onClick={async () => { filtrarEdificio(name); }}
        >
          Filtrar Edificio
        </Button>
      </section>
      
      {edificios && edificios.map(edificio => 
      <section key={Math.random()}>
          <h3 > <i>Nombre :</i> {edificio.nombre} <i>Direccion:</i> {edificio.direccion}</h3>
          <Details key={Math.random()}>
          <Button  theme="primary" slot='summary'>Ver +</Button>
          { edificio.dependencias?.map((una) =>
            <VerticalLayout key={Math.random()} >
            <span key={Math.random()}><b>Nombre : </b>{una?.nombre} <b>Direccion: </b> {una?.direccion}</span>
          </VerticalLayout>
          )}
          {edificio.dependencias && !edificio.dependencias.length &&
            <VerticalLayout key={Math.random()}>
               <span key={Math.random()}><b>No hay dependencias  para mostrar </b></span>
          </VerticalLayout>
      }
        </Details>
        </section>
      )}
      
     
     
    </>
  );
}
