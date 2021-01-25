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

        // $task = DB::select("CALL autoIncTask('$request->title','$request->label',$request->column_id)");
        $task = new Task();
        $task->title = $request->title;
        $task->label = $request->label;
        $task->column_id = $request->column_id;
        $task->orders = 9999;
        $task->save();
        return response()->json($task);
    }

    public function update(Request $request, $id)
    {
//        $validator = Validator::make($request->all(),[
//            'title' => 'required|string|max:255',
//        ]);
//
//
//        if($validator->fails()){
//            return response()->json($validator->errors()->toJson(), 400);
//        }

        $task = Task::find($id);
        $task->title = $request->title;
        $task->save();
        return response()->json($task);
    }

    public function delete($id)
    {
        $task = Task::findOrFail($id);
        $task->users()->detach();
        DB::table('comments')->where('task_id', '=', $id)->delete();
        DB::table('notifications')->where('task_id', '=', $id)->delete();
        DB::table('files')->where('task_id', '=', $id)->delete();
        $task->delete();
    }

    public function swap($id, $orders)
    {
        $task = Task::findOrFail($id);
        $task->orders = $orders;
        $task->save();
        return response()->json($task);
    }

    public function drop($id, $column_id)
    {
        $task = Task::findOrFail($id);
        $task->column_id = $column_id;
        $task->save();
        return response()->json($task);
    }

    public function searchByName($name, $board_id)
    {
        $task = Task::find($name);
        $task->board_id = $board_id;
    }

    public function getTaskById($id)
    {
        $task = Task::find($id);
        return response()->json($task);
    }

    public function updateLabel(Request $request, $id)
    {
        $task = Task::find($id);
        $task->label = $request->label;
        $task->save();
        return response()->json($task);
    }

    public function addUser($task_id, $user_id)
    {
        $task = Task::find($task_id);
        $task->users()->attach($user_id);
        return response()->json($task);
    }

    public function deleteUser($task_id, $user_id)
    {
        $task = Task::find($task_id);
        $task->users()->detach($user_id);
        return response()->json($task);
    }

    public function getUser($id)
    {
        $users = DB::table('users')
            ->join('task_user', 'task_user.user_id', '=', 'users.id')
            ->join('tasks', 'task_user.task_id', '=', 'tasks.id')
            ->select('users.*')
            ->where('tasks.id', '=', $id)
            ->distinct()
            ->get();
        return response()->json($users);
    }

    public function getGroupUser($id)
    {
        $groupUsers = DB::table('tasks')
            ->join('columns', 'tasks.column_id', '=', 'columns.id')
            ->join('boards', 'columns.board_id', '=', 'boards.id')
            ->join('groups', 'boards.group_id', '=', 'groups.id')
            ->join('group_user', 'group_user.group_id', '=', 'groups.id')
            ->join('users', 'group_user.user_id', '=', 'users.id')
            ->select('users.*')
            ->where('tasks.id', '=', $id)
            ->get();
        return response()->json($groupUsers);
    }
}
