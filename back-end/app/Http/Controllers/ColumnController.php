<?php

namespace App\Http\Controllers;

use App\Models\Column;
use App\Models\Task;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Validator;
use Tymon\JWTAuth\Exceptions\JWTException;
use Tymon\JWTAuth\Facades\JWTAuth;


class ColumnController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */

    public function index($board_id)
    {
        $cols = Column::where("board_id", "=", $board_id)->orderBy('orders')->get();
        $array = [];
        foreach($cols as $col){
            $tasks = Task::where("column_id","=",$col->id)->orderBy('orders')->get();
            foreach($tasks as $task){
                $members = $task->users;
            }
            $column = [
                "column" => $col,
                "tasks" => $tasks,
            ];
            array_push($array, $column);
        }


        return response()->json($array);
    }


    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'name' => 'required|string|max:255',
            'board_id' => 'required|numeric|min:1',
        ]);

        if ($validator->fails()) {
            return response()->json($validator->errors()->toJson(), 400);
        }

        // $col = Column::create([
        //     'name' => $request->get('name'),
        //     'board_id' => $request->get('board_id'),
        // ]);

        $col = DB::select("CALL autoInc('$request->name',$request->board_id)");

        return response()->json(compact('col'), 201);
    }


    /**
     * Store a newly created resource in storage.
     *
     * @param \Illuminate\Http\Request $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        //
    }

    /**
     * Display the specified resource.
     *
     * @param int $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        $column = Column::find($id);
        return response()->json($column);
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param int $id
     * @return \Illuminate\Http\Response
     */
    public function edit($id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param \Illuminate\Http\Request $request
     * @param int $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {

        $validator = Validator::make($request->all(), [
            'name' => 'required|string|max:255',
        ]);

        if ($validator->fails()) {
            return response()->json($validator->errors()->toJson(), 400);
        }

        $col = Column::find($id);
        $col->fill($request->all());
        $col->save();
        return response()->json($col);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param int $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        //
    }

    public function swap($id, $index)
    {
        $column = Column::find($id);
        $column->orders = $index;
        $column->save();

        return response()->json($column);
    }

    public function getTaskByLabel($board_id,$id)
    {
        switch($id){
            case "1":
                $label = "#e4e405";
                break;
                case "2":
                    $label = "#c02903";
                    break;
                    case "3":
                        $label = "#2ba503";
                        break;
                        case "4":
                            $label = "#0547c0";
                            break;
                            case "5":
                                $label = "#d66a05";
                                break;
        }
        $cols = Column::where("board_id", "=", $board_id)->orderBy('orders')->get();
        $array = [];
        foreach($cols as $col){
            $tasks = Task::where("column_id","=",$col->id)->where('label','=',$label)->orderBy('orders')->get();
            foreach($tasks as $task){
                $members = $task->users;
            }
            $column = [
                "column" => $col,
                "tasks" => $tasks,
            ];
            array_push($array, $column);
        }


        return response()->json($array);
    }
}
