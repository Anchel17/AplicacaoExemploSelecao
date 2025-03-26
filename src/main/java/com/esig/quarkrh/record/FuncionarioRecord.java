package com.esig.quarkrh.record;

import java.time.LocalDate;

public record FuncionarioRecord(String nome, String cargo, Double salario, LocalDate dataAdmissao) {}
