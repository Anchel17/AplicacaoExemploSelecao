package com.esig.quarkrh.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.esig.quarkrh.entity.Funcionario;
import com.esig.quarkrh.record.FuncionarioRecord;

@Repository
public interface FuncionarioRepository extends JpaRepository<Funcionario, Long>{
}
