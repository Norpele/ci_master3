<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class golongan extends CI_Controller {

    public function __construct()
    {
        parent::__construct();
        $this->load->model('m_golongan');
    }

	public function index()
	{
        $data['title'] = 'Golongan';
        $data['golongan'] = $this->m_golongan->get_golongan_data();
        $data['js'] = 'golongan';

		$this->load->view('header', $data);
        $this->load->view('golongan/v_golongan', $data);
        $this->load->view('footer', $data);
	}
    public function load_data(){
        $data['golongan'] = $this->m_golongan->get_golongan_data();
        echo json_encode($data);
    }
    public function create() {
        if ($this->input->post('txcode') != '') {
            
            $code = $this->input->post('txcode');
            $name = $this->input->post('txname');
            $nominal = str_replace(",","",$this->input->post('txnominal'));
            $hari = str_replace(",","",$this->input->post('txhari'));
            $totalGaji = str_replace(",","",$this->input->post('txgajiTotal'));
            $halfhari = $this->input->post('txhalfgaji');
            $gaji = $this->input->post('txgaji');
            $persenpokok = $this->input->post('txpersentPokok');
    
                $sql = "INSERT INTO levelgroup (levelgroupCode,levelgroupName, levelgroupAmount, levelgroupDivide,levelgroupNominal,levelgroupHalfDay, levelgroupHalfPercent, levelgroupHalfAmount, levelgroupActive) VALUES 
                ('{$code}','{$name}', '{$nominal}' ,'{$hari}','{$totalGaji}' ,'{$halfhari}' ,'{$gaji}' ,'{$persenpokok}', 1)";
                $exc = $this->db->query($sql);
    
                if ($exc) {
                    $res['status'] = 'success';
                    $res['msg'] = "Simpan data {$name} berhasil";

                } else {
                    $res['status'] = 'error';
                    $res['msg'] = "Simpan data {$name} gagal";
                }
            
            echo json_encode($res);
        }
    }
    public function edit_table()
    {
        $id = $this->input->post('id');
        $sql = $this->db->query("SELECT * FROM levelgroup WHERE levelgroupId = ?", array($id));
        $result = $sql->row_array();
        if ($result > 0) {
            $res['status'] = 'ok';
            $res['data'] = $result;
            $res['msg'] = "Data {$id} sudah ada";
        } else {
            $res['status'] = 'error';
            $res['msg'] = "Code tidak ditemukan";
        }
        echo json_encode($res);
    }

    public function update_table() {
        $id = $this->input->post('id'); 
        $golonganCode = $this->input->post('levelgroupCode');
        $golonganName = $this->input->post('levelgroupName');
        $golonganAmount = $this->input->post('levelgroupAmount');
        $golonganDivide = $this->input->post('levelgroupDivide');
        $golonganNominal = $this->input->post('levelgroupNominal');
        $golonganHalfDay = $this->input->post('levelgroupHalfDay');
        $golonganHalfPercent = $this->input->post('levelgroupHalfPercent');
        $golonganHalfAmount = $this->input->post('levelgroupHalfAmount');
    
        $this->db->where('levelgroupCode', $golonganCode);
        $this->db->where_not_in('levelgroupId', $id);
        $query_code = $this->db->get('levelgroup');
    
        if ($query_code->num_rows() > 0) {
            $res['status'] = 'error';
            $res['msg'] = "Code {$golonganCode} sudah digunakan oleh data lain";
        }else {
            $this->db->where('levelgroupId', $id);
            $update_data = array(
                'levelgroupCode' => $golonganCode,
                'levelgroupName' => $golonganName,
                'levelgroupAmount' => $golonganAmount,
                'levelgroupDivide' => $golonganDivide,
                'levelgroupNominal' => $golonganNominal,
                'levelgroupHalfDay' => $golonganHalfDay,
                'levelgroupHalfPercent' => $golonganHalfPercent,
                'levelgroupHalfAmount' => $golonganHalfAmount
            );
    
            if ($this->db->update('levelgroup', $update_data)) {
                $res['status'] = 'success';
                $res['msg'] = "Data berhasil diperbarui";
            } else {
                $res['status'] = 'error';
                $res['msg'] = "Gagal memperbarui data";
            }
        }
    
        echo json_encode($res);
    }
    
    public function delete_table() {
        $id = $this->input->post("id");
         if($this->m_golongan->delete_table($id)) {
            $res['status'] = 'success';
            $res['msg'] = 'Data Berhasil dihapus';
         } else {
            $res['status'] = 'error';
            $res['msg'] = 'Data Gagagl dihapus';
         }
         echo json_encode($res);
    }

    public function active() {
        $id = $this->input->post("id");
        $status = $this->input->post("status");
        if ($this->m_golongan->active_data($id)) {
            $res["status"] = "success";
            $ket=($status == 1)? "Nonaktif" : "Aktif";
            $res["msg"] = "Data berhasil ". $ket;
        } else {
            $res["status"] = "error";
            $ket=($status == 1)? "Nonaktif" : "Aktif";
            $res["msg"] = "Data Gagal ". $ket;
        }
        echo json_encode($res);
    }
}
