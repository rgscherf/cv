<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class ProjectHome extends CI_Controller {
    public function index() {
        $data = file_get_contents(__DIR__ . "/data.json");
        $data = json_decode($data, true);
        $this->load->helper('url');
        $this->load->view('projecthomeview', $data);
    }
}