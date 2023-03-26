import { EndpointValidationError } from '@hilla/frontend';
import { Button } from '@hilla/react-components/Button.js';
import { Grid } from '@hilla/react-components/Grid.js';
import { GridColumn } from '@hilla/react-components/GridColumn.js';
import { Notification } from '@hilla/react-components/Notification.js';
import { GridFilterColumn } from '@hilla/react-components/GridFilterColumn.js';
import { TextField } from '@hilla/react-components/TextField.js';
import { FormikErrors, useFormik } from 'formik';
import Edificio from 'Frontend/generated/com/example/application/model/Edificio';
import { EdificioEndpoint } from 'Frontend/generated/endpoints';
import {  useEffect, useState } from 'react';

export default function EdificioView() {
    console.log("Aqui estoy 1");
  const empty: Edificio = { nombre: '', direccion: '' };
  const [edificios, setEdificios] = useState(Array<Edificio>());
  const [edificiosseleccionado] = useState(Array<Edificio>());

  useEffect(() => {
    (async () => {
      setEdificios(await EdificioEndpoint.findAll());
      //setSelectedEdificios(await EdificioEndpoint.findAll());
    })();

    return () => {};
  }, []);

  const createForm = useFormik({
    initialValues: empty,
    onSubmit: async (value: Edificio, { setSubmitting, setErrors }) => {
      try {
        console.log("Aqui estoy key "+value.id);
        const saved = (await EdificioEndpoint.save(value)) ?? value;
        console.log("Aqui estoy key"+value.id);
        
        if(value.id != null) {
        
          setEdificios(edificios.map((item) => (item.id === value.id ? saved : item)));
          
         } else {
          setEdificios([...edificios, saved]);
         }
        createForm.resetForm();
      } catch (e: unknown) {
        if (e instanceof EndpointValidationError) {
          const errors: FormikErrors<Edificio> = {};
          for (const error of e.validationErrorData) {
            if (typeof error.parameterName === 'string' && error.parameterName in empty) {
              const key = error.parameterName as string & keyof Edificio;
              errors[key] = error.message;
            }
          }
          setErrors(errors);
          Notification.show("Mensaje "+JSON.stringify(errors));
    
        }
      } finally {
        setSubmitting(false);
      }
    },
  });
  
async function cargarEdificio(edificio: Edificio) {
  console.log("cargarEdificio:: voy a cargar el edifio "+edificio.id);
  createForm.setValues(edificio);
}
  
async function cargarEdificioSeleccionado(edificioSel: Array<Edificio>) {
  if(edificioSel.length > 0) {
    console.log("cargarEdificio:: voy a cargar el edifio "+edificioSel[0].id);
    createForm.setValues(edificioSel[0]);
  }
  
}
  async function deleteEdificio(edificio: Edificio) {
    try{
      const deletedEdificioId = await EdificioEndpoint.delete(edificio);
    if (deletedEdificioId) {
      setEdificios(edificios.filter((t) => t.id != deletedEdificioId));
    } else {
      console.log("error al borrar")
    }
  } catch (error) {
    console.log("Estoy en el cath");
    console.log("Mensaje "+error);
    Notification.show("Mensaje "+error);
    //console.log(error);
    //console.log(errors);
    
  }
  }
 

  return (
    <>
      <div className="m-m flex items-baseline gap-m">
        <TextField
          name="nombre"
          label="Nombre"
          value={createForm.values.nombre}
          onChange={createForm.handleChange}
          onBlur={createForm.handleChange}
        />
        <TextField
          name="direccion"
          label="Direccion"
          value={createForm.values.direccion}
          onChange={createForm.handleChange}
          onBlur={createForm.handleChange}
        />
        <Button theme="primary" disabled={createForm.isSubmitting} onClick={createForm.submitForm}>
          Guardar
        </Button>
      </div>

      <Grid
          items={edificios}
          selectedItems={edificiosseleccionado}
          onActiveItemChanged={({ detail: { value } }) => cargarEdificioSeleccionado(value ? [value] : [])}
        >
          <GridFilterColumn  path='nombre' width="10%" />
          <GridFilterColumn  path='direccion' width="10%" />
          
          {/*<GridColumn width="30%"
             header='Dependencias'
             renderer={({ item }) => <div> { item.dependencias?.map((una: any) => <span key={una.id}> {una.nombre} {una.direccion} <br></br> </span>   )}</div>}
            
  />*/}
          <GridColumn width="10%" header=''
           renderer={({ item }) => <Button theme='secondary error small' onClick={() => deleteEdificio(item)}>Eliminar</Button>}
          
          />
          <GridColumn header='#'
           renderer={({ item }) => <Button theme='secondary success small' onClick={() => cargarEdificioSeleccionado(item)}>Modificar</Button>}
          />
          
         
      </Grid>
      
       </>
  );
}