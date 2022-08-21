<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('accounts_users_rel', function (Blueprint $table) {
            $table->integer('id_account')->index();
            $table->integer('id_user')->index();
            $table->string('role');
            $table->string('status');
            $table->dateTime('status_at');
            $table->timestamps();

            $table->index(['id_account', 'id_user'], 'account_user');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('accounts_users_rel');
    }
};
