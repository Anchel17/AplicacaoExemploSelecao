# Atividade técnica - QUARKRH

# Autor
Anchel Vitor Varela da Silva

# Introdução
Projeto feito para avaliação técnica para a vaga de Desenvolvedor Full Stack na ESIG. O projeto consiste em um sistema de cadastro de funcionários, onde podemos realizar todas as operações de um CRUD. Além disso, foi implementado um sistema de autenticação, em que o usuário só poderá realizar determinadas ações no sistema se estiver autenticado e tiver nível de acesso para tal.

# Itens implementados
a) Criar uma aplicação Front-end utilizando Angular na versã mais recente.

b) Desenvolver o backend utilizando Java 21 e Spring Boot 3.

c) Utilizar persistência em um banco de dados PostgreSQL e persistência JPA.

d) Os endpoints devem ser em REST.

e) A aplicação deverá ter um controle de login por usuário e senha e os endpoints devem autenticar através de token JWT.

f) Utilizar testes de unidades.

# Requisitos para compilação
* Maven 3.9.2
* Java 21
* Node 18.19.1+
* PgAdmin4 PostgreSQL
* Recomendado: Terminal Git Bash

# Compilação
* Front-end: Abra a pasta quarkrh-web no seu terminal de preferência e execute o comando: npm install
* Back-end: Abra a pasta quarkrh-api no seu terminal de preferência e execute o comando: mvn clean install

# Execução
* Crie um novo banco de dados no pgAdmin4 com o nome: quarkrh
* Front-end: Com um terminal aberto na pasta quarkrh-web, execute o comando: npm start
* Back-end: Com um terminal aberto na pasta quarkrh-api, execute o comando: mvn spring-boot:run
## Alternativas de execução
* Front-end: Abra a pasta quarkrh-web pelo Vscode (File > Open Folder), abra o terminal do vscode e execute o comando npm start;
* Back-end: Abra o projeto quarkrh-api pelo Eclipse (File > Open Projects from File System... > Directory). Após isso, abra o pacote com.esig.quarkrh, clique com o botão direito no arquivo QuarkRhApplication.java > Run As > Java Application.

## Execução dos testes unitários
Clique com o botão direito do mouse sobre o projeto quarkrh > Coverage As > JUnit Test. 
Se preferir a linha de comando, basta executar na pasta raíz do projeto o comando: mvn clean test.
Obs.: Para visualizar melhor o caminho percorrido pelos testes unitários, é recomendada a instalação do plugin EclEmma, disponível no marketplace do Eclipse.
