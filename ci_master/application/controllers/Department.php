<?php
defined('BASEPATH') or exit('No direct script access allowed');

class Department extends CI_Controller
{
    public function __construct()
    {
        parent::__construct();
        $this->load->model(array('m_department','m_division'));
    }

    public function index()
    {
        $data['title'] = 'department';
        $data['department'] = $this->m_department->get_department_data();
        $data['js'] = 'department';

        $this->load->view('header', $data);
        $this->load->view('department/v_department', $data);
        $this->load->view('footer', $data);
    }

    public function load_data()
    {
        $data['department'] = $this->m_department->get_department_data();
        echo json_encode($data);
    }
    public function load_division()
    {
        $res['division'] = $this->m_division->get_division_data();
        echo json_encode($res);
    }

    public function delete_table() {
        $id = $this->input->post("id");

        $this->db->where('employmentDepartmentId', $id);
        $this->db->where('employmentDelete !=', 1);
        $query = $this->db->get('employment');
    
        if ($query->num_rows() > 0) {
            $res['status'] = 'error';
            $res['msg'] = "Data department sedang digunakan di tabel employment dan tidak dapat dihapus.";
        } else {
            if ($this->m_department->delete_table($id)) {
                $res['status'] = 'success';
                $res['msg'] = "Data department berhasil dihapus.";
            } else {
                $res['status'] = 'error';
                $res['msg'] = "Gagal menghapus data department.";
            }
        }

        echo json_encode($res);
    }
     public function active()
     {
         $id = $this->input->post("id");
        $status = $this->input->post("status");
        if ($this->m_department->activate_data($id)) {
            $res["status"] = "success";
             $ket = ($status == 1) ? " Non-Aktif " : " Aktif";
             $res["msg"] = "Data berhasil" . $ket;
        } else {
             $res["status"] = "error";
            $ket = ($status == 0) ? " Non-Aktif" : " Aktif";
             $res["msg"] = "Data Gagal " . $ket;
         }
         echo json_encode($res);
     }  
     public function create() {
        if ($this->input->post('txcode') != '') { // This matches the JavaScript variable
            $division = $this->input->post('txdivisi');
            $kode = $this->input->post('txcode'); // This matches the JavaScript variable
            $nama = $this->input->post('txnama');
    
            $query = $this->db->query("SELECT COUNT(*) as count FROM department WHERE departmentCode = '{$kode}'");
            $result = $query->row();
    
            if ($result->count > 0) {
                $res['status'] = 'error';
                $res['msg'] = "Kode {$kode} sudah terpakai";
            } else {
                $sql = "INSERT INTO department (departmentClientId,departmentDivisionId, departmentName, departmentCode, departmentActive) VALUES (1,'{$division}','{$nama}','{$kode}', 1)";
                $exc = $this->db->query($sql);
    
                if ($exc) {
                    $res['status'] = 'success';
                    $res['msg'] = "Simpan  {$nama} berhasil";
                } else {
                    $res['status'] = 'error';
                    $res['msg'] = "Simpan  {$nama} gagal";
                }
            }
            echo json_encode($res);
        }
    }

    public function edit_table()
    {
        $id = $this->input->post('id');
        $sql = $this->db->query("SELECT * FROM department WHERE departmentId = ?", array($id));
        $result = $sql->row_array();
        if ($result > 0) {
            $res['status'] = 'ok';
            $res['data'] = $result;
            $res['msg'] = "Data {$id} sudah ada";
        } else {
            $res['status'] = 'error';
            $res['msg'] = "data tidak ditemukan";
        }
        echo json_encode($res);
    }
    
    
     public function update_data(){
        $id = $this->input->post('id');
        $division = $this->input->post('departmentDivisi');
        $kode = $this->input->post('departmentCode');
        $nama = $this->input->post('departmentName');

        $this->db->where('departmentId', $id);
        $update_data = array(
            'departmentDivisionId' => $division,
            'departmentCode' => $kode,
            'departmentName' => $nama,
        );

        if ($this->db->update('department', $update_data)) {
            $res['status'] = 'success';
            $res['msg'] = "Data berhasil diperbarui";
        } else {
            $res['status'] = 'error';
            $res['msg'] = "Gagal memperbarui data";
        }
        echo json_encode($res);
     }

}