package com.example.application.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.application.model.Dependencia;

public interface DependenciaRepository extends JpaRepository<Dependencia, Integer> {
}
