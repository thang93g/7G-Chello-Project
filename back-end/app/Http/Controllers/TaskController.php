<?php

namespace App\Http\Controllers;

use App\Models\Task;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Validator;

class TaskController extends Controller
{
    public function index()
    {
        $tasks = Task::all();
        return response()->json($tasks);
    }

    public function create(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'title' => 'required|string|max:255',
            'label' => 'required|string|max:255',
            'column_id' => 'required',
        ]);

        if ($validator->fails()) {
            return response()->json($validator->errors()->toJson(), 400);
        }

        // $task = Task::create([
        //     'title' => $request->get('title'),
        //     'label' => $request->get('label'),
        //     'column_id' => $request->get('column_id'),
        //     'orders' => $request->get('orders'),
        // ]);

        $task = DB::select("CALL autoIncTask('$request->title',$request->label,$request->column_id)");

        return response()->json(compact('task'),201);

    }

    public function update(Request $request, $id)
    {
        $validator = Validator::make($request->all(),[
            'title' => 'required|string|max:255',
            'label' => 'required|string|max:255',
        ]);


        if($validator->fails()){
            return response()->json($validator->errors()->toJson(), 400);
        }

        $task = Task::find($id);
        $task->fill($request->all());
        $task->save();
        return response()->json($task);
    }

    public function delete($id)
    {
        $task = Task::findOrFail($id);
        $task->delete();
    }

    public function swap($id,$orders){
        $task = Task::findOrFail($id);
        $task->orders = $orders;
        $task->save();
        return response()->json($task);
    }

    public function drop($id,$column_id){
        $task = Task::findOrFail($id);
        $task->column_id = $column_id;
        $task->save();
        return response()->json($task);
    }
}
