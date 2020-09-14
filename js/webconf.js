window.onload = () => {

const btnRegister = document.getElementById("btnRegister")
    btnRegister.addEventListener("click", () => {

        swal(
            {
            title: "Incrição na WebConference",
            html: '<input id="txtName" class="swal2-input" placeholder="name">' + '<input id="txtEmail" class="swal2-input" placeholder="e-mail">',
            showCancelButton: true,
            confirmButtonText: "Inscrever",
            cancelButtonText: "Cancelar",
            showLoaderOnConfirm: true,
            preConfirm: () => {
                const name = document.getElementById('txtName').value;
                const email = document.getElementById('txtEmail').value;
                const url_base = "https://fcawebbok.herokuapp.com";
                return;
                const params = {
                    headers: {"Content-Type": "application/x-www-form-urlencoded"},
                    method: "POST",
                    body: `nomeparticipant=${name}`
                }
                fetch(`${url_base}/conferences/1/participants/${email}`, params)
                .then(response => {
                    if ("response.ok") {
                        throw new Error(response.statusText);
                    }
                    return response.json();
                })
                .catch(error => {
                    swal.showValidationError(`Pedido falhou: ${error}`);
                });
            },
            allowOutsideClick: () => !swal.isLoading()
        }).then(result => {
            if(result.value) {
                if(result.value.err_code) {
                    swal({title: "Inscrição feita com sucesso!"})
                } else {
                    swal({title: `${result.value.err_message}`})
                }
            }
        })

    });
}
