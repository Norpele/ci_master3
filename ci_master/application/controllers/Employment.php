<?php
defined('BASEPATH') or exit('No direct script access allowed');

class Employment extends CI_Controller
{
    public function __construct()
    {
        parent::__construct();
        $this->load->model(array('M_department', 'M_employment'));
    }

    public function index()
    {
        $data['title'] = 'jabatan';
        $data['employment'] = $this->M_employment->get_employment_data();
        $data['js'] = 'employment';

        $this->load->view('header', $data);
        $this->load->view('employment/v_employment', $data);
        $this->load->view('footer', $data);
    }

    public function load_data()
    {
        $this->load->model('M_employment');
        $data['employment'] = $this->M_employment->get_employment_data();
        echo json_encode($data);
    }
    public function load_department()
    {
        if ($this->input->post('id') > 0) {
            $res['data_employment'] = $this->m_employment->get_atasan($this->input->post('id'));
        } else {
            $res['data_department'] = $this->m_department->get_department_data();
        }
        echo json_encode($res);
    }
    public function delete_table()
{
    $id = $this->input->post("id");
    $this->db->where('employmentParentEmploymentId', $id);
    $this->db->where('employmentDelete !=', 1);
    $query = $this->db->get('employment');

    if ($query->num_rows() > 0) {
        $res['status'] = 'error';
        $res['msg'] = "Data  sudah digunakan sebagai atasan";
    } else {
        if ($this->m_employment->delete_table($id)) {
            $res['status'] = 'success';
            $res['msg'] = "Data  berhasil di hapus";
        } else {
            $res['status'] = 'error';
            $res['msg'] = 'Gagal menghapus data';
        }
    }
    echo json_encode($res);
}
    public function active()
    {
        $id = $this->input->post("id");
        $status = $this->input->post("status");
        if ($this->m_employment->activate_data($id)) {
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
    public function create()
    {
        if ($this->input->post('txcode') != '') {
            $department = $this->input->post('txdepartment');
            $kode = $this->input->post('txcode');
            $nama = $this->input->post('txnama');
            $atasan = $this->input->post('txatasan');

            $query = $this->db->query("SELECT COUNT(*) as count FROM employment WHERE employmentCode = '{$kode}'");
            $result = $query->row();

            if ($result->count > 0) {
                $res['status'] = 'error';
                $res['msg'] = "Kode {$kode} sudah terpakai";
            } else {
                $sql = "INSERT INTO employment (employmentClientId,employmentDepartmentId,employmentParentEmploymentId, employmentCode, employmentName, employmentActive) VALUES (1,'{$department}','{$atasan}','{$kode}','{$nama}', 1)";
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
        $sql = $this->db->query("SELECT * FROM employment WHERE employmentId = ?", array($id));
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


    public function update_data()
    {
        $id = $this->input->post('id');
        $department = $this->input->post('employmentDepartmentId');
        $kode = $this->input->post('employmentCode');
        $nama = $this->input->post('emlpoymentName');
        $atasan = $this->input->post('employmentParentEmploymentId');

        $this->db->where('employmentId', $id);
        $update_data = array(
            'employmentDepartmentId' => $department,
            'employmentCode' => $kode,
            'employmentName' => $nama,
            'employmentParentEmploymentId' => $atasan,
        );

        if ($this->db->update('employment', $update_data)) {
            $res['status'] = 'success';
            $res['msg'] = "Data berhasil diperbarui";
        } else {
            $res['status'] = 'error';
            $res['msg'] = "Gagal memperbarui data";
        }
        echo json_encode($res);
    }
}
