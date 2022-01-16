import Modal from "react-modal";
import { FormEvent, useContext, useState } from "react";
import { Container, RadioBox, TrasactionTypeContainer } from "./styles";

import closeImg from "../../assets/close.svg";
import incomeImg from "../../assets/income.svg";
import outcomeImg from "../../assets/outcome.svg";

import { TransactionsContext } from "../../TransactionsContext";

interface NewTransactionModalProps {
  isOpen: boolean;
  onRequestClose: () => void;
}

export function NewTransactionModal({isOpen, onRequestClose }: NewTransactionModalProps) {
  
  const { createTransaction } = useContext(TransactionsContext);
  
  //recebendo valores dos inputs do form
  const [title, setTitle] = useState(""); //titulo iniciando vazio
  const [amount, setAmount] = useState(0); //valor iniciando 0
  const [category, setCategory] = useState("");

  //qual botão foi clicado type de transação
  const [type, setType] = useState("deposit");

  //função disparada através do submit do meu form-Container
  async function handleCreateNewTransaction(event: FormEvent) {
    //previnir o funcionamento padrão
    event.preventDefault();

    await createTransaction({
      title,
      amount,
      category, 
      type
    })
    
    setTitle('');
    setAmount(0);
    setCategory('');
    setType('deposit');

    onRequestClose();
  }

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      overlayClassName="react-modal-overlay"
      className="react-modal-content"
    >
      <button
        type="button"
        onClick={onRequestClose}
        className="react-modal-close"
      >
        <img src={closeImg} alt="Fechar modal" />
      </button>

      <Container onSubmit={handleCreateNewTransaction}>
        <h2>Cadastrar Transação</h2>

        <input
          placeholder="Título"
          value={title}
          onChange={(event) => setTitle(event.target.value)} //executa toda vez que o valor do input for mudado, acesso ao valor digitado no input
        />

        <input
          placeholder="Valor"
          value={amount}
          onChange={(event) => setAmount(Number(event.target.value))} //input nunber precisa converter para algo numerico 
        />

        <TrasactionTypeContainer>
          <RadioBox
            type="button"
            onClick={() => {
              setType("deposit");
            }} //arraw function, que muda o estado
            isActive={type == "deposit"} //proprieda do styled-components
            // className={type == 'deposit' ? 'active' : ''} //caso a classe seja deposit, deixar ativo, se não deixar vazio
            activeColor="green"
          >
            <img src={incomeImg} alt="Entrada" />
            <span>Entrada</span>
          </RadioBox>

          <RadioBox
            type="button"
            onClick={() => {
              setType("withdraw");
            }}
            isActive={type === "withdraw"}
            activeColor="red"
          >
            <img src={outcomeImg} alt="Saída" />
            <span>Saída</span>
          </RadioBox>
        </TrasactionTypeContainer>

        <input
          placeholder="Categoria"
          value={category}
          onChange={(event) => setCategory(event.target.value)}
        />

        <button type="submit">Cadastrar</button>
      </Container>
    </Modal>
  );
}
