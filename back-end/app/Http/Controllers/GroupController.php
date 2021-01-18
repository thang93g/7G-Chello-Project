<?php

namespace App\Http\Controllers;

use App\Models\Board;
use App\Models\Group;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Validator;


class GroupController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index($id)
    {
        $user = User::find($id);
        $groups = $user->groups;
        $array = [];
        foreach ($groups as $group) {
            $boards = Board::where('group_id', '=', $group->id)->get();
            $users = $group->users;
            $total = DB::table('group_user')->select(DB::raw('COUNT(user_id) as total'))->where('group_id', '=', $group->id)->get();
            $gr = [
                "users" => $users,
                "total" => $total,
                "group" => $group,
                "boards" => $boards,
            ];
            array_push($array, $gr);
        }

        return response()->json($array);
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param \Illuminate\Http\Request $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'name' => 'required|string|max:255',
        ]);

        if ($validator->fails()) {
            return response()->json($validator->errors()->toJson(), 400);
        }

        $group = new Group();
        $group->name = $request->name;
        $group->user_id = $request->user_id;
        $group->save();
        $group->users()->attach($request->user_id);
        return response()->json($group);
    }

    public function addUser($id,Request $request){

        $group = Group::find($id);
        $user_id = User::where('email','=',$request->email)->get('id');
        if($user_id) {
        $group->users()->attach($user_id);
        return response()->json($group);
        }
        return response()->json("Không có tài khoản trên", 400);
    }

    /**
     * Display the specified resource.
     *
     * @param int $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        $group = Group::find($id);
        return response()->json($group);
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
        $group = Group::find($id);
        $group->name = $request->name;
        $group->save();
        return response()->json($group);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param int $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        $group = Group::find($id);
        $group->users()->detach();
        DB::table('boards')->where('group_id','=',$id)->delete();
        $group->delete();
    }

    public function getUser($id)
    {
        $group = Group::find($id);
        $users = $group->users;
        return response()->json($users);
    }

    public function deleteUser($id, $user_id)
    {
        $group = Group::find($id);
        $group->users()->detach($user_id);
        $user = User::find($user_id);
        $user->tasks()->detach();
    }
}
