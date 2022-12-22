
var principal = document.getElementById("principal");
var aumentaAltura = 83;
var pExibe = document.getElementById("conteudo");
var id = 1

function mostrar() {

    var inserindo = document.getElementById("texto").value;

    var x = {

        idt: id,
        texto: inserindo

    }

    var pNovo = document.createElement("p");
    pNovo.id = id++
    pNovo.innerHTML = x.texto
    pExibe.appendChild(pNovo)

    var editarButton = document.createElement("button");
    editarButton.onclick = function editar() {

        var escrevaAlgo = document.getElementById("botao");
        escrevaAlgo.value = "Editando";
        var pegarTexto = document.getElementById("texto");
        pegarTexto.value = x.texto;


        escrevaAlgo.addEventListener('click', function () {

            if (escrevaAlgo.value == "Editando") {

                var editandoP = document.getElementById(x.idt);
                editandoP.innerHTML = pegarTexto.innerHTML;

                pExibe.removeChild(pNovo);
                pExibe.removeChild(editarButton);
                pExibe.removeChild(excluirButton);

                aumentaAltura = (aumentaAltura - 83);

                principal.style.height = aumentaAltura + "px";

            }

            escrevaAlgo.value = "Escreva algo";



        })

    }

    pExibe.appendChild(editarButton);
    editarButton.innerHTML = "Editar";

    var excluirButton = document.createElement("button");
    excluirButton.onclick = function excluir() {

        pExibe.removeChild(pNovo);
        pExibe.removeChild(editarButton);
        pExibe.removeChild(excluirButton);
        aumentaAltura = (aumentaAltura - 83);

        principal.style.height = aumentaAltura + "px";

    }
    pExibe.appendChild(excluirButton);
    excluirButton.innerHTML = "Excluir";



    var entrada = document.getElementById("texto");
    entrada.value = "";

    aumentaAltura = (aumentaAltura + 83);

    principal.style.height = aumentaAltura + "px";

}

