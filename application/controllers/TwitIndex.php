<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class TwitIndex extends CI_Controller {
    public function index() {
        $this->load->helper('url');
        $this->load->view('init_search');
    }

    public function getUser($search) {
        // http://docs.guzzlephp.org/en/latest/
        // GuzzleHTTP is great

        $url = 'https://api.github.com/users/'.$search;
        $client = new GuzzleHttp\Client();
        
        $req = $client->request('GET', $url);
        $res = $req->getBody();

        // return did not work,
        // but echoing result did...
        echo $res;
    }
}