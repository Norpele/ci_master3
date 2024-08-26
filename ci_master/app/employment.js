function reset_form() {
    let kosong = $(".form-control").val('');
    let kosong1 =$(".form-select").val('');
  }
  
  function load_data() {
      $.post("employment/load_data",
          {
              
          },
          function (data) {
              console.log(data)
              $("#table2").DataTable().clear().destroy()
              $("#table2 > tbody").html('');
              $.each(data.employment, function (idx, val) {
                  html = '<tr>'
                  html += '<td>' + val['departmentName'] + '</td>'
                  html += '<td>' + val['employmentCode'] + '</td>'
                  html += '<td>' + val['nama'] + '</td>'
                  html += '<td>' + val['atasan'] + '</td>'
                  html += '<td><span onclick="active_data(' + val['employmentId'] + ',' + val['employmentActive'] + ')" class="badge ' + ((val['employmentActive'] == '1') ? 'bg-success' : 'bg-danger') + ' ">' + ((val['employmentActive'] == '1') ? 'Active' : 'Inactive') + '</span></td>'
                  html += '<td><button class="btn btn-warning btn-sm btn-edit"  onclick="edit_data1(' + val['employmentId'] + ')">Edit</button></td>'
                  html += '<td><button class="btn btn-danger btn-sm " onclick="confirmDelete(' + val['employmentId'] + ')">Delete</button></td>'
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
  
  function load_department() {
    $.post("employment/load_department", function (res) {
        $('#txdepartment').empty(); 
        $('#txdepartment').append('<option value="" disabled selected>Pilih Department</option>'); 
        $('#txatasan').append('<option value="" disabled selected>Pilih Atasan</option>'); 

        $.each(res.data_department, function (i, v) {
            $('#txdepartment').append('<option value="' + v.departmentId + '">' + v.departmentName + '</option>');
        });
        $.each(res.data_employment, function (i, v) {
            $('#txatasan').append('<option value="' + v.employmentId + '">' + v.nama + '</option>');
        });
    }, 'json').fail(function () {
        console.error('Error loading division data');
    });
}

function load_employment(id) {
  $.post("employment/load_department",{id:id}, function (res) {
      $('#txatasan').empty();  
      $('#txatasan').append('<option value="" disabled selected>Pilih Atasan</option>'); 
      $.each(res.data_employment, function (i, v) {
          $('#txatasan').append('<option value="' + v.employmentId + '">' + v.atasan + '</option>');
      });
  }, 'json').fail(function () {
      console.error('Error loading division data');
  });
}
  
  
    
    function active_data(id, status) {
      $.confirm({
        title: 'Ubah status',
        content: 'Yakin ingin mengubah status?',
        theme: 'dark',
        buttons: {
          Ubah: function () {
            if (status === 1) {
              $.post('employment/active', { id: id, status: status }, function (data) {
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
                $.post('employment/active', { id: id, status: status }, function (data) {
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
      let code = $("#txcode").val();
      let name = $("#txnama").val();
      let department = $("#txdepartment").val();
      let atasan = $("#txatasan").val(); 
  
      if (code === "" || name === "" || department === "") {
          alert("Pastikan form diisi dengan benar!");
      } else {
          $.post("employment/create", {
              txcode: code, 
              txnama: name,
              txdepartment: department,
              txatasan : atasan
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
    let employmentDepartment = $("#txdepartment").val();
    let employmentCode = $("#txcode").val();
    let employmentNama = $("#txnama").val();
    let employmentAtasan = $("#txatasan").val();
   
  
    if (employmentCode === "" || employmentNama === "" ||employmentDepartment === ""||employmentAtasan === "" ) {
      $.alert({ 
        title: 'Alert!',
        content: 'Masukan Data Terlebih Dahulu',

    });
    } else {
      $.post('employment/update_data', { id: id, employmentDepartmentId: employmentDepartment, emlpoymentName: employmentNama, employmentCode: employmentCode, employmentParentEmploymentId : employmentAtasan }, function (data) {
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
    $.post('employment/edit_table', { id: id }, function (data) {
        // Populate the form with existing data
        $("#txcode").val(data.data.employmentCode);
        $("#txnama").val(data.data.employmentName);
  
        
        $.post('employment/load_department', function(res) {
            $("#txdepartment").empty();
            $("#txdepartment").append('<option value="">Pilih Department</option>');
            $.each(res.data_department, function(i, v) {
                let selected = (v.departmentId == data.data.employmentDepartmentId) ? 'selected' : '';
                $("#txdepartment").append('<option value="'+v.departmentId+'" '+selected+'>'+v.departmentName+'</option>');
            });
        }, 'json');
  
      
        $.post('employment/load_department', { id: data.data.employmentDepartmentId }, function(res) {
            $("#txatasan").empty();
            $("#txatasan").append('<option value="">Pilih Atasan</option>');
            $.each(res.data_employment, function(i, v) {
                let selected = (v.employmentId == data.data.employmentParentEmploymentId) ? 'selected' : '';
                $("#txatasan").append('<option value="' + v.employmentId + '" ' + selected + '>' + v.atasan + '</option>');
            });
        }, 'json');
  
        // Show the modal and toggle buttons
        $("#loginModal").data('id', id); 
        $("#loginModal").modal('show');
        $(".btn-submit").hide();
        $(".btn-editen").show();
    }, 'json');
  }
  
  function confirmDelete(id) {
    $.confirm({
      title: 'Konfirmasi!',
      content: 'Yakin ingin menghapus data?',
      theme: 'dark',
      buttons: {
        ya: function () {
          $.post('employment/delete_table', { id: id }, function (data) {
            if (data.status === 'success') {
              $.dialog({
                title: 'Data dihapus!',
                content: 'data berhasil dihapus',
                theme: 'dark',
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
      load_department();
    })