// código da tabela 2 sobre os alunos incritos em determinado curso

var dadosAluno =[];

function PopulaTabelaAluno(){
    //verificar se a variavel dadosAluno é um array
    if(Array.isArray(dadosAluno)){
        
        localStorage.setItem("__dadosAlunos__", JSON.stringify(dadosAluno)); // usa o json.strinfy para transformar os dados
        $("#tblDados2 tbody").html(""); // limpando as  linhas das tabelas
        
        dadosAluno.forEach(function(item){
            //template string usando crase dentro do append para escrever as tabelas
            $("#tblDados2 tbody").append(`
            <tr>
                <td>${item.ID}</td>
                <td>${item.NomeCurso2} </td>
                <td>${item.Semestre2} </td>
                <td>${item.Nome_aluno} </td>
                <td> ${item.DtNascimentoAluno} </td>
                <td>${item.Nome_aluno1} </td>
                <td> ${item.DtNascimentoAluno1} </td>
                <td>${item.Nome_aluno2} </td>
                <td> ${item.DtNascimentoAluno2} </td>
              
                <td><button type="button" class="btn btn-dark" onclick="javascritp:EditaRegistroAluno(${item.ID});"><i class="fa fa-edit" /></button></td>
                <td><button type="button" class="btn btn-primary" onclick="javascritp:ApagarRegistroAluno(${item.ID});"><i class="fa fa-trash"/></button></td>
            </tr>
            
            `) // o apprend adicionar conteudo html dentro da tag tbody
           
        })
    
    }

}
//pedi idAluno para o parametro
function ApagarRegistroAluno(idAluno){
    let _confirmAluno = confirm("Deseja realmente excluir esse registro?"); // confirm em js abre a caixa de dialogo
    // se o usuário clica em Ok, o if abaixo executa se não não faz nada
    if(_confirmAluno){
        for(let x = 0; x < dadosAluno.length;x++){
          /// esse loop varrerá e também analisará o array dados e para cada varredura irá perguntar se o ID do array é igual ao id que está recebendo por parametro
            if(dadosAluno[x].ID == idAluno){
                dadosAluno.splice(x,1) // função splice apaga o elemento do array
            }
        }
        PopulaTabelaAluno(); //  escreve novamente as tabelas
    }
}  

function EditaRegistroAluno(idAluno){
    $("#modalRegistroAluno").modal("show") // aqui vai abri a modal do registro (jquery)
    
    //abaixo com a varredura verifa  pelo id os campos que quer modificar e depois modifica
    dadosAluno.forEach(function(item){
        if(item.ID == idAluno){
            $("#hdID2").val(item.ID);
            $("#txtNomeCurso2").val(item.NomeCurso2);
            $("#txtSemestre2").val(item.Semestre2);
            $("#txt_nome_aluno").val(item.Nome_aluno);
            $("#txtDtNascimentoAluno").val(item.DtNascimentoAluno.substr(6,4) + "-" + item.DtNascimentoAluno.substr(3,2) + "-" + item.DtNascimentoAluno.substr(0,2));
            $("#txt_nome_aluno1").val(item.Nome_aluno1);
            $("#txtDtNascimentoAluno1").val(item.DtNascimentoAluno1.substr(6,4) + "-" + item.DtNascimentoAluno1.substr(3,2) + "-" + item.DtNascimentoAluno1.substr(0,2));
            $("#txt_nome_aluno2").val(item.Nome_aluno2);
            $("#txtDtNascimentoAluno2").val(item.DtNascimentoAluno2.substr(6,4) + "-" + item.DtNascimentoAluno2.substr(3,2) + "-" + item.DtNascimentoAluno2.substr(0,2));
        }
    })
}

$(function(){
    // executa o carregar da tela
    dadosAluno = JSON.parse(localStorage.getItem("__dadosAlunos__"));// armazenando estruturação de json em formato de texto, leitura usual está executando no abri da tela
    
    if (dadosAluno != null) {
        PopulaTabelaAluno();
      }
    else{
        dadosAluno = [];
      }

    $("#btnSalvarAluno").click(function(){
            //evento de clicar no butão salvar com jquery
            let _idAluno = $("#hdID2").val();
            let NomeCurso2 = $("#txtNomeCurso2").val();
            let Semestre2 = $("#txtSemestre2").val();
            let Nome_aluno = $("#txt_nome_aluno").val();
            let DtNascimentoAluno = new Date ($("#txtDtNascimentoAluno").val()).toLocaleDateString("pt-br", {timeZone: "UTC"});
            let Nome_aluno1 = $("#txt_nome_aluno1").val();
            let DtNascimentoAluno1 = new Date ($("#txtDtNascimentoAluno1").val()).toLocaleDateString("pt-br", {timeZone: "UTC"});
            let Nome_aluno2 = $("#txt_nome_aluno2").val();
            let DtNascimentoAluno2 = new Date ($("#txtDtNascimentoAluno2").val()).toLocaleDateString("pt-br", {timeZone: "UTC"});
         ;

          // val significa velho, entrega o valor digitado em um campo com o id passado no seletor, ou seja pega o id
            
            

            //essas linhas abaixo determna a criação dos registros
            if( !_idAluno || _idAluno == "0"){
                
                let registroAluno = {};

                registroAluno.NomeCurso2 = NomeCurso2;
                registroAluno.Semestre2 = Semestre2;
                registroAluno.Nome_aluno = Nome_aluno;
                registroAluno.DtNascimentoAluno = DtNascimentoAluno;
                registroAluno.Nome_aluno1 = Nome_aluno1;
                registroAluno.DtNascimentoAluno1 = DtNascimentoAluno1;
                registroAluno.Nome_aluno2 = Nome_aluno2;
                registroAluno.DtNascimentoAluno2 = DtNascimentoAluno2;

                registroAluno.ID = dadosAluno.length + 1;
                dadosAluno.push(registroAluno); // ação de adição
            }
            else{
                dadosAluno.forEach(function(item){
                    if(item.ID == _idAluno){
                        item.NomeCurso2 = NomeCurso2;
                        item.Semestre2 = Semestre2;
                        item.Nome_aluno = Nome_aluno;
                        item.DtNascimentoAluno = DtNascimentoAluno;
                        item.Nome_aluno1 = Nome_aluno1;
                        item.DtNascimentoAluno1 = DtNascimentoAluno1;
                        item.Nome_aluno2 = Nome_aluno2;
                        item.DtNascimentoAluno2 = DtNascimentoAluno2;
                    }
                })
            }


            alert("Registo salvo com sucesso");
            $("#modalRegistroAluno").modal("hide");

            //Limpeza
            $("#hdID2").val("0");
            $("#txtNomeCurso2").val("");// para limpar os dados quando preenche o val() com aspas dentro ele limpa.
            $("#txtSemestre2").val("");
            $("#txt_nome_aluno").val("");
            $("#txtDtNascimentoAluno").val("");
            $("#txt_nome_aluno1").val("");
            $("#txtDtNascimentoAluno1").val("");
            $("#txt_nome_aluno2").val("");
            $("#txtDtNascimentoAluno2").val("");
           

            PopulaTabelaAluno();
    });

})