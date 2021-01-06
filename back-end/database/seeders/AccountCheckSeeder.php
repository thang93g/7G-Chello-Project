<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class AccountCheckSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        //
        $account = new User();
        $account->name = 'Viet';
        $account->email = 'viet@gmail.com';
        $account->image = 'aaaaa';
        $account->phone = '0000000';
        $account->password = Hash::make('123456');
        $account->save();
    }
}
