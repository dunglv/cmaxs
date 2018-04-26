<?php

Route::group(['prefix' => 'user'], function(){
   Route::get('/', "UserController@index"); 
});