<?php

namespace App\Http\Controllers;

use App\Models\File;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

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

    public function uploadOnTask(Request $request)
    {
        $validator = Validator::make($request->all(), [
//            'name' => 'required|string|max:255',
            'link' => 'required|string|max:255',
//            'description' => 'required|string|max:255',
            'task_id' => 'required|numeric',
        ]);

        if ($validator->fails()) {
            return response()->json($validator->errors()->toJson(), 400);
        }

        $file = new File();
        $file->name = $request->name;
        $file->link = $request->link;
        $file->description = $request->description;
        $file->task_id = $request->task_id;
        $file->save();
        return response()->json(compact('file'), 201);
    }

    public function update($request, $id)
    {
        $validator = Validator::make($request->all(), [
            'link' => 'required|string|max:255',
            'task_id' => 'required|numeric',
        ]);


        if ($validator->fails()) {
            return response()->json($validator->errors()->toJson(), 400);
        }

        $file = File::find($id);
        $file->fill($request->all());
        $file->save();
        return response()->json($file);
    }
}
