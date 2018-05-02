<?php

Route::group(['prefix' => 'user', 'as' => 'user.'], function(){
    // Home page of user
    Route::get('/', "UserController@index")->name('list'); 
});