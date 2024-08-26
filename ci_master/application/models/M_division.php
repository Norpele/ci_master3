<?php
class m_division extends CI_Model
{

    public function __construct()
    {
        parent::__construct();
        $this->load->database();
    }

    public function get_division_data()
    {      
            $sql = "SELECT * FROM division WHERE divisionActive=1 order by divisionId desc";
            $query = $this->db->query($sql);
            return $query->result();     
    }
}
