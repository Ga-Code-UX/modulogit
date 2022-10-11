// código da primeira tabela sobre o curso e as disciplinas

var dados =[];

function PopulaTabela(){
    //verificar se a variavel dados é um array
    if(Array.isArray(dados)){
        
        localStorage.setItem("__dados__", JSON.stringify(dados)); // usa o json.strinfy para transformar os dados
        $("#tblDados tbody").html(""); // limpando as  linhas das tabelas
        
        dados.forEach(function(item){
            //template string usando crase dentro do append para escrever as tabelas
            $("#tblDados tbody").append(`
            <tr>
                <td>${item.ID}</td>
                <td>${item.NomeCurso} </td>
                <td>${item.Semestre} </td>
                <td>${item.Disciplina1} </td>
                <td> ${item.Disciplina2} </td>
                <td> ${item.Disciplina3} </td>
    
              
                <td><button type="button" class="btn btn-dark" onclick="javascritp:EditaRegistro(${item.ID});"><i class="fa fa-edit" /></button></td>
                <td><button type="button" class="btn btn-primary" onclick="javascritp:ApagarRegistro(${item.ID});"><i class="fa fa-trash"/></button></td>
            </tr>
            
            `) // o apprend adicionar conteudo html dentro da tag tbody
           
        })
    
    }

}
//pedi id pro parametro
function ApagarRegistro(id){
    let _confirm = confirm("Deseja realmente excluir esse registro?"); // confirm em js abre a caixa de dialogo
    // se o usuário clica em Ok, o if abaixo executa se não não faz nada
    if(_confirm){
        for(let i = 0; i< dados.length;i++){
          /// esse loop varrerá e também analisará o array dados e para cada varredura irá perguntar se o ID do array é igual ao id que está recebendo por parametro
            if(dados[i].ID == id){
                dados.splice(i,1) // função splice apaga o elemento do array
            }
        }
        PopulaTabela(); //  escreve novamente as tabelas
    }
}  

function EditaRegistro(id){
    $("#modalRegistro").modal("show") // aqui vai abri a modal do registro (jquery)
    
    //abaixo com a varredura verifa  pelo id os campos que quer modificar e depois modifica
    dados.forEach(function(item){
        if(item.ID == id){
            $("#hdID").val(item.ID);
            $("#txtNomeCurso").val(item.NomeCurso);
            $("#txtSemestre").val(item.Semestre);
            $("#txtDisciplina1").val(item.Disciplina1);
            $("#txtDisciplina2").val(item.Disciplina2);
            $("#txtDisciplina3").val(item.Disciplina3);
           
        
          

        }
    })
}

$(function(){
    // executa o carregar da tela
    dados = JSON.parse(localStorage.getItem("__dados__"));// armazenando estruturação de json em formato de texto, leitura usual está executando no abri da tela
    
    if (dados != null) {
        PopulaTabela();
      }
    else{
        dados = [];
      }

    $("#btnSalvar").click(function(){
            //evento de clicar no butão salvar com jquery
            let _id = $("#hdID").val();
            let NomeCurso = $("#txtNomeCurso").val();
            let Semestre = $("#txtSemestre").val();
            let Disciplina1 = $("#txtDisciplina1").val();
            let Disciplina2 = $("#txtDisciplina2").val();
            let Disciplina3 = $("#txtDisciplina3").val();
        

          // val significa velho, entrega o valor digitado em um campo com o id passado no seletor, ou seja pega o id
            
            

            //essas linhas abaixo determna a criação dos registros
            if( !_id || _id == "0"){
                
                let registro = {};

                registro.NomeCurso = NomeCurso;
                registro.Semestre = Semestre;
                registro.Disciplina1 = Disciplina1;
                registro.Disciplina2 = Disciplina2;
                registro.Disciplina3 = Disciplina3;
                registro.ID = dados.length + 1;
                dados.push(registro); // ação de adição
            }
            else{
                dados.forEach(function(item){
                    if(item.ID == _id){
                        item.NomeCurso = NomeCurso;
                        item.Semestre = Semestre;
                        item.Disciplina1 = Disciplina1;
                        item.Disciplina2 = Disciplina2;
                        item.Disciplina3 = Disciplina3;
                    
                    }
                })
            }


            alert("registo salvo com sucesso");
            $("#modalRegistro").modal("hide");

            //Limpeza
            $("#hdID").val("0");
            $("#txtNomeCurso").val("");// para limpar os dados quando preenche o val() com aspas dentro ele limpa.
            $("#txtSemestre").val("");
            $("#txtDisciplina1").val("");
            $("#txtDisciplina2").val("");
            $("#txtDisciplina3").val("");
        
            PopulaTabela();
    });

})


