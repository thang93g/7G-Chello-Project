<?php

namespace App\Http\Controllers;

use App\Models\File;
use Illuminate\Http\Request;

class FileController extends Controller
{
    public function index()
    {
        $files = File::all();
        return response()->json($files);
    }

    public function delete($id)
    {
        $file = File::findOrFail($id);
        $file->delete();
    }

    public function uploadFile(Request $request){
        $file = new File();
        $file->name = $request->name;
        $file->link = $request->link;
        $file->description = $request->description;
        $file->task_id = $request->task_id;
        $file->save();
        return response()->json('Upload thanh cong');
    }
}
