function reset_form() {
  let kosong = $(".form-control").val('');
  let kosong1 =$(".form-select").val('');
}

function load_data() {
    $.post("department/load_data",
        {
            
        },
        function (data) {
            console.log(data)
            $("#table2").DataTable().clear().destroy()
            $("#table2 > tbody").html('');
            $.each(data.department, function (idx, val) {
                html = '<tr>'
                html += '<td>' + val['departmentCode'] + '</td>'
                html += '<td>' + val['departmentName'] + '</td>'
                html += '<td>' + val['divisionName'] + '</td>'
                html += '<td><span onclick="active_data(' + val['departmentId'] + ',' + val['departmentActive'] + ')" class="badge ' + ((val['departmentActive'] == '1') ? 'bg-success' : 'bg-danger') + ' ">' + ((val['departmentActive'] == '1') ? 'Active' : 'Inactive') + '</span></td>'
                html += '<td><button class="btn btn-warning btn-sm btn-edit"  onclick="edit_data1(' + val['departmentId'] + ')">Edit</button></td>'
                html += '<td><button class="btn btn-danger btn-sm " onclick="confirmDelete(' + val['departmentId'] + ')">Delete</button></td>'
                html += '</tr>'
                $("#table2 > tbody").append(html);
            });
            $("#table2").DataTable({
                responsive: true,
                processing: true,
                pagingType: 'first_last_numbers',
                order:[[0, 'desc']],
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
            document.getElementById('spinner').style.display = 'none';
            document.getElementById('refreshIcon').style.display = 'inline-block';
        }, 'json');
}

function load_cabang(){
    $.post('department/load_division', function( res ){
        $("#txdivisi").empty()

        $("#txdivisi").append('<option value = "">Pilih Divisi</option>')

        $.each( res.division , function ( i, v) {
            $("#txdivisi").append('<option value = "'+ v.divisionId+'">'+ v.divisionName+'</option>')             
        }
        ) 
    }, 'json');
}


  
  function active_data(id, status) {
    $.confirm({
      title: 'Ubah status',
      content: 'Yakin ingin mengubah status?',
      theme: 'dark',
      buttons: {
        Ubah: function () {
          if (status === 1) {
            $.post('department/active', { id: id, status: status }, function (data) {
              if (data.status === 'success') {
                $.dialog({
                  title: 'Status Diubah!',
                  content: 'status berhasil di non-aktifkan',
                  theme: 'dark',
                });
                $("#loginModal").modal('hide');
              } else {
                alert(data.msg);
              }
              load_data()
            }, 'json')
          } else {
            if (status === 0) {
              $.post('department/active', { id: id, status: status }, function (data) {
                if (data.status === 'success') {
                  $.dialog({
                    title: 'Status Diubah!',
                    content: 'status berhasil di aktifkan',
                    theme: 'dark',
                  });
                  $("#loginModal").modal('hide');
                } else {
                  alert(data.msg);
                }
                load_data()
              }, 'json')
            }
          }
        },
        Batal: function () {
          $.alert('Batal mengubah status');
        }
      }
    }
    )
  };
  
  function simpan_data() {
    let code = $("#txkode").val();
    let name = $("#txnama").val();
    let divisi = $("#txdivisi").val(); 

    if (code === "" || name === "" || divisi === "") {
        alert("Pastikan form diisi dengan benar!");
    } else {
        $.post("department/create", {
            txcode: code, 
            txnama: name,
            txdivisi: divisi,
        },
        function (data) {
            console.log(data.status);
            if (data.status === "error") {
                alert(data.msg);
            } else {
                alert(data.msg);
        
                load_data();
                reset_form(); 
            }
        }, 'json');
    }
    
}
//update_data
function edit_data() {
  var id = $("#loginModal").data('id');
  let departmentCode = $("#txkode").val();
  let departmentName = $("#txnama").val();
  let departmentDivisi = $("#txdivisi").val();
 

  if (departmentCode === "" || departmentName === "" || departmentDivisi === "") {
    $.alert({
      title: 'Alert!',
      content: 'Error',
  });
  } else {
    $.post('department/update_data', { id: id, departmentCode: departmentCode, departmentName: departmentName, departmentDivisionId: departmentDivisi }, function (data) {
      if (data.status === 'success') {
        alert(data.msg);
        load_data();
        $("#loginModal").modal('hide');
      } else {
        alert(data.msg);

      }
    }, 'json');
  }
} 

function edit_data1(id) {
  $.post('department/edit_table', { id: id }, function (data) {
    if (data.status === 'ok') {
      $("#txkode").val(data.data.departmentCode);
      $("#txnama").val(data.data.departmentName);
      $("#txdivisi").val(data.data.departmentDivisionId);
      $("#loginModal").data('id', id);
      $("#loginModal").modal('show');
      $(".btn-submit").hide();
      $("#tmbhalmt").hide();
      $(".btn-editen").show();

    } else {
      alert(data.msg);
    }
  }, 'json');
}

function confirmDelete(id) {
  $.confirm({
    title: 'Konfirmasi!',
    content: 'Yakin ingin menghapus data?',
    theme: 'ligth',
    buttons: {
      ya: function () {
        $.post('department/delete_table', { id: id }, function (data) {
          if (data.status === 'success') {
            $.dialog({
              title: 'Data dihapus!',
              content: 'data berhasil dihapus',
              theme: 'ligth',
            });
            $("#loginModal").modal('hide');
          } else {
             alert(data.msg);
          }
          load_data()
        }, 'json')
      },
      batal: function () {
        $.alert('Batal menghapus!');
      }
    }
  })
};
 
  
 
  $(document).ready(function () {
    $(".tittle").html("Department")
    $(".page-title").html("Department")
    $(".tit").html("Department")
    $(".btn-add").click(function () {
      $(".btn-success").show();
      $(".btn-editen").hide();
      reset_form()
    })
    $(".btn-closed").click(function () {
      reset_form()
    });
     $(".btn-edit").click(function(){
     $("#tmbEdit").show();
     
     })
    load_data();
    load_cabang();
  })