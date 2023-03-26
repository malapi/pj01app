package com.example.application.model;

import java.util.List;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Id;
import jakarta.persistence.OneToMany;
import jakarta.persistence.SequenceGenerator;
import jakarta.validation.constraints.NotBlank;

import lombok.Getter;
import lombok.Setter;

@Entity 
public class Edificio {
   
      @Getter
      @Setter
      @Id
      @GeneratedValue(generator = "idedificiogenerador")
      @SequenceGenerator(name = "idedificiogenerador", initialValue = 1000)
      private Integer id;
    
      @Getter
      @Setter
      @NotBlank 
      private String nombre;
      @Getter
      @Setter
      @NotBlank 
      private String direccion;

      @OneToMany(mappedBy="edificio" )
      private List<Dependencia> dependencias;
      
      public Edificio() {

      }
    
      public Edificio(String nombre,String direccion) {
        this.nombre = nombre;
        this.direccion = direccion;
      }
    
      public List<Dependencia> getDependencias() {
        return dependencias;
    }

    public void setDependencias(List<Dependencia> dependencias) {
        this.dependencias = dependencias;
    }
}
