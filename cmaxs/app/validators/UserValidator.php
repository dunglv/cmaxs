<?php

namespace App\Validators;

class UserValidator
{
    public function foo($attribute, $value, $parameters, $validator){
        //return true if field value is foo
        return $value == 'foo';
    }
}

