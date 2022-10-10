// código da segunda tabela sobre os professores e seus respectivos salários

var dadosProfessor =[];

function PopulaTabelaProfessor(){
    //verificar se a variavel dados é um array
    if(Array.isArray(dadosProfessor)){
        
        localStorage.setItem("__dados__", JSON.stringify(dadosProfessor)); // usa o json.strinfy para transformar os dados
        $("#tblDados1 tbody").html(""); // limpando as  linhas das tabelas
        
        dadosProfessor.forEach(function(item){
            //template string usando crase dentro do append para escrever as tabelas
            $("#tblDados1 tbody").append(`
            <tr>
                <td>${item.ID}</td>
                <td>${item.NomeCurso1} </td>
                <td>${item.Semestre1} </td>
                <td>${item.Nome_professor_disciplina1} </td>
                <td> ${item.DtNascimento1} </td>
                <td> ${item.Salario1} </td>
                <td>${item.Nome_professor_disciplina2} </td>
                <td> ${item.DtNascimento2} </td>
                <td> ${item.Salario2} </td>
                <td>${item.Nome_professor_disciplina3} </td>
                <td> ${item.DtNascimento3} </td>
                <td> ${item.Salario3} </td>
            
              
                <td><button type="button" class="btn btn-dark" onclick="javascritp:EditaRegistroProfessor(${item.ID});"><i class="fa fa-edit" /></button></td>
                <td><button type="button" class="btn btn-primary" onclick="javascritp:ApagarRegistroProfessor(${item.ID});"><i class="fa fa-trash"/></button></td>
            </tr>
            
            `) // o apprend adicionar conteudo html dentro da tag tbody
           
        })
    
    }

}
//pedi id pro parametro
function ApagarRegistroProfessor(idProfessor){
    let _confirm = confirm("Deseja realmente excluir esse registro?"); // confirm em js abre a caixa de dialogo
    // se o usuário clica em Ok, o if abaixo executa se não não faz nada
    if(_confirm){
        for(let i = 0; i< dadosProfessor.length;i++){
          /// esse loop varrerá e também analisará o array dados e para cada varredura irá perguntar se o ID do array é igual ao id que está recebendo por parametro
            if(dadosProfessor[i].ID == idProfessor){
                dadosProfessor.splice(i,1) // função splice apaga o elemento do array
            }
        }
        PopulaTabelaProfessor(); //  escreve novamente as tabelas
    }
}  

function EditaRegistroProfessor(idProfessor){
    $("#modalRegistroProfessor").modal("show") // aqui vai abri a modal do registro (jquery)
    
    //abaixo com a varredura verifa  pelo id os campos que quer modificar e depois modifica
    dadosProfessor.forEach(function(item){
        if(item.ID == idProfessor){
            $("#hdID1").val(item.ID);
            $("#txtNomeCurso1").val(item.NomeCurso);
            $("#txtSemestre1").val(item.Semestre);
            $("#txt_nome_professor_disciplina1").val(item.Nome_professor_disciplina1);
            $("#txtDtNascimento1").val(item.DtNascimento1.substr(6,4) + "-" + item.DtNascimento1.substr(3,2) + "-" + item.DtNascimento1.substr(0,2));
            $("#txtSalario1").val(item.Salario1);
            $("#txt_nome_professor_disciplina2").val(item.Nome_professor_disciplina2);
            $("#txtDtNascimento2").val(item.DtNascimento2.substr(6,4) + "-" + item.DtNascimento2.substr(3,2) + "-" + item.DtNascimento2.substr(0,2));
            $("#txtSalario2").val(item.Salario2);
            $("#txt_nome_professor_disciplina3").val(item.Nome_professor_disciplina3);
            $("#txtDtNascimento3").val(item.DtNascimento3.substr(6,4) + "-" + item.DtNascimento3.substr(3,2) + "-" + item.DtNascimento3.substr(0,2));
            $("#txtSalario3").val(item.Salario3);
        }
    })
}

$(function(){
    // executa o carregar da tela
    dadosProfessor = JSON.parse(localStorage.getItem("__dados__"));// armazenando estruturação de json em formato de texto, leitura usual está executando no abri da tela
    
    if (dadosProfessor != null) {
        PopulaTabelaProfessor();
      }
    else{
        dadosProfessor = [];
      }

    $("#btnSalvarProfessor").click(function(){
            //evento de clicar no butão salvar com jquery
            let _idProfessor = $("#hdID1").val();
            let NomeCurso1 = $("#txtNomeCurso1").val();
            let Semestre1 = $("#txtSemestre1").val();
            let Nome_professor_disciplina1 = $("#txt_nome_professor_disciplina1").val();
            let DtNascimento1 = $("#txtDtNascimento1").val();
            let Salario1 = $("#txtSalario1").val();
            let Nome_professor_disciplina2 = $("#txt_nome_professor_disciplina2").val();
            let DtNascimento2 = $("#txtDtNascimento2").val();
            let Salario2 = $("#txtSalario2").val();
            let Nome_professor_disciplina3 = $("#txt_nome_professor_disciplina3").val();
            let DtNascimento3 = $("#txtDtNascimento3").val();
            let Salario3 = $("#txtSalario3").val();
         ;

          // val significa velho, entrega o valor digitado em um campo com o id passado no seletor, ou seja pega o id
            
            

            //essas linhas abaixo determna a criação dos registros
            if( !_idProfessor || _idProfessor == "0"){
                
                let registroProfessor = {};

                registroProfessor.NomeCurso1 = NomeCurso1;
                registroProfessor.Semestre1 = Semestre1;
                registroProfessor.Nome_professor_disciplina1 = Nome_professor_disciplina1;
                registroProfessor.DtNascimento1 = DtNascimento1;
                registroProfessor.Salario1 = Salario1;
                registroProfessor.Nome_professor_disciplina2 = Nome_professor_disciplina2;
                registroProfessor.DtNascimento2 = DtNascimento2;
                registroProfessor.Salario2 = Salario2;
                registroProfessor.Nome_professor_disciplina3 = Nome_professor_disciplina3;
                registroProfessor.DtNascimento3 = DtNascimento3;
                registroProfessor.Salario3 = Salario3;

                registroProfessor.ID = dadosProfessor.length + 1;
                dadosProfessor.push(registroProfessor); // ação de adição
            }
            else{
                dadosProfessor.forEach(function(item){
                    if(item.ID == _idProfessor){
                        item.NomeCurso1 = NomeCurso1;
                        item.Semestre1 = Semestre1;
                        item.Nome_professor_disciplina1 = Nome_professor_disciplina1;
                        item.DtNascimento1 = DtNascimento1;
                        item.Salario1 = Salario1;
                        item.Nome_professor_disciplina2 = Nome_professor_disciplina2;
                        item.DtNascimento2 = DtNascimento2;
                        item.Salario2 = Salario2;
                        item.Nome_professor_disciplina3 = Nome_professor_disciplina3;
                        item.DtNascimento3 = DtNascimento3;
                        item.Salario3 = Salario3;
                    }
                })
            }


            alert("Registo salvo com sucesso");
            $("#modalRegistroProfessor").modal("hide");

            //Limpeza
            $("#hdID1").val("0");
            $("#txtNomeCurso1").val("");// para limpar os dados quando preenche o val() com aspas dentro ele limpa.
            $("#txtSemestre1").val("");
            $("#txt_nome_professor_disciplina1").val("");
            $("#txtDtNascimento1").val("");
            $("#txtSalario1").val("");
            $("#txt_nome_professor_disciplina2").val("");
            $("#txtDtNascimento2").val("");
            $("#txtSalario2").val("");
            $("#txt_nome_professor_disciplina3").val("");
            $("#txtDtNascimento3").val("");
            $("#txtSalario3").val("");

            PopulaTabelaProfessor();
    });

})