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
                <td>${item.Disciplinas} </td>
                <td>${item.NomeProfessores} </td>
                <td> ${item.DtNascimentoProfessores} </td>
                <td> ${item.SalarioProfessores} </td>
                <td>${item.NomeAlunos}</td>
                <td>${item.DtNascimentoAlunos}</td>
                <td>${item.MatriculaAlunos}</td>
                <td>${item.NotaAlunos}</td>
              
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
            $("#txtDisciplinas").val(item.Disciplinas);
            $("#txtNomeProfessores").val(item.NomeProfessores);
            $("#txtDtNascimentoProfessores").val(item.DtNascimentoProfessores);
            $("#txtSalarioProfessores").val(item.SalarioProfessores);
            //$("#txtDtNascimentoProfessor").val(item.DtNascimentoProfessor.substr(6,4) + "-" + item.DtNascimentoProfessor.substr(3,2) + "-" + item.DtNascimentoProfessor.substr(0,2));
            $("#txtNomeAlunos").val(item.NomeAlunos);
            $("#txtDtNascimentoAlunos").val(item.DtNascimentoAlunos);
            $("#txtMatriculaAlunos").val(item.MatriculaAlunos);
            $("#txtNotaAlunos").val(item.NotaAlunos);

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
            let Disciplinas = $("#txtDisciplinas").val();
            let NomeProfessores = $("#txtNomeProfessores").val();
            let DtNascimentoProfessores = $("#txtDtNascimentoProfessores").val();
            let SalarioProfessores = $("#txtSalarioProfessores").val();
            let NomeAlunos = $("#txtNomeAlunos").val();
            let DtNascimentoAlunos= $("#txtDtNascimentoAlunos").val();
            let MatriculaAlunos = $("#txtMatriculaAlunos").val();
            let NotaAlunos = $("#txtNotaAlunos").val();

          // val significa velho, entrega o valor digitado em um campo com o id passado no seletor, ou seja pega o id
            
            

            //essas linhas abaixo determna a criação dos registros
            if( !_id || _id == "0"){
                
                let registro = {};

                registro.NomeCurso = NomeCurso;
                registro.Disciplinas = Disciplinas;
                registro.NomeProfessores = NomeProfessores;
                registro.DtNascimentoProfessores = DtNascimentoProfessores;
                registro.SalarioProfessores = SalarioProfessores;
                registro.NomeAlunos = NomeAlunos;
                registro.DtNascimentoAlunos = DtNascimentoAlunos;
                registro.MatriculaAlunos = MatriculaAlunos;
                registro.NotaAlunos = NotaAlunos;

                registro.ID = dados.length + 1;
                dados.push(registro); // ação de adição
            }
            else{
                dados.forEach(function(item){
                    if(item.ID == _id){
                        item.NomeCurso = NomeCurso;
                        item.Disciplinas = Disciplinas;
                        item.NomeProfessores = NomeProfessores;
                        item.DtNascimentoProfessores = DtNascimentoProfessores;
                        item.SalarioProfessores = SalarioProfessores;
                        item.NomeAlunos = NomeAlunos;
                        item.DtNascimentoAlunos = DtNascimentoAlunos;
                        item.MatriculaAlunos = MatriculaAlunos;
                        item.NotaAlunos = NotaAlunos;
                    }
                })
            }


            alert("registo salvo com sucesso");
            $("#modalRegistro").modal("hide");

            //Limpeza
            $("#hdID").val("0");
            $("#txtNomeCurso").val("");// para limpar os dados quando preenche o val() com aspas dentro ele limpa.
            $("#txtDisciplinas").val("");
            $("#txtNomeProfessores").val("");
            $("#txtDtNascimentoProfessores").val("");
            $("#txtSalarioProfessores").val("");
            $("#txtNomeAlunos").val("");
            $("#txtDtNascimentoAlunos").val("");
            $("#txtMatriculaAlunos").val("");
            $("#txtNotaAlunos").val("");

            PopulaTabela();
    });

})