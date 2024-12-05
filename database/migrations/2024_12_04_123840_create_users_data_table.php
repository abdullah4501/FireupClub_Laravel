<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateUsersDataTable extends Migration
{
    public function up()
    {
        Schema::create('users_data', function (Blueprint $table) {
            $table->id();
            $table->string('name')->nullable();
            $table->string('phone')->nullable();
            $table->string('email')->nullable();
            $table->string('nationality')->nullable();
            $table->string('residence')->nullable();
            $table->integer('age')->nullable();
            $table->string('linkedin')->nullable();
            $table->string('occupation')->nullable();
            $table->string('industry')->nullable();
            $table->integer('experience')->nullable();
            $table->decimal('income', 15, 2)->nullable();
            $table->text('financial_goals')->nullable();
            $table->text('specify_financial_goals')->nullable();
            $table->decimal('net_worth', 15, 2)->nullable();
            $table->text('skills')->nullable();
            $table->integer('retire_years')->nullable();
            $table->timestamps();
        });
    }

    public function down()
    {
        Schema::dropIfExists('users_data');
    }
}
