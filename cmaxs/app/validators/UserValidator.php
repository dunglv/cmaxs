<?php

namespace App\Validators;

use Illuminate\Contracts\Validation\Rule;

class UserValidator implements Rule
{
    public function foo($attribute, $value, $parameters, $validator){
        //return true if field value is foo
        return $value == 'foo';
    }
    
    public function passes($attribute, $value)
    {
        return $value > 10;
    }

    public function message()
    {
        return ':attribute needs more cowbell!';
    }
    
}

