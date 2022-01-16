import React from 'react';
import ReactDOM from 'react-dom';
import { App } from './App';
import { createServer, Model } from 'miragejs'


//fake api
createServer({
  //banco de dados interno do miraje
  models: {
    transaction: Model,
  },

  //dados estaticos no banco para ele não iniciar vazio
  // seeds(server) {
  //   server.db.loadData({
  //     transactions: [
  //       {
  //         id: 1,
  //         title: 'Freelance de website',
  //         type: 'deposit',
  //         category: 'DEV',
  //         amount: 6000,
  //         createdAt: new Date('2021-02-12 09:00:00')
  //       },
  //       {
  //         id: 2,
  //         title: 'Compras no supermercado',
  //         type: 'withdraw',
  //         category: 'Alimentação',
  //         amount: 6000,
  //         createdAt: new Date('2021-05-03 04:00:00')
  //       }
  //     ]
  //   })
  // },

  routes() {
    this.namespace = 'api';
    
    this.get('/transactions', () => {
      return this.schema.all('transaction') //retornando todas as transações que eu tenho no meu banco de dados 
    })

    this.post('/transactions', (schema, request) => {
      const data = JSON.parse(request.requestBody)

      //schema: banco de dados 
      return schema.create('transaction', data)
    })
  }
})

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);


