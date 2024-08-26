function reset_form() {
    let reset = $(".form-control").val('').focus();
  }
  
  function toggleValidation() {
    let selection = document.getElementById("txgaji").value;
    let inputField = document.getElementById("txpersenpokok");

    if (selection == "0") {
        // Mengubah label sesuai dengan pilihan persentase
        document.getElementById("label-persent-amount").innerText = "Persen Pokok / Perhari";
        inputField.placeholder = "Masukkan Berapa Persen";
    } else if (selection == "1") {
        // Mengubah label sesuai dengan pilihan amount
        document.getElementById("label-persent-amount").innerText = "Amount / Perhari";
        inputField.placeholder = "Masukkan Amount";
    }
}

function validateInput() {
    let selection = document.getElementById("txgaji").value;
    let inputField = document.getElementById("txpersenpokok");

    if (selection == "0") { 
        // Jika pilih "persent"
        onmaxPersent(inputField, 100);
        onminPersent(inputField, 0);
    } else if (selection == "1") {
        // Jika pilih "amount"
        onmaxAmount(inputField);
        onminAmount(inputField);
    }
}

function onmaxPersent(input, max) {
    if (input.value > max) {
        input.value = max;
    }
}

function onminPersent(input, min) {
    if (input.value < min) {
        input.value = min;
    }
}

function onmaxAmount(input) {
    let amount = parseFloat(document.getElementById("txgajiTotal").value.replace(/,/gi, "")) || 0;

    if (parseFloat(input.value) > amount) {
        input.value = amount;
    }
}

function onminAmount(input) {
    if (parseFloat(input.value) < 0) {
        input.value = 0;
    }
}

  function Pembagian() {
    var amt = parseFloat($('[name="txnominal"]').val().replace(/,/gi, ""));
    var div = parseFloat($('[name="txday"]').val().replace(/,/gi, ""));
    $('[name="txgajiTotal"]').val("");
    if (amt > 0 && div > 0) {
      nom = parseInt(amt / div);
      $('[name="txgajiTotal"]').val(desimal(nom));
    }
  }

function togglePersentAmount() {
  var setengahHariValue = document.getElementById('txsetengahhari').value;
  var persentAmountDropdown = document.getElementById('txgaji');
  var inputField = document.getElementById('txpersenpokok');
  var label = document.getElementById('label-persent-amount');

  if (setengahHariValue === "0") {
    persentAmountDropdown.disabled = false;
    amountandpercen();
  } else {
    persentAmountDropdown.disabled = true;
    persentAmountDropdown.value = "";
    label.textContent = "Persen Pokok / Perhari";
    inputField.disabled = true;
    inputField.value = ""; 
    inputField.placeholder = "";
  }
}

function amountandpercen() {
  var persentAmountValue = document.getElementById('txgaji').value;
  var label = document.getElementById('label-persent-amount');
  var inputField = document.getElementById('txpersenpokok');

  if (persentAmountValue === "0") {
    label.textContent = "Persen Pokok / Perhari";
    inputField.disabled = false;
    inputField.placeholder = "Masukkan Berapa Persen";
  } else if (persentAmountValue === "1") {
    label.textContent = "Amount Pokok / Perhari";
    inputField.disabled = false;
    inputField.placeholder = "Masukkan Amount";
  } else {
    inputField.disabled = true;
    inputField.placeholder = "";
    inputField.value = "";
  }
}


  
  function load_data() {
    $.post("golongan/load_data",
        {
  
        },
        function (data) {
            console.log(data)
            $("#table2").DataTable().clear().destroy()
            $("#table2 > tbody").html('');
            $.each(data.golongan, function (idx, val) {
                html = '<tr>'
                html += '<td>' + val['levelgroupCode'] + '</td>'
                html += '<td>' + val['levelgroupName'] + '</td>'
                html += '<td>' + desimal(val['levelgroupAmount']) + '</td>'
                html += '<td><span onclick="active_data(' + val['levelgroupId'] + ',' + val['levelgroupActive'] + ')" class="badge ' + ((val['levelgroupActive'] == '1') ? 'bg-success' : 'bg-danger') + ' ">' + ((val['levelgroupActive'] == '1') ? 'Active' : 'Inactive') + '</span></td>'
                html += '<td><button class="btn btn-warning btn-sm btn-edit"  onclick="edit_data(' + val['levelgroupId'] + ')">Edit</button></td>'
                html += '<td><button class="btn btn-danger btn-sm " onclick="hapus_data(' + val['levelgroupId'] + ')">Hapus</button></td>'
                html += '</tr>'
                $("#table2 > tbody").append(html);
            });
            
            $("#table2").DataTable({
                responsive: true,
                processing: true,
                pagingType: 'first_last_numbers',
                // order: [[0, 'asc']],
                dom:
                    "<'row'<'col-3'l><'col-9'f>>" +
                    "<'row dt-row'<'col-sm-12'tr>>" +
                    "<'row'<'col-4'i><'col-8'p>>",
                "language": {
                    "info": "Page _PAGE_ of _PAGES_",
                    "lengthMenu": "_MENU_",
                    "search": "",
                    "searchPlaceholder": "Search.."
                }
            });
  
        }, 'json');
  }
  function simpan_data() {
    let code = $("#txcode").val();
    let name = $("#txname").val();
    let nominal = $("#txnominal").val().replace(/\./g, '');  
    let hari = $("#txday").val();
    let totalGaji = $("#txgajiTotal").val().replace(/\./g, ''); 
    let halfgaji = $("#txsetengahhari").val()
    let gaji = $("#txgaji").val();
    let persentPokok = $("#txpersenpokok").val();
    if (code === "" || name === ""|| nominal === "") {
        Swal.fire({
            title: 'Error!',
            text: "Ada Form belum dimasukkan!!!",
            icon: 'error',
            confirmButtonText: 'OK'
        });
    } else {
        $.post("golongan/create", {
          txcode: code,
          txname: name,
          txnominal: nominal,
          txhari: hari,
          txgajiTotal: totalGaji,  // Sesuaikan nama variabel dengan yang digunakan dalam PHP
          txhalfgaji: halfgaji,
          txgaji: gaji,
          txpersentPokok: persentPokok,
        },
            function (data) {
                console.log(data.status);
                if (data.status === "error") {
                    Swal.fire({
                        title: 'Error!',
                        text: data.msg,
                        icon: 'error',
                        confirmButtonText: 'OK'
                    });
                } else {
                    Swal.fire({
                        title: 'Success!',
                        text: data.msg,
                        icon: 'success',
                        confirmButtonText: 'OK'
                    });
                    reset_form();
                    $("#loginModal").modal('hide');
                }
            }, 'json');
    }
  }
  function update_data()
  {
  var id = $("#loginModal").data('id');
  let golonganCode = $("#txcode").val();
  let golonganName = $("#txname").val();
  let golonganNominal = $("#txnominal").val();
  let golonganDay = $("#txday").val();
  let golonganGaji = $("#txgajiTotal").val();
  let golonganHalfDay = $("#txsetengahhari").val();
  let golonganPA = $("#txgaji").val();
  let golonganHalfAmount = $("#txpersenpokok").val();
  
  if (golonganCode === "" || golonganName === ""|| golonganNominal === ""||golonganDay === ""|| golonganGaji === ""|| golonganHalfDay === ""|| golonganPA === ""|| golonganHalfAmount === ""){
    Swal.fire({
      title: 'Error!',
      text: data.msg,
      icon: 'error',
      confirmButtonText: 'OK'
    })
  }else{
    $.post('golongan/update_table', { id: id, levelgroupCode: golonganCode, levelgroupName: golonganName, levelgroupAmount: golonganNominal, levelgroupDivide: golonganDay, levelgroupNominal: golonganGaji, levelgroupHalfDay: golonganHalfDay, levelgroupHalfPercent: golonganPA, levelgroupHalfAmount: golonganHalfAmount}, function(data) {
      if (data.status === 'success') {
        Swal.fire({
          title: 'Success!',
          text: data.msg,
          icon: 'success',
          confirmButtonText: 'OK'
        }).then(() => {
          load_data();
        });
      } else {
        Swal.fire({
          title: 'Error!',
          text: data.msg,
          icon: 'error',
          confirmButtonText: 'OK'
        })
      }
  }, 'json');
  }}
  
  function edit_data(id) {
    $.post('golongan/edit_table', { id: id }, function (data) {
        if (data.status === 'ok') {
          $("#txcode").val(data.data.levelgroupCode);
          $("#txname").val(data.data.levelgroupName);
          $("#txnominal").val(desimal(data.data.levelgroupAmount));
          $("#txday").val(data.data.levelgroupDivide);
          $("#txgajiTotal").val(desimal(data.data.levelgroupNominal));
          $("#txsetengahhari").val(data.data.levelgroupHalfDay);
          $("#txgaji").val(data.data.levelgroupHalfPercent);
          $("#txpersenpokok").val(desimal(data.data.levelgroupHalfAmount));
            $("#loginModal").data('id', id); 
            $("#loginModal").modal('show');
            $(".btn-submit").hide();
            $(".btn-editen").show();

        } else {
          Swal.fire({
            title: 'Error!',
            text: data.msg,
            icon: 'error',
            confirmButtonText: 'OK'
          })
        }
    }, 'json');
  }
  
  function hapus_data(id) {
    Swal.fire({
        title: 'Apakah kamu ingin menghapus data?',
        showDenyButton: true,
        showCancelButton: true,
        denyButtonText: 'No',
        confirmButtonText: 'Yes',
        customClass: {
            actions: 'my-actions',
            cancelButton: 'order-1 right-gap',
            confirmButton: 'order-2',
            denyButton: 'order-3',
        },
    }).then((result) => {
        if (result.isConfirmed) {
            $.post('golongan/delete_table', { id: id }, function (data) {
                if (data.status === 'success') {
                    Swal.fire({
                        title: 'Succes!',
                        text: data.msg,
                        icon: 'success',
                        confirmButtonText: 'OK'
                    }).then(() => {
                        load_data();
                    });
                } else {
                    Swal.fire({
                        title: 'Error!',
                        text: data.msg,
                        icon: 'error',
                        confirmButtonText: 'OK'
                    })
                }
            }, 'json');
        } else if (result.isDenied) {
            Swal.fire('Perubahan tidak tersimpan', '', 'info')
        }
    })
  }
  function active_data(id, status) {
    if (status == 1) {
      Swal.fire({
        title: 'Konfirmasi',
        text: 'Apakah Anda Ingin MENONAKTIFKAN data ini?',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Ya, Nonaktifkan',
        cancelButtonText: 'Batal'
      }).then((result) => {
        if (result.isConfirmed) {
          $.post('golongan/active', { id: id }, function(data) {
            if (data.status === 'success') {
              Swal.fire({
                title: 'Success!',
                text: data.msg,
                icon: 'success',
                confirmButtonText: 'OK'
              }).then(() => {
                $("#loginModal").modal('hide');
                load_data();
              });
            } else {
              Swal.fire({
                title: 'Gagal!',
                text: data.msg,
                icon: 'error',
                confirmButtonText: 'OK'
              });
            }
          }, 'json');
        }
      });
    } else {
      Swal.fire({
        title: 'Konfirmasi',
        text: 'Apakah Anda Ingin MENGAKTIFKAN data ini?',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Ya, Aktifkan',
        cancelButtonText: 'Batal'
      }).then((result) => {
        if (result.isConfirmed) {
          $.post('golongan/active', { id: id }, function(data) {
            if (data.status === 'success') {
              Swal.fire({
                title: 'Sukses!',
                text: data.msg,
                icon: 'success',
                confirmButtonText: 'OK'
              }).then(() => {
                $("#loginModal").modal('hide');
                load_data();
              });
            } else {
              Swal.fire({
                title: 'Gagal!',
                text: data.msg,
                icon: 'error',
                confirmButtonText: 'OK'
              });
            }
          }, 'json');
        }
      });
    }
  }

  function desimal(input) {
    if (!input) return "";
    
    input = input.toString().replace(/,/g, ''); // Menghapus koma sebelumnya
    var parts = input.split(".");
    parts[0] = parts[0].split("").reverse().join("").replace(/(\d{3})(?!$)/g, "$1,").split("").reverse().join("");
    return parts.join(".");
}
  
  $(document).ready(function () {
    $(".btn-closed").click(function () {
        reset_form()
    });
  
    $(".btn-add").click(function () {
         reset_form();
        $(".btn-submit").show();
        $(".btn-editen").hide();
    })
    $(".btn-add").click(function () {
        $(".btn-submit").show();
        $(".btn-editen").hide();
    })
    $(".page-title").html("Insurance")
    $(".tit").html("Insurance")

    $("body").on('keyup', '.angka', function (e) {
      // Menghapus karakter yang bukan angka atau titik
      if (this.value != this.value.replace(/[^0-9\.]/g, '')) {
          this.value = this.value.replace(/[^0-9\.]/g, '');
      }
      // Memformat angka dengan pemisah ribuan
      $(this).val(desimal($(this).val()));
  });
  
  // Ketika input dengan class angka focus, maka nilainya diselect semua
  $("body").on('focus', '.angka', function (e) {
      $(this).select();
  });
  
    load_data();
    cekIsHalf()
  }); js