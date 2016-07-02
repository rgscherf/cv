<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class ProjectHome extends CI_Controller {
    public function index() {
        $data = file_get_contents(__DIR__ . "/data.json");
        $data = json_decode($data, true);

        $this->load->database('default');
        $query = $this->db->query("SELECT * FROM rcommits");
        foreach ($query->result() as $row) {
            var_dump($row->sha);
        }

        // we only want the most recent 6 commits
        $data["commits"]["events"] = array_slice($data["commits"]["events"], 0, 6);
        
        $this->load->helper('url');
        $this->load->view('projecthomeview', $data);
    }
}