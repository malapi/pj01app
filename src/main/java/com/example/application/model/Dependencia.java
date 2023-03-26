package com.example.application.model;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.SequenceGenerator;
import jakarta.validation.constraints.NotBlank;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity 
@Getter @Setter @NoArgsConstructor
public class Dependencia {
   
      @Id
      @GeneratedValue(generator = "iddependenciagenerador")
      @SequenceGenerator(name = "iddependenciagenerador", initialValue = 1000)
      private Integer id;
      
      @NotBlank 
      private String nombre;
      @NotBlank 
      private String direccion;

      @ManyToOne
      @JoinColumn(name="edificio_id")
      @JsonIgnoreProperties({"dependencias"})
      private Edificio edificio;
 
      public Dependencia(String nombre,String direccion) {
        this.nombre = nombre;
        this.direccion = direccion;
      }
      public Dependencia(String nombre,String direccion,Edificio edificio) {
        this.nombre = nombre;
        this.direccion = direccion;
        this.edificio = edificio;
      }

     
}
