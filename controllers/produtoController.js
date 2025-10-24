const path = require("path");
const produtoModel = require("../models/produtoModel");

module.exports = {
  formCadastroProduto: (req, res) => {
    return res.render("produtos/cadastroProdutos", { 
      titulo: "Cadastro de Produto" 
    });
  },

  salvarProduto: (req, res) => {
    const { produtos, nome, descricao, preco, quantidade, categoria, tipo } = req.body;
    const produtoNovo = produtoModel.salvar({ produtos, nome, descricao, preco, quantidade, categoria, tipo });

    res.render("produtos/confirmacaoProduto", {
      tipo: "cadastro",
      titulo: "Cadastro Confirmado",
      produtoNovo
    });
  },

  listarProdutos: (req, res) => {
    const produtos = produtoModel.listarTodos();
    res.render("produtos/listaProdutos", { 
      produtos, 
      titulo: "Lista de Produtos" 
    });
  },

  buscarProduto: (req, res) => {
    const id = req.params.id;
    const produto = produtoModel.buscarPorId(id);

    if (!produto) {
      return res.status(404).render("produtos/erroProduto", {
        titulo: "Erro",
        mensagem: "Produto não encontrado"
      });
    }

    res.render("produtos/editarProdutos", {
      titulo: "Editar Produto",
      tipo: "edicao",
      produto
    });
  },

  atualizarProduto: (req, res) => {
    const id = req.params.id;
    const { nome, descricao, preco, quantidade, categoria, linkdeimagem } = req.body;

    const produtoAtualizado = produtoModel.atualizar(id, { 
      nome, descricao, preco, quantidade, categoria, linkdeimagem 
    });

    if (!produtoAtualizado) {
      return res.status(404).render("produtos/erroProduto", {
        titulo: "Erro",
        mensagem: "Não foi possível atualizar o produto"
      });
    }

    res.render("produtos/confirmacaoProduto", {
      titulo: "Edição Confirmada",
      tipo: "edicao",
      produtoAtualizado
    });
  },

  deletarProduto: (req, res) => {
    const id = req.params.id;
    const deletado = produtoModel.deletar(id);

    if (!deletado) {
      return res.status(404).render("produtos/erroProduto", {
        titulo: "Erro",
        mensagem: "Não foi possível deletar o produto"
      });
    }

    return res.status(200).render("produtos/confirmacaoProduto", {
      titulo: "Produto Deletado",
      tipo: "deletar",
      deletado
    });
  }
};