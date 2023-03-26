import { EndpointValidationError } from '@hilla/frontend';
import { Button } from '@hilla/react-components/Button.js';
import { TextField } from '@hilla/react-components/TextField.js';
import { ComboBox } from '@hilla/react-components/ComboBox.js';
import { Notification } from '@hilla/react-components/Notification.js';
import { FormikErrors, useFormik } from 'formik';
import Dependencia from 'Frontend/generated/com/example/application/model/Dependencia';
import { DependenciaEndpoint } from 'Frontend/generated/endpoints';
import { useEffect, useState } from 'react';

import Edificio from 'Frontend/generated/com/example/application/model/Edificio';
import { EdificioEndpoint } from 'Frontend/generated/endpoints';
import { Grid } from '@hilla/react-components/Grid.js';
import { GridFilterColumn } from '@hilla/react-components/GridFilterColumn.js';
import { GridColumn } from '@hilla/react-components/GridColumn.js';


export default function DependenciaView() {
    console.log("Aqui estoy creando el form dependencias");
  const empty: Dependencia = { nombre: '', direccion: '',  edificio : {} };
  const [dependencias, setDependencias] = useState(Array<Dependencia>());
  const [edificios, setEdificios] = useState(Array<Edificio>());
  const [selecteddependencia, /*setSelectedDependencias*/] =  useState(Array<Dependencia>());

  useEffect(() => {
    (async () => {
      setDependencias(await DependenciaEndpoint.findAll());
      //setSelectedDependencias(await DependenciaEndpoint.findAll());
      setEdificios(await EdificioEndpoint.findAll());
    })();

    return () => {};
  }, []);

  const createForm = useFormik({
    initialValues: empty,
    onSubmit: async (value: Dependencia, { setSubmitting, setErrors }) => {
      try {
        console.log("Aqui estoy key "+value.id);
        console.log("Aqui estoy edificio key "+JSON.stringify(value.edificio));
        //const theItem = (await EdificioEndpoint.findById(Number(value.edificio)));
        //value.edificio = theItem ;
        const saved = (await DependenciaEndpoint.save(value)) ?? value;
        console.log("Aqui estoy key"+value.id);
        
        if(value.id != null) {
          setDependencias(dependencias.map((item) => (item.id === value.id ? saved : item)));
          
        } else {
          setEdificios([...edificios, saved]);
        }
        createForm.resetForm();
      } catch (e: unknown) {
        if (e instanceof EndpointValidationError) {
          const errors: FormikErrors<Dependencia> = {};
          for (const error of e.validationErrorData) {
            if (typeof error.parameterName === 'string' && error.parameterName in empty) {
              const key = error.parameterName as string & keyof Dependencia;
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

  async function setSelectedDependencias(dependencias: Array<Dependencia>) {
    console.log("setSelectedDependencias:: voy a cargar el edifio ");
    console.log(dependencias);
    if(dependencias && dependencias.length > 0){
      console.log(dependencias[0]);
      createForm.setValues(dependencias[0]);
    
    }
    //createForm.setValues(dependencia);
  }
  
async function cargarDependencia(dependencia: Dependencia) {
  console.log("cargarDependencia:: "+dependencia.id);
  console.log("cargarDependencia:: "+dependencia);
  console.log(dependencia.edificio);
  createForm.setValues(dependencia);
}
  async function deleteDependencia(dependencia: Dependencia) {
    const deletedDependenciaId = await DependenciaEndpoint.delete(dependencia);
    if (deletedDependenciaId) {
      setDependencias(dependencias.filter((t) => t.id != deletedDependenciaId));
    }
  }

  
  async function filtrarEdificio(filterText: string ) {
    console.log("Estoy filtrando Edificio");
    const dependencias = await DependenciaEndpoint.findAll(); 
    setDependencias(dependencias);
    if(filterText.trim().length > 0) {
      const dependenciasfiltr = dependencias.filter((t) => t.edificio 
        && ( (typeof t.edificio?.nombre === 'string' && t.edificio?.nombre.toLowerCase().includes(filterText.toLowerCase())) 
          || (typeof t.edificio?.direccion  === 'string' && t.edificio?.direccion.toLowerCase().includes(filterText.toLowerCase())) ) );
      setDependencias(dependenciasfiltr);
    } 
    
   

  }

  
  return (
    <>
      <section className="m-m flex items-baseline gap-m">
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
       <ComboBox
            allowCustomValue
            label='Edificios'
            itemLabelPath='nombre'
            itemValuePath='id'
            value={createForm.values.edificio?.nombre}
            items={edificios}
            placeholder='Seleccionar'
            onChange={async item => {
                console.log(item.target.value);
                if(item.target.value != null){
                  const theItem = (await EdificioEndpoint.findById(Number(item.target.value)));
                  console.log(theItem);
                  if(theItem)
                     createForm.setFieldValue("edificio", theItem);
                }
                
              }}
            //onBlur={createForm.handleChange}
        />
       
        <Button  theme="primary"  disabled={createForm.isSubmitting} onClick={createForm.submitForm}>
         Guardar
        </Button>
        
      </section>
      

      
      <div>
      <section className="flex p-m gap-m items-end">

      <TextField
          name="filter"
          label="Filtrar Edificio"
          placeholder="Filtrar usando Edificio"
          onChange={(e: any) => filtrarEdificio(e.target.value)}
        />
        </section>
        <section className="flex p-m gap-m items-end">
      <Grid
          
          items={dependencias}
          selectedItems={selecteddependencia}
          onActiveItemChanged={({ detail: { value } }) => setSelectedDependencias(value ? [value] : [])}
        >
          <GridFilterColumn  path='nombre' />
          <GridFilterColumn  path='direccion' />
          <GridColumn header='Edificio'
            renderer={({ item }) => <span>{item.edificio.nombre} {item.edificio.direccion}</span>}
          />
         
          <GridColumn width="5%" header='#'
           renderer={({ item }) => <Button  theme='error small' onClick={() => deleteDependencia(item)}>Eliminar</Button>}
          />
          <GridColumn width="5%" header='#'
           renderer={({ item }) => <Button theme='secondary success small' onClick={() => cargarDependencia(item)}>Modificar</Button>}
          />
         
      </Grid>
      </section>
      </div> {/* Fin Div de la Grilla */}
      
            
            
    </>
  );
}