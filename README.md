# GoBarberAPI

API do projeto desenvolvido durante o Bootcamp GoStack11 da Rockeseat.

## Conceitos de engenharia de software:

**Requisitos Funcionais:** são as funcionalidades associadas à um dado módulo.

**Requisitos não-funcionais:** requisitos não associados à regra de negócio, mas está diretamente ligada com decisões técnicas.

**Regras de Negócio:** são as regras que direcionam o desenvolvimento do produto.


## Recuperação de Senha


**RF:**

* [ ] O usuário deve poder recuperar sua senha com o seu e-mail;
* [ ] O usuário deve receber um email com as instruções para recuperar a senha;
* [ ] O usuário deve poder resetar sua senha;

**RNF:**

* [ ] Utilizar mailtrap para testar envio de emails em desenvolvimento;
* [ ] Utilzar Amazon SES para envios em produção;
* [ ] O envio de emails deve acontecer em segundo plano (como se fosse um background job);


**RN:**

* [ ] O link enviado por email para reset da senha deve expirar em duas horas;
* [ ] O usuário precisa confirmar a nova senha ao resetar;
* [ ] O usuário não deve poder usar a senha antiga ao resetar a senha;

## Atualização do perfil

**RF:**

* [ ] O usuário deve poder atualizar seu nome, email e senha;
* [ ] A nova senha não pode ser igual à atual;

**RNF:**

N/A

**RN:**

* [ ] O novo email não pode ser o mesmo já usado por outro usuário;
* [ ] Para atualizar sua senha, ele deve fornecer a antiga;
* [ ] A nova senha deve ser confirmada;

## Painel do Prestador

**RF:**

* [ ] O prestador deve poder listar todos os seus agendamentos em um dia específico;
* [ ] O prestador deve receber uma notificação sempre que houver um novo agendamento;
* [ ] O prestador deve poder visualizar as notificações não lidas;

**RNF:**

* [ ] Os agendamentos no dia devem ser armazendos em cache;
* [ ] As notificações do prestador devem ser armazenadas no MongoDB;
* [ ] As notificações devem ser enviadas em tempo real usando Socket.io;

**RN:**

* [ ] A notificação deve ter um status de lida ou não lida, para que o prestador possa controlar;

## Agendamento de serviços

**RF:**

* [ ] O usuário deve listar todos os prestadores cadastrados;
* [ ] Ao selecionar o prestador, deve ser possível listar os dias de um mês com pelo menos um horário disponível para aquele prestador;
* [ ] O usuário deve poder listar os horários livres em um dia específico para um dado prestador;

**RNF:**

* [ ] A listagem de prestadores deve ser armazenada em cache (usando Redis);

**RN:**

* [ ] Todo agendamento deve durar uma hora;
* [ ] Os agendamentos devem estar disponíveis entre 8h e 18h (primeiro às 8:00 e último às 17:00);
* [ ] O usuário não pode agendar em um horário já ocupado;
* [ ] O usuário não pode agendar em um horário que já passou;
* [ ] O prestador não pode marcar um horário consigo mesmo;
